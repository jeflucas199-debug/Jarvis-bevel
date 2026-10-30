// Ferramentas próprias do Jarvis (além de ler e escrever notas): criar um tema novo na barra lateral.
import { createSdkMcpServer, tool } from "@anthropic-ai/claude-agent-sdk";
import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { GRUPOS, criarTema } from "./temas.js";

export const FERRAMENTA_CRIAR_TEMA = "mcp__jarvis__criar_tema";

const GRUPOS_VALIDOS = GRUPOS.filter((g) => g.id !== "geral").map((g) => g.id) as [string, ...string[]];

export function criarServidorJarvis(cofre: string, aoCriar: (nome: string) => void) {
  const criar = tool(
    "criar_tema",
    "Cria um tema novo na barra lateral do Jarvis (com conversa própria), por exemplo para um cliente novo que avançou " +
      "para proposta ou um assunto/projeto novo que o Lucas pediu. A nota-âncora precisa existir no cofre: crie a nota antes, " +
      `se ainda não existir. Grupos: ${GRUPOS.filter((g) => g.id !== "geral")
        .map((g) => `${g.id} (${g.nome})`)
        .join(", ")}.`,
    {
      nome: z.string().min(2).max(40).describe('Nome curto como na barra, ex.: "Ortech (Guto)"'),
      grupo: z.enum(GRUPOS_VALIDOS),
      nota_ancora: z.string().describe("Caminho da nota principal, relativo ao cofre, ex.: 02-Clientes/Em-Negociacao/Ortech.md"),
      palavras: z
        .array(z.string())
        .min(1)
        .max(8)
        .describe("Nomes que identificam o tema na fala (empresa, pessoas), ex.: ortech, augusto, guto"),
      assunto: z.string().max(300).describe("Uma frase com quem e o quê pertence ao tema, para a escolha automática"),
    },
    async ({ nome, grupo, nota_ancora, palavras, assunto }) => {
      const alvo = path.resolve(cofre, nota_ancora);
      const rel = path.relative(cofre, alvo);
      if (rel.startsWith("..") || path.isAbsolute(rel) || !rel.endsWith(".md") || !fs.existsSync(alvo)) {
        return { content: [{ type: "text", text: `A nota ${nota_ancora} não existe no cofre. Crie a nota antes.` }], isError: true };
      }
      try {
        const tema = criarTema(cofre, { nome, grupo, ancora: rel, apelidos: palavras, pistas: palavras, assunto });
        aoCriar(tema.nome);
        return {
          content: [
            {
              type: "text",
              text:
                `Tema "${tema.nome}" criado no grupo ${GRUPOS.find((g) => g.id === grupo)?.nome}. Já aparece na barra do Jarvis. ` +
                "Também ficou anotado em 07-Operacao/Sessoes-e-Temas.md como sessão pendente para o app do Claude: " +
                "o app cria a sessão na próxima conversa lá (ou quando o Lucas disser \"cria as sessões pendentes do Jarvis\"). Avise isso em uma frase.",
            },
          ],
        };
      } catch (err) {
        return { content: [{ type: "text", text: (err as Error).message }], isError: true };
      }
    },
  );
  return createSdkMcpServer({ name: "jarvis", version: "0.1.0", tools: [criar], alwaysLoad: true });
}
