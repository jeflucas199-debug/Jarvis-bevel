// Fala com as vozes do próprio Mac (comando `say`). O Chrome não mostra as vozes
// "Aprimorada"/"Premium" baixadas no Mac, mas o `say` usa todas.
import { execFile, spawn, type ChildProcess } from "node:child_process";

export type VozMac = { nome: string; natural: boolean };

let atual: ChildProcess | null = null;

// Lista as vozes em português do Brasil instaladas no Mac.
export function listarVozesMac(): Promise<VozMac[]> {
  return new Promise((resolve) => {
    execFile("say", ["-v", "?"], (erro, saida) => {
      if (erro) return resolve([]);
      const vozes = saida
        .split("\n")
        .map((linha) => linha.match(/^(.+?)\s+pt_BR\s+#/))
        .filter((m): m is RegExpMatchArray => m !== null)
        .map((m) => m[1].trim())
        .map((nome) => ({ nome, natural: /enhanced|premium|aprimorad|melhorad/i.test(nome) }));
      resolve(vozes.sort((a, b) => Number(b.natural) - Number(a.natural)));
    });
  });
}

// Fala o texto e resolve quando termina (ou quando for calado).
export function dizer(texto: string, voz: string, velocidade: number): Promise<void> {
  calar();
  // ~185 palavras por minuto é a velocidade normal do `say`.
  const ppm = String(Math.round(185 * velocidade));
  // O texto vai pela entrada padrão, nunca como argumento, para não virar opção do comando.
  const proc = spawn("say", ["-v", voz, "-r", ppm], { stdio: ["pipe", "ignore", "ignore"] });
  atual = proc;
  proc.stdin.end(texto);
  return new Promise((resolve) => {
    proc.on("close", () => {
      if (atual === proc) atual = null;
      resolve();
    });
    proc.on("error", () => resolve());
  });
}

export function calar() {
  atual?.kill();
  atual = null;
}
