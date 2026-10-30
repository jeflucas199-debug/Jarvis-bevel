// O "cérebro" do Jarvis: Claude Agent SDK rodando dentro do cofre, com ferramentas de arquivo
// (+ pasta de documentos no brandkit e consulta só de leitura ao CRM, quando configurada).
import { query, type CanUseTool, type Options } from "@anthropic-ai/claude-agent-sdk";
import fs from "node:fs";
import path from "node:path";
import type { Tema } from "./temas.js";
import { FERRAMENTA_CRM, criarServidorCrm } from "./crm.js";
import { FERRAMENTA_CRIAR_TEMA, criarServidorJarvis } from "./ferramentasJarvis.js";
import { pastaDrive } from "./drive.js";

const FERRAMENTAS = ["Read", "Glob", "Grep", "Write", "Edit"];
const FERRAMENTAS_DE_ESCRITA = new Set(["Write", "Edit"]);

// Pastas do cofre onde o Jarvis nunca escreve (regras do CLAUDE.md).
const PASTAS_SO_LEITURA = [".obsidian", "_arquivo", ".claude", ".git", ".trash"];

export type Evento =
  | { tipo: "lendo" | "escrevendo" | "buscando" | "crm"; arquivo: string; pasta?: string }
  | { tipo: "fala"; texto: string } // versão falada, assim que fica pronta
  | { tipo: "texto"; texto: string } // resposta da tela até agora (vai crescendo)
  | { tipo: "bloqueado"; motivo: string };

export type Resposta = {
  tela: string;
  fala: string;
  salvos: string[]; // caminhos relativos ao cofre
  documentos: string[]; // nomes dos arquivos criados em documentos/ (abrir e salvar em PDF)
  contextoTokens: number; // tamanho da conversa do tema no último pedido ao modelo
  tempos: string[]; // linha do tempo da resposta, para achar o que demora
  custoUsd: number;
  sessionId: string | undefined;
  erro?: string;
};

type Config = {
  cofre: string;
  documentos: string; // pasta fora do cofre onde o Jarvis cria documentos no brandkit
  crmBanco?: string; // endereço do banco do CRM (usuário só leitura), vindo do .env
  modelo: string;
  limitePorPerguntaUsd: number;
};

function dentroDe(pasta: string, alvo: string): boolean {
  const rel = path.relative(pasta, alvo);
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}

// Resolve links simbólicos para que um atalho dentro do cofre não aponte para fora.
function caminhoReal(alvo: string): string {
  let atual = alvo;
  const sufixo: string[] = [];
  while (!fs.existsSync(atual)) {
    const pai = path.dirname(atual);
    if (pai === atual) break;
    sufixo.unshift(path.basename(atual));
    atual = pai;
  }
  return path.join(fs.realpathSync(atual), ...sufixo);
}

function caminhoDaFerramenta(nome: string, input: Record<string, unknown>): string | undefined {
  const valor = nome === "Glob" || nome === "Grep" ? input.path : input.file_path;
  return typeof valor === "string" && valor.length > 0 ? valor : undefined;
}

// liberarEscrita: enquanto o tema não for confirmado (resposta adiantada no tema anterior), escrever espera;
// se o tema estiver errado, a escrita é negada.
export function guardiao(
  cofre: string,
  documentos: string,
  aoEvento: (e: Evento) => void,
  liberarEscrita?: Promise<boolean>,
  drive?: string,
): CanUseTool {
  const cofreReal = fs.realpathSync(cofre);
  fs.mkdirSync(documentos, { recursive: true });
  const docsReal = fs.realpathSync(documentos);
  return async (nome, input) => {
    if (nome === FERRAMENTA_CRM) return { behavior: "allow", updatedInput: input };
    if (nome === FERRAMENTA_CRIAR_TEMA) {
      if (liberarEscrita && !(await liberarEscrita)) return { behavior: "deny", message: "Tema errado: resposta cancelada.", interrupt: true };
      return { behavior: "allow", updatedInput: input };
    }
    if (!FERRAMENTAS.includes(nome)) {
      aoEvento({ tipo: "bloqueado", motivo: `ferramenta ${nome} não liberada` });
      return { behavior: "deny", message: "O Jarvis só pode ler, buscar, criar e editar arquivos do cofre." };
    }
    const bruto = caminhoDaFerramenta(nome, input);
    const alvo = caminhoReal(path.resolve(cofreReal, bruto ?? "."));
    if (FERRAMENTAS_DE_ESCRITA.has(nome) && liberarEscrita && !(await liberarEscrita)) {
      return { behavior: "deny", message: "Tema errado: esta resposta foi cancelada.", interrupt: true };
    }
    // Pasta da Bevel no Google Drive: só leitura.
    if (drive && dentroDe(drive, alvo)) {
      if (FERRAMENTAS_DE_ESCRITA.has(nome)) {
        aoEvento({ tipo: "bloqueado", motivo: `Drive é só leitura: ${path.basename(alvo)}` });
        return { behavior: "deny", message: "A pasta do Google Drive é só leitura. Salve o resumo numa nota do cofre." };
      }
      return { behavior: "allow", updatedInput: input };
    }
    // Pasta de documentos: pode ler tudo e criar/editar só páginas .html.
    if (dentroDe(docsReal, alvo)) {
      if (FERRAMENTAS_DE_ESCRITA.has(nome)) {
        if (path.extname(alvo) !== ".html" || path.basename(alvo).startsWith("_")) {
          aoEvento({ tipo: "bloqueado", motivo: `documento inválido: ${path.basename(alvo)}` });
          return { behavior: "deny", message: "Na pasta de documentos só se criam páginas .html novas (o _modelo.html não se edita)." };
        }
        aoEvento({ tipo: "escrevendo", arquivo: `documento ${path.basename(alvo)}` });
      }
      return { behavior: "allow", updatedInput: input };
    }
    if (!dentroDe(cofreReal, alvo)) {
      aoEvento({ tipo: "bloqueado", motivo: `fora do cofre: ${bruto}` });
      return { behavior: "deny", message: "Fora do cofre. O Jarvis só mexe em arquivos dentro da pasta da Bevel." };
    }
    const rel = path.relative(cofreReal, alvo);
    if (FERRAMENTAS_DE_ESCRITA.has(nome)) {
      const primeira = rel.split(path.sep)[0];
      if (PASTAS_SO_LEITURA.includes(primeira)) {
        aoEvento({ tipo: "bloqueado", motivo: `pasta protegida: ${rel}` });
        return { behavior: "deny", message: `A pasta ${primeira}/ é só leitura (regras do CLAUDE.md).` };
      }
      aoEvento({ tipo: "escrevendo", arquivo: rel });
    }
    return { behavior: "allow", updatedInput: input };
  };
}

// Conteúdo atual de uma nota, para ir direto no prompt (economiza idas ao modelo só para ler).
function lerNota(cofre: string, rel: string, limite = 20_000): string {
  try {
    const texto = fs.readFileSync(path.join(cofre, rel), "utf8");
    return texto.length > limite ? texto.slice(0, limite) + "\n[… nota cortada; leia o arquivo para ver o resto]" : texto;
  } catch {
    return "(nota não encontrada)";
  }
}

function instrucoes(cofre: string, documentos: string, temCrm: boolean, tema: Tema, drive?: string): string {
  const claudeMd = lerNota(cofre, "CLAUDE.md", 60_000);
  const notasBase = [...new Set(["00-Inicio.md", tema.ancora])]
    .map((rel) => `## ${rel}\n${lerNota(cofre, rel)}`)
    .join("\n\n");
  return `
# Você é o Jarvis da Bevel
Você é o assistente por voz do Lucas (sócio da Bevel Systems, comercial). Ele fala, o navegador transcreve e você responde.
O diretório de trabalho é o cofre do Obsidian da Bevel (o segundo cérebro). Siga as regras do CLAUDE.md abaixo, que valem para você também.

## Tema desta conversa: ${tema.nome}
Nota-âncora: \`${tema.ancora}\`. O CLAUDE.md, o 00-Inicio.md e a nota-âncora já estão no fim destas instruções, na versão de agora:
não gaste tempo lendo de novo (leia só se for editar uma delas, porque a edição exige leitura antes). Abra outras notas só se a pergunta pedir.
Mantenha o foco neste tema; se a fala for de outro assunto, responda mesmo assim e registre na nota certa.

## Como trabalhar aqui
- Você só tem ferramentas de arquivo (ler, buscar, criar e editar) dentro do cofre (e na pasta de documentos, abaixo). Não há terminal nem internet:
  não tente rodar scripts (por exemplo o gerar_mapa.py); se uma regra pedir isso, avise na resposta que ficou pendente.
- Nunca escreva em \`.obsidian/\`, \`_arquivo/\` ou \`.claude/\`.
- Prefira editar trechos (Edit) a reescrever uma nota inteira. Não apague conteúdo do Lucas.
- A fala vem de transcrição automática: nomes podem vir errados (ex.: "equivete" = EQUIVET, "Tafarél" = Tafarel). Corrija pelo contexto.
- Se algo estiver ambíguo antes de salvar, pergunte em vez de adivinhar. Nunca invente números; marque [a confirmar].

## Temas novos (abas da barra lateral do Jarvis)
Quando o Lucas pedir uma aba/tema/"sessão" nova, ou um cliente novo avançar para proposta (regra do CLAUDE.md), crie você mesmo:
1. Garanta a nota no cofre (cliente novo → nota em 02-Clientes/<status>/ pelo modelo, linha em Clientes.md e link na nota-mapa).
2. Use a ferramenta criar_tema (nome curto, grupo certo, nota-âncora, nomes que identificam o tema, uma frase de assunto).
3. Diga que a aba já aparece na barra do Jarvis e que a sessão no app do Claude ficou pedida na lista
   07-Operacao/Sessoes-e-Temas.md: o app cria na próxima conversa lá, ou quando o Lucas disser "cria as sessões pendentes do Jarvis".

## Documentos para o Lucas (resumos, relatórios, listas "em PDF")
Quando ele pedir um documento, PDF, relatório ou resumo para mandar/guardar:
1. Leia o modelo \`${path.join(documentos, "_modelo.html")}\` (brandkit da Bevel).
2. Crie um arquivo NOVO em \`${documentos}/\` chamado \`AAAA-MM-DD-nome-curto.html\` (minúsculas, hífens), copiando o modelo
   inteiro e trocando só o <title>, a capa e o conteúdo de <main>. Não mexa no <style> nem na barra de cima. Use os componentes do modelo.
3. Dados só do cofre${temCrm ? " e do CRM" : ""}; nada inventado; cite a data dos dados. Textos curtos, voz da marca (problema resolvido, sem jargão).
4. Na resposta, diga que o documento está pronto e que é só clicar em "Abrir / Salvar em PDF" na tela.
${
  temCrm
    ? `
## CRM (dados ao vivo)
Você tem a ferramenta consultar_crm (SQL só leitura no banco do CRM do Gui). Use quando a pergunta for sobre leads, vendas, contratos,
eventos ou vendedores do CRM. Na primeira vez, descubra as tabelas pelo information_schema. Prefira COUNT/GROUP BY. Não registre dados
pessoais de leads (telefone, e-mail) nas notas sem o Lucas pedir. Se o CRM e as notas divergirem, aponte a diferença.
`
    : `
## CRM
O acesso ao CRM ainda não foi configurado: para leads/vendas, use as notas do cofre (02-Clientes/, CRM-Bevel) e avise que são da última atualização.
`
}
${
  drive
    ? `
## Google Drive da Bevel (só leitura)
A pasta compartilhada "Bevel" do Drive está em \`${drive}\` (subpastas como Clientes/, Marketing & IDV/). Use Glob/Grep/Read nela
quando o Lucas falar do Drive, de documentos que alguém "subiu" ou "mandou", ou de arquivos de cliente que não estão no cofre.
Você não pode escrever lá: o que for importante vira resumo numa nota do cofre (na nota do cliente, com o caminho do arquivo no Drive).
PDFs, imagens e textos você lê; arquivos .gdoc/.gsheet/.gslides são só atalhos (sem conteúdo): diga o nome e que precisa abrir no Drive
ou ser exportado em PDF.
`
    : `
## Google Drive
A pasta do Drive ainda não está no Mac: se o Lucas pedir algo do Drive, diga que falta adicionar o atalho da pasta "Bevel" em "Meu Drive"
(Google Drive para computador) e que, enquanto isso, o Claude do app consegue ler o Drive.
`
}
## Formato da resposta (obrigatório)
1. A PRIMEIRA linha da resposta é \`FALA:\` seguido da **versão falada**: 2 ou 3 frases curtas, naturais para ouvir, sem Markdown,
   sem links, sem listas, sem emojis e sem caminhos de arquivo. Ela começa a ser lida em voz alta assim que a linha termina,
   então só escreva a resposta depois de ter feito o que precisa (ler, consultar, salvar).
2. Depois de uma linha em branco, a **resposta completa**, em português, em Markdown curto (vai para a tela). Se salvou algo,
   termine com uma linha "Notas atualizadas: ..." (regra 4 do CLAUDE.md).
- A velocidade importa: o Lucas está esperando ouvindo. Faça poucas idas às ferramentas e só as necessárias.

---
# CLAUDE.md do cofre
${claudeMd}

---
# Notas já carregadas (versão atual)
${notasBase}
`.trim();
}

// Separa a resposta da tela da versão falada ("FALA: ...").
export function separarFala(texto: string): { tela: string; fala: string } {
  const inicio = texto.trimStart();
  if (inicio.startsWith("FALA:")) {
    const fim = inicio.indexOf("\n");
    if (fim < 0) return { tela: "", fala: inicio.slice(5).trim() };
    return { fala: inicio.slice(5, fim).trim(), tela: inicio.slice(fim + 1).trim() };
  }
  const i = texto.lastIndexOf("FALA:");
  if (i >= 0) {
    return { tela: texto.slice(0, i).trim(), fala: texto.slice(i + 5).trim() };
  }
  const limpo = texto.replace(/[#*_`>|\[\]]/g, "").replace(/\s+/g, " ").trim();
  const frases = limpo.match(/[^.!?]+[.!?]+/g) ?? [limpo];
  return { tela: texto.trim(), fala: frases.slice(0, 2).join(" ").trim() };
}

export async function perguntar(
  config: Config,
  tema: Tema,
  texto: string,
  sessionIdAnterior: string | undefined,
  aoEvento: (e: Evento) => void,
  anexos: string[] = [], // caminhos relativos ao cofre, já salvos em _arquivo/
  extra: {
    modelo?: string; // troca o modelo só nesta pergunta (modo rápido)
    esforco?: "low" | "medium" | "high";
    abortar?: AbortController;
    liberarEscrita?: Promise<boolean>;
    bifurcar?: boolean; // retoma numa cópia da conversa, para não sujar a original se for cancelada
  } = {},
): Promise<Resposta> {
  // Só conta como salvo o que o Write/Edit concluiu sem erro.
  const salvos = new Set<string>();
  const documentos = new Set<string>();
  const docsReal = fs.realpathSync(config.documentos);
  const drive = pastaDrive();
  const escritasPendentes = new Map<string, string>();
  const hoje = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "America/Sao_Paulo",
  });

  const options: Options = {
    cwd: config.cofre,
    model: extra.modelo ?? config.modelo,
    effort: extra.esforco ?? "medium",
    includePartialMessages: true,
    abortController: extra.abortar,
    forkSession: Boolean(extra.bifurcar && sessionIdAnterior),
    tools: FERRAMENTAS,
    additionalDirectories: drive ? [config.documentos, drive] : [config.documentos],
    disallowedTools: ["Bash", "WebFetch", "WebSearch", "Agent", "Task", "NotebookEdit"],
    permissionMode: "default",
    canUseTool: guardiao(config.cofre, config.documentos, aoEvento, extra.liberarEscrita, drive),
    // Sem settings do disco: nada de hooks, plugins ou MCP de fora. O CLAUDE.md vai no prompt.
    settingSources: [],
    mcpServers: {
      jarvis: criarServidorJarvis(config.cofre, (nome) => aoEvento({ tipo: "escrevendo", arquivo: `tema novo: ${nome}` })),
      ...(config.crmBanco
        ? { crm: criarServidorCrm(config.crmBanco, () => aoEvento({ tipo: "crm", arquivo: "consultando o CRM" })) }
        : {}),
    },
    strictMcpConfig: true,
    systemPrompt: {
      type: "preset",
      preset: "claude_code",
      append: instrucoes(config.cofre, config.documentos, Boolean(config.crmBanco), tema, drive),
      // Renderiza a cada pergunta, para pegar mudanças que o Lucas fizer no CLAUDE.md.
      snapshot: false,
    },
    maxTurns: 40,
    maxBudgetUsd: config.limitePorPerguntaUsd,
    resume: sessionIdAnterior,
    env: { ...process.env, CLAUDE_AGENT_SDK_CLIENT_APP: "jarvis-bevel/0.1.0" },
  };

  let sessionId = sessionIdAnterior;
  let resultado = "";
  let custoUsd = 0;
  let contextoTokens = 0;
  const t0 = Date.now();
  const tempos: string[] = [];
  const marca = (o: string) => tempos.push(`${((Date.now() - t0) / 1000).toFixed(1)}s ${o}`);
  let erro: string | undefined;

  let prompt = `[Hoje é ${hoje}. Fala do Lucas, transcrita por voz:]\n${texto}`;
  if (anexos.length) {
    prompt +=
      `\n\n[O Lucas mandou junto ${anexos.length === 1 ? "este arquivo, já salvo" : "estes arquivos, já salvos"} no cofre:\n` +
      anexos.map((a) => `- ${a}`).join("\n") +
      "\nLeia cada um antes de responder (PDF grande: leia por partes, com o parâmetro de páginas). " +
      "É um documento recebido: siga as regras do CLAUDE.md (resumo na nota certa; reunião em 09-Reunioes/ com link na nota do cliente; " +
      "decisões e pendências nos lugares delas). O original fica em _arquivo/ e não deve ser editado.]";
  }

  // Texto chegando aos pedaços: solta a FALA assim que a primeira linha fecha e vai mostrando o resto.
  let bloco = "";
  let falaSolta = false;
  const aoTexto = () => {
    const inicio = bloco.trimStart();
    if (inicio.length < 5) return;
    if (inicio.startsWith("FALA:")) {
      const fim = inicio.indexOf("\n");
      if (fim < 0) return;
      if (!falaSolta) {
        falaSolta = true;
        aoEvento({ tipo: "fala", texto: inicio.slice(5, fim).trim() });
      }
      const resto = inicio.slice(fim + 1).trimStart();
      if (resto) aoEvento({ tipo: "texto", texto: resto });
    } else {
      aoEvento({ tipo: "texto", texto: bloco });
    }
  };

  for await (const msg of query({ prompt, options })) {
    if (msg.type === "stream_event" && !msg.parent_tool_use_id) {
      const ev = msg.event;
      if (ev.type === "content_block_start" && ev.content_block.type === "text") bloco = "";
      else if (ev.type === "content_block_delta" && ev.delta.type === "text_delta") {
        if (!bloco) marca("começou a escrever");
        bloco += ev.delta.text;
        aoTexto();
      }
      continue;
    }
    if ("session_id" in msg && typeof msg.session_id === "string") sessionId = msg.session_id;
    if (msg.type === "system" && msg.subtype === "init") marca("processo pronto");

    if (msg.type === "assistant") {
      const u = msg.message.usage;
      if (u)
        contextoTokens =
          u.input_tokens + (u.cache_creation_input_tokens ?? 0) + (u.cache_read_input_tokens ?? 0) + u.output_tokens;
      const ferramentas = msg.message.content.filter((b) => b.type === "tool_use").map((b) => b.name);
      marca(ferramentas.length ? `modelo pediu: ${ferramentas.join(", ")}` : "modelo escreveu a resposta");
      for (const bloco of msg.message.content) {
        if (bloco.type !== "tool_use") continue;
        const input = bloco.input as Record<string, unknown>;
        const alvo = caminhoDaFerramenta(bloco.name, input);
        const absoluto = alvo ? path.resolve(config.cofre, alvo) : "";
        // Arquivo do Drive aparece na trilha como "Drive/…" (e sem link do Obsidian).
        const rel = !absoluto
          ? ""
          : drive && dentroDe(drive, absoluto)
            ? path.join("Drive", path.relative(drive, absoluto))
            : path.relative(config.cofre, absoluto);
        if (FERRAMENTAS_DE_ESCRITA.has(bloco.name) && rel) escritasPendentes.set(bloco.id, absoluto);
        if (bloco.name === "Read") aoEvento({ tipo: "lendo", arquivo: rel });
        else if (bloco.name === "Glob" || bloco.name === "Grep")
          aoEvento({ tipo: "buscando", arquivo: String(input.pattern ?? ""), pasta: rel });
      }
    }

    if (msg.type === "user" && Array.isArray(msg.message.content)) {
      for (const bloco of msg.message.content) {
        if (typeof bloco !== "object" || bloco.type !== "tool_result") continue;
        const absoluto = escritasPendentes.get(bloco.tool_use_id);
        if (!absoluto || bloco.is_error) continue;
        if (dentroDe(docsReal, caminhoReal(absoluto))) documentos.add(path.basename(absoluto));
        else salvos.add(path.relative(config.cofre, absoluto));
      }
    }

    if (msg.type === "result") {
      marca("fim");
      custoUsd = msg.total_cost_usd;
      if (msg.subtype === "success" && !msg.is_error) {
        resultado = msg.result;
      } else {
        erro =
          msg.subtype === "error_max_budget_usd"
            ? `Parei: a pergunta passou do limite de US$ ${config.limitePorPerguntaUsd.toFixed(2)}.`
            : `O Claude não conseguiu terminar (${msg.subtype}).`;
        if ("result" in msg && typeof msg.result === "string") resultado = msg.result;
      }
    }
  }

  const { tela, fala } = separarFala(resultado || erro || "");
  return {
    tela,
    fala: fala || erro || "",
    salvos: [...salvos],
    documentos: [...documentos],
    contextoTokens,
    tempos,
    custoUsd,
    sessionId,
    erro,
  };
}
