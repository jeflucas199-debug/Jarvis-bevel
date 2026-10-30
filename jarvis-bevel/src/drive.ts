// Pasta "Bevel" do Google Drive, sincronizada no Mac pelo Google Drive para computador.
// O Jarvis só lê (nunca escreve) aqui. Procurada a cada pergunta: se o atalho aparecer depois, já funciona sem reiniciar.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const NOMES = ["Bevel", "BEVEL"];

export function pastaDrive(): string | undefined {
  const fixa = process.env.JARVIS_DRIVE;
  if (fixa) return fs.existsSync(fixa) ? fs.realpathSync(fixa) : undefined;
  const nuvem = path.join(os.homedir(), "Library", "CloudStorage");
  let contas: string[] = [];
  try {
    contas = fs.readdirSync(nuvem).filter((n) => n.startsWith("GoogleDrive-"));
  } catch {
    return undefined;
  }
  for (const conta of contas) {
    for (const raiz of ["Meu Drive", "My Drive"]) {
      for (const nome of NOMES) {
        const alvo = path.join(nuvem, conta, raiz, nome);
        try {
          if (fs.statSync(alvo).isDirectory()) return fs.realpathSync(alvo);
        } catch {
          // não existe nesta conta
        }
      }
    }
  }
  return undefined;
}
