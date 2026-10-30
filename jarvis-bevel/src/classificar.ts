// Escolhe o tema pelo assunto da fala, quando o Lucas não disse a palavra-chave.
// Uma chamada curta a um modelo rápido, sem ferramentas e sem guardar conversa.
import { query } from "@anthropic-ai/claude-agent-sdk";
import { TEMAS, TEMA_GERAL, temaPorId, type Tema } from "./temas.js";

export type Classificacao = { tema: Tema; certeza: "alta" | "baixa" };

type Contexto = { temaAnterior?: Tema; falaAnterior?: string };

// Nomes que, sozinhos, já dizem o tema: evitam a chamada ao modelo (~6 s).
const PISTAS: Record<string, string[]> = {
  equivet: ["gabriele", "monika", "equivet"],
  escolinha: ["tafarel", "tafa", "escolinha", "furacao"],
  digitron: ["donato", "digitron"],
  crm: ["gui", "guilherme", "crm"],
  junior: ["junior", "interativos"],
  gabe: ["gabe", "barbearia", "barbershop"],
  financeiro: ["infinitepay", "rateio", "cnpj", "nota fiscal"],
  comercial: ["prospeccao"],
  "mkt-trafego": ["trafego", "meta ads", "anuncio", "anuncios"],
  "mkt-conteudo": ["instagram", "linkedin", "carrossel", "carrosseis"],
  "mkt-site": ["site", "landing page", "formulario"],
  "mkt-materiais": ["carta de apresentacao"],
  "mkt-posicionamento": ["nicho", "posicionamento"],
  processo: ["clickup", "onboarding"],
};

const normalizar = (t: string) =>
  t
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

// Tema pelas pistas, se só um tema aparecer na fala.
export function temaPorPistas(fala: string): Tema | undefined {
  const texto = ` ${normalizar(fala).replace(/[^a-z0-9 ]+/g, " ")} `;
  // Pistas fixas + as de cada tema (inclusive os criados pelo Jarvis).
  const todas: [string, string[]][] = [
    ...Object.entries(PISTAS),
    ...TEMAS.filter((t) => t.pistas?.length).map((t): [string, string[]] => [t.id, t.pistas ?? []]),
  ];
  const achados = [
    ...new Set(todas.filter(([, palavras]) => palavras.some((p) => texto.includes(` ${p} `))).map(([id]) => id)),
  ];
  return achados.length === 1 ? temaPorId(achados[0]) : undefined;
}

function instrucoes(): string {
  const lista = TEMAS.map((t) => `- ${t.id}: ${t.assunto}`).join("\n");
  return `Você escolhe o tema de uma fala do Lucas (sócio da Bevel Systems) para um assistente por voz.
Temas:
${lista}

Regras:
- Escolha o tema cujo assunto bate com a fala (pessoas citadas contam muito: Gabriele → equivet, Tafarel → escolinha, Gui → crm).
- Se a fala parece continuação da fala anterior ("e quando vence?", "manda isso também"), mantenha o tema anterior.
- A fala atual manda mais que a anterior: se ela cita outro cliente/assunto, mude de tema mesmo que a conversa anterior fosse de outro.
- Cliente ou lead citado que não tem tema próprio → comercial.
- Se cruza vários temas ou não dá para saber, responda geral com certeza baixa.
Responda SÓ com JSON numa linha: {"tema":"<id>","certeza":"alta"|"baixa"}`;
}

export async function classificarTema(fala: string, modelo: string, ctx: Contexto): Promise<Classificacao> {
  const pista = temaPorPistas(fala);
  if (pista) return { tema: pista, certeza: "alta" };

  const anterior = ctx.temaAnterior
    ? `Tema anterior: ${ctx.temaAnterior.id}. Fala anterior: "${(ctx.falaAnterior ?? "").slice(0, 300)}"\n`
    : "";
  const prompt = `${anterior}Fala: "${fala.slice(0, 1500)}"`;

  const controle = new AbortController();
  const limite = setTimeout(() => controle.abort(), 20_000);
  let texto = "";
  try {
    for await (const msg of query({
      prompt,
      options: {
        model: modelo,
        effort: "low",
        tools: [],
        settingSources: [],
        mcpServers: {},
        strictMcpConfig: true,
        maxTurns: 1,
        persistSession: false,
        systemPrompt: instrucoes(),
        abortController: controle,
        env: { ...process.env, CLAUDE_AGENT_SDK_CLIENT_APP: "jarvis-bevel/0.1.0" },
      },
    })) {
      if (msg.type === "result" && msg.subtype === "success") texto = msg.result;
    }
  } catch {
    // Sem classificação (rede, limite, demora): fica na Geral.
  } finally {
    clearTimeout(limite);
  }

  const json = texto.match(/\{[^}]*\}/)?.[0];
  try {
    const r = JSON.parse(json ?? "");
    const tema = temaPorId(r.tema);
    if (tema) return { tema, certeza: r.certeza === "alta" ? "alta" : "baixa" };
  } catch {
    /* resposta fora do formato */
  }
  return { tema: TEMA_GERAL, certeza: "baixa" };
}
