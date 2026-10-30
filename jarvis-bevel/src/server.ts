// Servidor local do Jarvis da Bevel: serve a página e conversa com o cérebro.
import "dotenv/config";
import express from "express";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { perguntar, type Evento } from "./cerebro.js";
import { GRUPOS, TEMAS, TEMA_GERAL, escolherTema, sincronizarTemas, temaPorId, type Tema } from "./temas.js";
import { classificarTema, temaPorPistas } from "./classificar.js";
import { calar, dizer, listarVozesMac } from "./vozMac.js";
import { pastaDrive } from "./drive.js";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const config = {
  cofre: process.env.JARVIS_COFRE || path.join(os.homedir(), "Desktop", "bevel"),
  modelo: process.env.JARVIS_MODELO || "claude-opus-5-5",
  limitePorPerguntaUsd: Number(process.env.JARVIS_LIMITE_POR_PERGUNTA_USD || "1.5"),
  porta: Number(process.env.JARVIS_PORTA || "4321"),
  documentos: path.join(raiz, "documentos"),
  // Endereço do banco do CRM com usuário só leitura (o Lucas cola no .env; nunca vai para o cofre).
  crmBanco: process.env.JARVIS_CRM_BANCO || undefined,
  // Modelo rápido que escolhe o tema pelo assunto quando não há palavra-chave.
  modeloTema: process.env.JARVIS_MODELO_TEMA || "claude-haiku-5-5",
  // Modo rápido, ligado na tela pelo Lucas: modelo mais ágil para perguntas simples.
  modeloRapido: process.env.JARVIS_MODELO_RAPIDO || "claude-sonnet-5-5",
  // Acima disso (tokens), a conversa do tema é fechada e recomeça lendo as notas.
  // O Opus 5.5 aguenta 1 milhão, mas conversa grande fica lenta e gasta mais do limite do plano.
  limiteConversa: Number(process.env.JARVIS_LIMITE_CONVERSA || "200000"),
};
const nomeDoCofre = path.basename(config.cofre);

// Sem chave da API no .env, o Jarvis usa o login do Claude Code deste Mac (o plano do Lucas, sem cobrança extra).
const usaApi = Boolean(process.env.ANTHROPIC_API_KEY);

if (!fs.existsSync(path.join(config.cofre, "CLAUDE.md"))) {
  console.error(`Não achei o cofre em ${config.cofre} (falta o CLAUDE.md). Ajuste JARVIS_COFRE no .env.`);
  process.exit(1);
}

// ---- Memória local: conversa (sessão do Claude) e histórico por tema ----
type Entrada = {
  quando: string;
  pergunta: string;
  anexos?: string[];
  documentos?: string[];
  tela: string;
  fala: string;
  salvos: string[];
  custoUsd: number;
  erro?: string;
};
type Estado = { sessoes: Record<string, string>; historico: Record<string, Entrada[]> };

const arquivoEstado = path.join(raiz, "data", "estado.json");
function carregar(): Estado {
  try {
    return JSON.parse(fs.readFileSync(arquivoEstado, "utf8"));
  } catch {
    return { sessoes: {}, historico: {} };
  }
}
function guardar(estado: Estado) {
  fs.mkdirSync(path.dirname(arquivoEstado), { recursive: true });
  fs.writeFileSync(arquivoEstado, JSON.stringify(estado, null, 2));
}
const estado = carregar();
// O antigo tema "Marketing" (âncora Tráfego pago) virou "Marketing · Tráfego pago".
for (const chave of ["sessoes", "historico"] as const) {
  const mapa = estado[chave] as Record<string, unknown>;
  if (mapa.marketing && !mapa["mkt-trafego"]) mapa["mkt-trafego"] = mapa.marketing;
  delete mapa.marketing;
}
const ocupados = new Set<string>();
// Fechamento de conversa longa em andamento, por tema: a próxima fala do tema espera ele terminar.
const fechamentos = new Map<string, Promise<void>>();
// Última fala respondida, para a correção "não, é CRM" refazer no tema certo.
let ultima: { fala: string; anexos: string[]; tema: Tema } | undefined;

const normalizar = (t: string) =>
  t
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

// "não, é CRM", "não, isso é da EQUIVET", "não, era pra Escolinha" → tema corrigido.
function temaDaCorrecao(fala: string): Tema | undefined {
  const m = normalizar(fala.trim()).match(
    /^nao[\s,.!]+(?:(?:isso|esse|essa)\s+)?(?:e|era|eh|foi|vai)?\s*(?:(?:do|da|de|pro|pra|para|no|na|o|a)\s+)?(?:tema\s+)?(.+)$/,
  );
  if (!m) return undefined;
  const escolha = escolherTema(m[1]);
  return escolha.tema && escolha.texto.replace(/[.!?,\s]/g, "").length === 0 ? escolha.tema : undefined;
}

// Conversa longa: confere se tudo está nas notas e zera a conversa do tema.
function fecharConversa(tema: Tema, sessionId: string) {
  const pedido =
    "[Aviso do sistema do Jarvis, não é fala do Lucas] Esta conversa ficou longa e vai recomeçar do zero. " +
    "Confira se tudo de importante que apareceu nela já está salvo nas notas certas do cofre (decisões, números, " +
    "reuniões, pendências) e salve o que faltar. Responda só com o que salvou agora, ou 'nada pendente'. FALA: pode deixar vazio.";
  const trabalho = perguntar(config, tema, pedido, sessionId, () => {})
    .then((r) => {
      if (r.salvos.length) {
        (estado.historico[tema.id] ??= []).push({
          quando: new Date().toISOString(),
          pergunta: "(conversa longa: conferência automática antes de recomeçar)",
          tela: r.tela,
          fala: "",
          salvos: r.salvos,
          custoUsd: r.custoUsd,
        });
      }
    })
    .catch((err) => console.error("[jarvis] fechamento:", err instanceof Error ? err.message : err))
    .finally(() => {
      delete estado.sessoes[tema.id];
      guardar(estado);
      fechamentos.delete(tema.id);
    });
  fechamentos.set(tema.id, trabalho);
}

function linkObsidian(rel: string): string {
  const semMd = rel.replace(/\.md$/, "");
  return `obsidian://open?vault=${encodeURIComponent(nomeDoCofre)}&file=${encodeURIComponent(semMd)}`;
}

// ---- Rotas ----
const app = express();
app.use(express.json({ limit: "200kb" }));
app.use(express.static(path.join(raiz, "public")));
app.use("/documentos", express.static(config.documentos));
const linkDocumento = (nome: string) => ({ nome, link: `/documentos/${encodeURIComponent(nome)}` });

app.get("/api/estado", (_req, res) => {
  sincronizarTemas(config.cofre); // sessão nova criada no app vira aba aqui
  const hoje = new Date().toISOString().slice(0, 10);
  const custoHoje = Object.values(estado.historico)
    .flat()
    .filter((e) => e.quando.startsWith(hoje))
    .reduce((soma, e) => soma + e.custoUsd, 0);
  res.json({
    grupos: GRUPOS,
    temas: TEMAS.map(({ id, nome, grupo, ancora }) => ({ id, nome, grupo, ancora, link: linkObsidian(ancora) })),
    historico: Object.fromEntries(
      Object.entries(estado.historico).map(([id, lista]) => [
        id,
        lista.slice(-20).map((e) => ({
          ...e,
          salvos: e.salvos.map((s) => ({ nota: s, link: linkObsidian(s) })),
          documentos: (e.documentos ?? []).map(linkDocumento),
        })),
      ]),
    ),
    modelo: config.modelo,
    usaApi,
    crm: Boolean(config.crmBanco),
    custoHoje,
  });
});

// ---- Voz do Mac ----
app.get("/api/vozes-mac", async (_req, res) => {
  res.json(await listarVozesMac());
});

// Responde só quando terminou de falar, para a página saber quando parar o orbe.
app.post("/api/dizer", async (req, res) => {
  const texto = String(req.body?.texto ?? "").slice(0, 4000);
  const voz = String(req.body?.voz ?? "");
  const velocidade = Math.min(1.6, Math.max(0.6, Number(req.body?.velocidade) || 1));
  const vozes = await listarVozesMac();
  if (!texto || !vozes.some((v) => v.nome === voz)) return res.status(400).json({ erro: "Voz não encontrada no Mac" });
  await dizer(texto, voz, velocidade);
  res.json({ ok: true });
});

app.post("/api/calar", (_req, res) => {
  calar();
  res.json({ ok: true });
});

// ---- Documentos mandados pela tela: vão para _arquivo/ do cofre (originais, não editados) ----
const EXTENSOES_ACEITAS = [".pdf", ".png", ".jpg", ".jpeg", ".webp", ".gif", ".txt", ".md", ".csv"];
const pastaArquivo = path.join(config.cofre, "_arquivo");

app.post("/api/arquivo", express.raw({ type: () => true, limit: "30mb" }), (req, res) => {
  let nome = "";
  try {
    nome = decodeURIComponent(String(req.headers["x-nome"] ?? ""));
  } catch {
    /* nome inválido */
  }
  const ext = path.extname(nome).toLowerCase();
  if (!EXTENSOES_ACEITAS.includes(ext)) {
    return res.status(400).json({ erro: `Tipo não aceito. Mande PDF, foto (JPG/PNG) ou texto.` });
  }
  if (!Buffer.isBuffer(req.body) || req.body.length === 0) return res.status(400).json({ erro: "Arquivo vazio." });

  // Nome seguro: sem pastas, sem caracteres estranhos, com a data na frente (padrão do cofre).
  const base = path
    .basename(nome, path.extname(nome))
    .normalize("NFC")
    .replace(/[^\p{L}\p{N} ._-]+/gu, "-")
    .trim()
    .slice(0, 80) || "documento";
  const hoje = new Date().toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" });
  const prefixo = /^\d{4}-\d{2}-\d{2}/.test(base) ? "" : `${hoje}-`;
  let final = `${prefixo}${base}${ext}`;
  for (let n = 2; fs.existsSync(path.join(pastaArquivo, final)); n++) final = `${prefixo}${base}-${n}${ext}`;

  fs.mkdirSync(pastaArquivo, { recursive: true });
  fs.writeFileSync(path.join(pastaArquivo, final), req.body);
  res.json({ caminho: `_arquivo/${final}`, nome: final });
});

function anexosValidos(lista: unknown): string[] {
  if (!Array.isArray(lista)) return [];
  return lista
    .map(String)
    .filter((a) => a.startsWith("_arquivo/") && !a.includes("..") && fs.existsSync(path.join(config.cofre, a)))
    .slice(0, 10);
}

// Começa do zero a conversa de um tema (as notas continuam como estão).
app.post("/api/novo/:tema", (req, res) => {
  const tema = temaPorId(req.params.tema);
  if (!tema) return res.status(404).json({ erro: "Tema desconhecido" });
  delete estado.sessoes[tema.id];
  guardar(estado);
  res.json({ ok: true });
});

// Recebe a fala e devolve o progresso em linhas JSON (uma por evento).
app.post("/api/falar", async (req, res) => {
  sincronizarTemas(config.cofre);
  let anexos = anexosValidos(req.body?.anexos);
  let fala =
    String(req.body?.texto ?? "").trim() ||
    (anexos.length ? "Mandei este documento. Leia, registre no cofre e me diga o que achou." : "");
  const temaFixo = temaPorId(req.body?.temaFixo);
  res.setHeader("Content-Type", "application/x-ndjson; charset=utf-8");
  const enviar = (obj: object) => res.write(JSON.stringify(obj) + "\n");

  if (!fala) {
    enviar({ tipo: "erro", mensagem: "Não ouvi nada." });
    return res.end();
  }

  // Modo rápido (escolha do Lucas na tela): outro modelo, menos esforço, só nesta pergunta.
  const extraModo = req.body?.modo === "rapido" ? { modelo: config.modeloRapido, esforco: "low" as const } : {};

  // Ordem: correção ("não, é CRM") > palavra-chave no início > tema fixado na tela > assunto (automático).
  const temaAnterior = ultima?.tema;
  const corrigido = ultima ? temaDaCorrecao(fala) : undefined;
  let prefixo = "";
  let tema: Tema | undefined;
  let automatico = false;
  const escolha = escolherTema(fala);
  if (corrigido && ultima) {
    tema = corrigido;
    anexos = ultima.anexos;
    prefixo =
      `[Correção do Lucas: a fala abaixo tinha ido para o tema ${ultima.tema.nome} por engano; ela é de ${tema.nome}. ` +
      "Se o outro tema já registrou algo nas notas, não duplique.]\n";
    fala = ultima.fala;
  } else if (escolha.tema) {
    tema = escolha.tema;
  } else if (temaFixo) {
    tema = temaFixo;
  } else if ((tema = temaPorPistas(fala))) {
    automatico = true;
  }

  // Eventos da resposta: seguram enquanto o tema não estiver confirmado.
  let segurar = false;
  let fila: Evento[] = [];
  let prefixarFala = false;
  const repassar = (e: Evento) =>
    enviar(
      e.tipo === "fala"
        ? { tipo: "fala", texto: prefixarFala && tema ? `Em ${tema.nome}. ${e.texto}` : e.texto }
        : e.tipo === "texto"
          ? { tipo: "texto", texto: e.texto }
          : {
              tipo: "progresso",
              evento: e,
              // Nota do cofre lida ou salva: link para abrir no Obsidian.
              link:
                (e.tipo === "lendo" || e.tipo === "escrevendo") && e.arquivo.endsWith(".md") && !e.arquivo.startsWith("..") && !e.arquivo.startsWith("Drive/")
                  ? linkObsidian(e.arquivo)
                  : undefined,
            },
    );
  const aoEvento = (e: Evento) => (segurar ? fila.push(e) : repassar(e));
  const avisarTema = (t: Tema) => {
    prefixarFala = (automatico && t.id !== temaAnterior?.id) || Boolean(corrigido);
    enviar({ tipo: "tema", tema: t.id, texto: escolha.texto, fixar: escolha.mudanca, automatico, corrigido: Boolean(corrigido) });
  };

  let resposta: Awaited<ReturnType<typeof perguntar>> | undefined;
  try {
    if (!tema) {
      // Sem pista: escolhe o tema pelo assunto e, ao mesmo tempo, já começa a responder no tema anterior.
      // Se o tema confirmar, ganha o tempo da escolha; se não, a resposta adiantada é cancelada sem ter escrito nada.
      automatico = true;
      enviar({ tipo: "tema", tema: temaAnterior?.id ?? "geral", texto: fala, escolhendo: true });
      const palpite = temaAnterior ?? TEMA_GERAL;
      const podeAdiantar = !ocupados.has(palpite.id) && !fechamentos.has(palpite.id);
      let confirmar: (ok: boolean) => void = () => {};
      const abortar = new AbortController();
      let adiantada: Promise<Awaited<ReturnType<typeof perguntar>>> | undefined;
      if (podeAdiantar) {
        segurar = true;
        ocupados.add(palpite.id);
        const liberarEscrita = new Promise<boolean>((r) => (confirmar = r));
        adiantada = perguntar(config, palpite, fala, estado.sessoes[palpite.id], aoEvento, anexos, {
          ...extraModo,
          abortar,
          liberarEscrita,
          bifurcar: true,
        });
        adiantada.catch(() => {});
      }
      const inicio = Date.now();
      tema = (await classificarTema(fala, config.modeloTema, { temaAnterior, falaAnterior: ultima?.fala })).tema;
      console.log(`[tempo] escolha do tema: ${((Date.now() - inicio) / 1000).toFixed(1)}s → ${tema.nome}`);
      if (adiantada && tema.id === palpite.id) {
        confirmar(true);
        avisarTema(tema);
        segurar = false;
        for (const e of fila) repassar(e);
        fila = [];
        try {
          resposta = await adiantada;
        } finally {
          ocupados.delete(palpite.id);
        }
      } else if (adiantada) {
        confirmar(false);
        abortar.abort();
        fila = [];
        segurar = false;
        await adiantada.catch(() => {});
        ocupados.delete(palpite.id);
        console.log(`[tempo] resposta adiantada em ${palpite.nome} cancelada (tema era ${tema.nome})`);
      }
    }

    if (!resposta) {
      avisarTema(tema);
      if (escolha.mudanca) {
        enviar({ tipo: "fim", tela: `Tema agora é **${tema.nome}**.`, fala: `Certo, tema ${tema.nome}.`, salvos: [] });
        return;
      }
      if (ocupados.has(tema.id)) {
        enviar({ tipo: "erro", mensagem: `Ainda estou respondendo em ${tema.nome}. Espere terminar.` });
        return;
      }
      ocupados.add(tema.id);
      try {
        await fechamentos.get(tema.id);
        resposta = await perguntar(config, tema, prefixo + fala, estado.sessoes[tema.id], aoEvento, anexos, extraModo);
      } finally {
        ocupados.delete(tema.id);
      }
    }

    console.log(`[tempo] ${tema.nome}: ${resposta.tempos.join(" · ")}`);
    if (resposta.sessionId) estado.sessoes[tema.id] = resposta.sessionId;
    ultima = { fala, anexos, tema };

    // Diz para onde foi quando o tema veio do assunto (ou de uma correção) e mudou.
    let falaCurta = resposta.fala;
    if (prefixarFala) falaCurta = `Em ${tema.nome}. ${falaCurta}`;
    let tela = resposta.tela;
    const longa = resposta.sessionId && resposta.contextoTokens > config.limiteConversa;
    if (longa && resposta.sessionId) {
      fecharConversa(tema, resposta.sessionId);
      tela += `\n\n_A conversa de ${tema.nome} ficou longa: vou conferir se tudo está nas notas, e a próxima pergunta começa uma conversa nova._`;
      falaCurta += ` A conversa de ${tema.nome} ficou longa: vou conferir as notas e começar uma nova.`;
    }
    const entrada: Entrada = {
      quando: new Date().toISOString(),
      pergunta: fala,
      anexos: anexos.length ? anexos : undefined,
      documentos: resposta.documentos.length ? resposta.documentos : undefined,
      tela,
      fala: falaCurta,
      salvos: resposta.salvos,
      custoUsd: resposta.custoUsd,
      erro: resposta.erro,
    };
    (estado.historico[tema.id] ??= []).push(entrada);
    guardar(estado);
    enviar({
      tipo: "fim",
      ...entrada,
      salvos: resposta.salvos.map((s) => ({ nota: s, link: linkObsidian(s) })),
      documentos: resposta.documentos.map(linkDocumento),
      longa: Boolean(longa),
    });
  } catch (err) {
    const mensagem = err instanceof Error ? err.message : String(err);
    console.error("[jarvis] erro:", mensagem);
    const semLogin = /not logged in|log in|login|authentication|401|403/i.test(mensagem);
    const semCredito = /credit|billing|api key/i.test(mensagem);
    const limite = /usage limit|rate limit|limit reached|429/i.test(mensagem);
    enviar({
      tipo: "erro",
      mensagem: limite
        ? "Bati no limite de uso do seu plano do Claude. Tente de novo mais tarde."
        : semCredito && usaApi
          ? "A API recusou a chave ou está sem crédito. Confira a chave no .env e o saldo no console da Anthropic."
          : semLogin && !usaApi
            ? "O Claude Code deste Mac não está logado. Abra o app do Claude e entre na sua conta."
            : `Deu erro: ${mensagem}`,
    });
  } finally {
    res.end();
  }
});

app.listen(config.porta, "127.0.0.1", () => {
  console.log(`\n  Jarvis da Bevel no ar: http://localhost:${config.porta}`);
  console.log(`  Cofre: ${config.cofre} · Modelo: ${config.modelo}`);
  const drive = pastaDrive();
  console.log(drive ? `  Drive: ${drive} (só leitura)` : "  Drive: pasta Bevel ainda não está no Mac (atalho em Meu Drive)");
  console.log(config.crmBanco ? "  CRM: ligado (só leitura)" : "  CRM: não configurado (JARVIS_CRM_BANCO no .env)");
  console.log(usaApi ? "  Conta: chave da API (cobrança por uso)" : "  Conta: seu plano do Claude (sem chave da API, sem cobrança extra)");
  console.log("  Para desligar: feche esta janela ou aperte Ctrl+C.\n");
});
