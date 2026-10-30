// Temas do Jarvis: cada um tem a sua conversa e uma nota-âncora no cofre.
// Espelham os grupos e as sessões da barra lateral do app do Claude (CLAUDE.md, "Sessões por setor").
// A lista compartilhada com o app fica no cofre (07-Operacao/Sessoes-e-Temas.md): sessão nova no app vira aba aqui,
// e aba nova criada pelo Jarvis entra lá como "⏳ pendente" para o app criar a sessão.
import fs from "node:fs";
import path from "node:path";

export type Tema = {
  id: string;
  nome: string; // como aparece dentro do grupo (igual ao título da sessão no app, sem o prefixo)
  grupo: string; // id do grupo em GRUPOS
  ancora: string; // caminho relativo ao cofre
  apelidos: string[]; // palavras ditas no início da fala que escolhem o tema
  assunto: string; // pessoas e assuntos do tema, para escolher o tema pelo que foi dito
  pistas?: string[]; // nomes que, em qualquer ponto da fala, já decidem o tema
};

// Mesma ordem e nomes dos grupos "Bevel · …" do app. "geral" aparece solto no topo.
export const GRUPOS = [
  { id: "geral", nome: "Geral" },
  { id: "comercial", nome: "Comercial" },
  { id: "clientes", nome: "Clientes" },
  { id: "marketing", nome: "Marketing" },
  { id: "financeiro", nome: "Financeiro e Jurídico" },
  { id: "operacao", nome: "Operação e Processos" },
];

export const TEMAS: Tema[] = [
  {
    id: "geral",
    nome: "Geral",
    grupo: "geral",
    ancora: "00-Inicio.md",
    apelidos: ["geral"],
    assunto: "o que cruza setores: prioridades da semana, sócios, reuniões gerais, ideias e projetos novos, mentoria (Fola), o Jarvis",
  },
  {
    id: "comercial",
    nome: "Comercial e Clientes",
    grupo: "comercial",
    ancora: "05-Comercial/05-Comercial.md",
    apelidos: ["comercial", "vendas", "prospeccao"],
    assunto: "vendas e prospecção: leads novos ou frios que ainda não têm tema próprio (ex.: XÁ, Muzão, construtoras), metas da semana, preços, propostas em geral, roteiros, objeções",
  },
  {
    id: "equivet",
    nome: "EQUIVET",
    grupo: "clientes",
    ancora: "02-Clientes/Em-Negociacao/Equivet.md",
    apelidos: ["equivet", "equivete", "equi vet", "equi vete", "ekivet"],
    assunto: "cliente EQUIVET (farmácia veterinária): Gabriele, Monika, proposta, contrato, totem, médico/financeiro deles",
  },
  {
    id: "escolinha",
    nome: "Escolinha do Furacão",
    grupo: "clientes",
    ancora: "02-Clientes/Em-Negociacao/Escolinha-de-Futebol.md",
    apelidos: ["escolinha", "escolinha do furacao", "furacao"],
    assunto: "cliente Escolinha do Furacão (futebol): Tafarel/Tafa, diagnóstico, proposta da escolinha",
  },
  {
    id: "digitron",
    nome: "Digitron (Donato)",
    grupo: "clientes",
    ancora: "02-Clientes/Em-Negociacao/Digitron.md",
    apelidos: ["digitron", "digitrom", "donato"],
    assunto: "cliente Digitron: Donato, carta de apresentação para ele, proposta da Digitron",
  },
  {
    id: "junior",
    nome: "Interativos (Júnior)",
    grupo: "clientes",
    ancora: "02-Clientes/Fechados/Interativos.md",
    apelidos: ["junior", "interativos"],
    assunto: "cliente Interativos (construtora): Júnior (padrasto do Lucas), assistente de obra, protótipo, relatório no WhatsApp",
  },
  {
    id: "gabe",
    nome: "Morais Barbershop (Gabe)",
    grupo: "clientes",
    ancora: "02-Clientes/Fechados/Morais-Barbershop.md",
    apelidos: ["gabe", "gabi", "morais", "barbearia", "morais barbershop"],
    assunto: "cliente Morais Barbershop: Gabe, bot de agendamento da barbearia, parcelas e mensalidade dele, pai do Gabe",
  },
  {
    id: "ortech",
    nome: "Ortech (Guto)",
    grupo: "clientes",
    ancora: "02-Clientes/Em-Negociacao/Ortech.md",
    apelidos: ["ortech", "oretech", "guto", "augusto"],
    assunto: "cliente Ortech (escritório de contabilidade): Augusto/Guto Piano e o pai dele, Comunique, Acessórias, atendimento no WhatsApp com IA, CRM sob medida, certificados digitais",
    pistas: ["ortech", "oretech", "guto", "augusto", "piano", "comunique", "acessorias"],
  },
  {
    id: "mkt-visao",
    nome: "Visão geral",
    grupo: "marketing",
    ancora: "06-Marketing/06-Marketing.md",
    apelidos: ["marketing"],
    assunto: "marketing como um todo: como as frentes se ligam, plano de marketing, Du",
  },
  {
    id: "mkt-posicionamento",
    nome: "Posicionamento e nicho",
    grupo: "marketing",
    ancora: "04-Mercado/Posicionamento.md",
    apelidos: ["posicionamento", "nicho"],
    assunto: "nicho (construção, imobiliário, industrial), posicionamento, concorrência, tese estratégica, para quem a Bevel vende",
  },
  {
    id: "mkt-trafego",
    nome: "Tráfego pago",
    grupo: "marketing",
    ancora: "06-Marketing/Trafego-Pago.md",
    apelidos: ["trafego", "trafego pago", "anuncios"],
    assunto: "tráfego pago: Meta Ads, anúncios, orçamento de mídia, criativos de anúncio, campanhas",
  },
  {
    id: "mkt-materiais",
    nome: "Materiais de venda",
    grupo: "marketing",
    ancora: "06-Marketing/Materiais-de-Venda.md",
    apelidos: ["materiais", "materiais de venda"],
    assunto: "materiais de venda: carta de apresentação, apresentação, cases e portfólio, PDFs para cliente, identidade visual nos documentos",
  },
  {
    id: "mkt-site",
    nome: "Site e formulário",
    grupo: "marketing",
    ancora: "06-Marketing/Site.md",
    apelidos: ["site", "formulario"],
    assunto: "site da Bevel (landing page), formulário de lead/contato, página de captação",
  },
  {
    id: "mkt-conteudo",
    nome: "Conteúdo e redes",
    grupo: "marketing",
    ancora: "06-Marketing/Conteudo.md",
    apelidos: ["conteudo", "redes", "redes sociais"],
    assunto: "conteúdo e redes sociais: Instagram, LinkedIn, posts, carrosséis, vídeos, perfis da Bevel",
  },
  {
    id: "financeiro",
    nome: "Financeiro e Jurídico",
    grupo: "financeiro",
    ancora: "10-Financeiro/Resultado-Acumulado.md",
    apelidos: ["financeiro", "financas", "juridico"],
    assunto: "dinheiro e jurídico: receitas, custos, pagamentos, InfinitePay, rateio entre sócios, CNPJ, nota fiscal, contrato-modelo, acordo de sócios",
  },
  {
    id: "processo",
    nome: "Operação e Processos",
    grupo: "operacao",
    ancora: "07-Operacao/07-Operacao.md",
    apelidos: ["operacao", "processo", "processos", "processo de vendas"],
    assunto: "operação: processo de vendas e entrega, onboarding de cliente, rituais, ClickUp, ferramentas internas",
  },
  {
    id: "crm",
    nome: "CRM",
    grupo: "operacao",
    ancora: "07-Operacao/CRM-Bevel.md",
    apelidos: ["crm", "cerememe", "ce erre eme"],
    assunto: "o CRM do Gui (Guilherme): leads e funil no CRM, colunas, etapas, tarefas, alterações que o Gui faz no sistema, prospecção no Google Maps",
  },
];

export const TEMA_GERAL = TEMAS[0];

// ---- Lista compartilhada com o app (nota no cofre) ----
export const NOTA_SESSOES = "07-Operacao/Sessoes-e-Temas.md";

const slug = (t: string) =>
  normalizar(t)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
const palavrasDe = (texto: string) =>
  texto
    .split(",")
    .map((p) => normalizar(p.trim()))
    .filter(Boolean);
const grupoPeloNome = (nome: string) => GRUPOS.find((g) => normalizar(nome).endsWith(normalizar(g.nome)));
const existe = (nome: string) => TEMAS.some((t) => normalizar(t.nome) === normalizar(nome));

// Lê a tabela da nota e cria as abas que ainda não existem (ex.: sessão criada no app).
export function sincronizarTemas(cofre: string) {
  let texto = "";
  try {
    texto = fs.readFileSync(path.join(cofre, NOTA_SESSOES), "utf8");
  } catch {
    return;
  }
  for (const linha of texto.split("\n")) {
    if (!linha.trim().startsWith("|") || /^\|\s*-/.test(linha.trim())) continue;
    const [grupoNome, , temaNome, ancoraBruta, palavras] = linha.split("|").slice(1, -1).map((c) => c.trim());
    const grupo = grupoPeloNome(grupoNome ?? "");
    const ancora = (ancoraBruta ?? "").replace(/`/g, "").trim();
    if (!grupo || !temaNome || !ancora.endsWith(".md") || existe(temaNome)) continue;
    const lista = palavrasDe(palavras ?? "");
    TEMAS.push({
      id: slug(temaNome),
      nome: temaNome,
      grupo: grupo.id,
      ancora,
      apelidos: lista,
      pistas: lista,
      assunto: `${grupo.nome}: ${temaNome}${lista.length ? ` (${lista.join(", ")})` : ""}`,
    });
  }
}

const PREFIXO_SESSAO: Record<string, string> = { clientes: "Cliente · ", marketing: "Marketing · " };

// Cria uma aba nova pedida ao Jarvis e anota na lista compartilhada, como pendente para o app.
export function criarTema(cofre: string, dados: Omit<Tema, "id">): Tema {
  const id = slug(dados.nome);
  if (!id) throw new Error("Nome do tema vazio.");
  if (temaPorId(id) || existe(dados.nome)) throw new Error(`Já existe um tema chamado ${dados.nome}.`);
  const tema: Tema = { id, ...dados, apelidos: dados.apelidos.map(normalizar), pistas: dados.pistas?.map(normalizar) };

  const arquivo = path.join(cofre, NOTA_SESSOES);
  const grupo = GRUPOS.find((g) => g.id === dados.grupo);
  const hoje = new Date().toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" });
  const limpar = (t: string) => t.replace(/\|/g, "/");
  const linha =
    `| Bevel · ${grupo?.nome ?? dados.grupo} | ${PREFIXO_SESSAO[dados.grupo] ?? "Setor · "}${limpar(dados.nome)} | ` +
    `${limpar(dados.nome)} | \`${dados.ancora}\` | ${limpar(dados.apelidos.join(", "))} | ⏳ pendente (pedida pelo Jarvis em ${hoje}) |`;
  const texto = fs.readFileSync(arquivo, "utf8").replace(/\s*$/, "");
  fs.writeFileSync(arquivo, `${texto}\n${linha}\n`);

  TEMAS.push(tema);
  return tema;
}

export function temaPorId(id: string | undefined): Tema | undefined {
  return TEMAS.find((t) => t.id === id);
}

function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export type Escolha = {
  tema: Tema | undefined; // undefined = nenhuma palavra-chave
  texto: string; // fala sem a palavra-chave
  mudanca: boolean; // "muda para X": só troca o tema, sem pergunta
};

// Procura o apelido de um tema no início da fala ("CRM: ...", "EQUIVET, ...", "muda para CRM").
export function escolherTema(fala: string): Escolha {
  const original = fala.trim();
  let resto = normalizar(original);
  let cortados = 0;

  const mudar = resto.match(/^(muda|mude|mudar|troca|troque|vai)\s+(para|pra|pro)\s+(o\s+|a\s+)?/);
  if (mudar) {
    cortados = mudar[0].length;
    resto = resto.slice(cortados);
  }

  // Apelidos mais longos primeiro, para "escolinha do furacao" ganhar de "escolinha".
  const candidatos = TEMAS.flatMap((t) => t.apelidos.map((a) => ({ tema: t, apelido: a }))).sort(
    (a, b) => b.apelido.length - a.apelido.length,
  );

  for (const { tema, apelido } of candidatos) {
    const m = resto.match(new RegExp(`^${apelido.replace(/ /g, "\\s+")}(?=$|[\\s:,.;!?-])[\\s:,.;!?-]*`));
    if (m) {
      const texto = original.slice(cortados + m[0].length).trim();
      return { tema, texto, mudanca: Boolean(mudar) && texto.length === 0 };
    }
  }
  return { tema: undefined, texto: original, mudanca: false };
}
