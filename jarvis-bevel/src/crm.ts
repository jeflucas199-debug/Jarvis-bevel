// Consulta ao banco do CRM do Gui, SÓ DE LEITURA.
// Três travas: usuário "leitura" no banco (do Gui), transação READ ONLY e filtro de comandos aqui.
import { createSdkMcpServer, tool } from "@anthropic-ai/claude-agent-sdk";
import pg from "pg";
import { z } from "zod";

export const FERRAMENTA_CRM = "mcp__crm__consultar_crm";
const LIMITE_LINHAS = 200;

// Palavras que mudam dados ou o banco: qualquer uma delas bloqueia a consulta.
const PROIBIDAS =
  /\b(insert|update|delete|merge|drop|alter|create|truncate|grant|revoke|copy|call|do|execute|prepare|lock|listen|notify|set|reset|pg_sleep|dblink|lo_\w+|pg_read\w*|pg_write\w*)\b/i;

export function consultaPermitida(sql: string): string | null {
  const limpo = sql.trim().replace(/;\s*$/, "");
  if (!/^(select|with)\b/i.test(limpo)) return "Só consultas que começam com SELECT ou WITH.";
  if (limpo.includes(";")) return "Uma consulta por vez (sem ';' no meio).";
  if (PROIBIDAS.test(limpo.replace(/'[^']*'/g, "''"))) return "A consulta tem um comando que muda dados. Bloqueada.";
  return null;
}

export function criarServidorCrm(urlBanco: string, aoConsultar: (sql: string) => void) {
  const pool = new pg.Pool({ connectionString: urlBanco, max: 2, idleTimeoutMillis: 30_000 });

  const consultar = tool(
    "consultar_crm",
    "Consulta o banco do CRM da Bevel (Postgres), só leitura: leads, vendas, contratos, eventos, vendedores. " +
      "Mande UMA consulta SQL que comece com SELECT ou WITH. Para descobrir tabelas e colunas: " +
      "SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' ORDER BY table_name. " +
      `Devolve no máximo ${LIMITE_LINHAS} linhas; use filtros, COUNT e GROUP BY em vez de puxar tudo.`,
    { sql: z.string().describe("Consulta SQL (SELECT ou WITH)") },
    async ({ sql }) => {
      const motivo = consultaPermitida(sql);
      if (motivo) return { content: [{ type: "text", text: motivo }], isError: true };
      aoConsultar(sql);
      const cliente = await pool.connect();
      try {
        await cliente.query("BEGIN READ ONLY");
        await cliente.query("SET LOCAL statement_timeout = 15000");
        const r = await cliente.query(sql.trim().replace(/;\s*$/, ""));
        const linhas = r.rows.slice(0, LIMITE_LINHAS);
        const aviso = r.rows.length > LIMITE_LINHAS ? `\n(${r.rows.length} linhas; mostrando ${LIMITE_LINHAS})` : "";
        return { content: [{ type: "text", text: JSON.stringify(linhas, null, 1) + aviso }] };
      } catch (err) {
        return { content: [{ type: "text", text: `Erro no banco: ${(err as Error).message}` }], isError: true };
      } finally {
        await cliente.query("ROLLBACK").catch(() => {});
        cliente.release();
      }
    },
    { annotations: { readOnlyHint: true } },
  );

  return createSdkMcpServer({ name: "crm", version: "0.1.0", tools: [consultar], alwaysLoad: true });
}
