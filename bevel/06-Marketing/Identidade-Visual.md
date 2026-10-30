# Identidade visual — Brandkit Bevel v1
#marketing #marca

**Fonte oficial:** https://bevel-brandkit.vercel.app/ — feito pelo **Du**, versão 1, 16/10/2026.
Os textos de "Sentido" ainda aguardam aprovação dos sócios (rascunho).

> **Padrão para todo documento da Bevel** (propostas, briefings, relatórios, planilhas, páginas): usar estas cores, fontes e regras.

## Cores
| Nome | Hex | Uso |
|---|---|---|
| **Navy** | `#020B1E` | Fundo principal da marca |
| **Degradê Bevel** | `#010D21 → #0A42C8` | Capas, grupos de cliente, fundos de destaque (diagonal, topo-esquerda → baixo-direita) |
| **Azul Bevel** | `#0062FC` | Quadrado do símbolo, botões, detalhes, texto azul sobre claro — "a cor que assina" |
| **Azul escrita** | `#4895F6` | "SYSTEMS" sobre escuro e todo texto azul sobre fundo escuro |
| **Branco** | `#FFFFFF` | Texto sobre escuro; fundo das versões claras |
| **Tinta** | `#161618` | Texto e símbolo sobre claro |
| **Azul profundo** | `#0A3AA8` | Transição entre navy e Azul Bevel |
| **Azul-gelo** | `#E4EBF7` | Transição / fundo claro de destaque |

### Contraste (usar só os pares aprovados)
- Branco sobre Navy 19,6:1 · Tinta sobre Branco 18,1:1 · Branco sobre degradê 8,0:1 → texto normal
- Azul escrita sobre Navy 6,5:1 · Azul Bevel sobre Branco 5,1:1 · Branco sobre Azul Bevel 5,1:1 · Tinta sobre Azul escrita 5,9:1 → texto normal
- ❌ Azul Bevel sobre Navy (3,9:1) e Azul escrita sobre Branco (3,0:1) → **só texto grande/detalhe**

## Tipografia
- **Títulos:** Plus Jakarta Sans — 800 (títulos), 700 (subtítulos)
- **Corpo:** Inter — 400 e 500, entrelinha generosa
- **Rótulos:** Inter 600, MAIÚSCULAS, leve espaçamento entre letras — só rótulos curtos

## Logo
- Wordmark **"bevel"** em minúsculas (é desenho, não fonte). Padrão: "bevel" sozinho — claro (#FFFFFF) sobre escuro, Tinta (#161618) sobre claro.
- **"bevel SYSTEMS"** (completa): quando precisar do nome inteiro — proposta, contrato, apresentação para quem não conhece. "SYSTEMS" em #0062FC sobre branco e #4895F6 sobre navy. **Nunca pequeno** (cabeçalho, assinatura de e-mail).
- **Símbolo:** forma arredondada + quadrado **sempre #0062FC**. Claro (corpo branco, sobre degradê) = grupos de cliente; escuro (corpo Tinta, sobre branco) = grupo interno.
- Respiro mínimo: altura do "e" em volta. Sem esticar, girar, sombra, brilho ou contorno.
- ❌ "bevel TEAM" aposentado.
- Arquivos SVG: baixar no brandkit.

## Sentido (rascunho)
- **"Um nome que soma":** B = Brolo (Arthur), V = Vitor, L = Lucas; o "e" é "e" (e Eduardo). "Na Bevel sempre cabe mais um 'e'."
- **"Juntar o que estava solto":** bevel = chanfro, junta duas faces sem quina.
- **Taglines** ("e" em itálico): "Obra *e* controle." · "Gasto *e* clareza." (do nicho atual) · **"Você *e* a Bevel."** (permanente)

## Voz e regras
- Falar do **problema resolvido e do dinheiro economizado**, não da tecnologia. Teste: tire a palavra "IA"; se ainda faz sentido para o dono do negócio, está certo.
- Não citar cliente fechado pelo nome, não inventar prova social, não usar número sem fonte.

## Como o site aplica as cores (copiar este sistema nos documentos)
Lido do CSS do brandkit em 18/10/2026. Não usar só navy liso: alternar "dobras".
| Dobra | Fundo | Texto mudo | Rótulo | Destaque ("e") | Cartão (fundo / borda) |
|---|---|---|---|---|---|
| **Escura** | #020B1E + brilho: `radial-gradient(55% 60% at 86% 22%, rgba(0,98,252,.55), transparent 70%)`, `radial-gradient(40% 40% at 6% 95%, rgba(10,58,168,.5), transparent 70%)` | #B9C8E6 | #4895F6 | #7FB2FF | rgba(255,255,255,.07) / rgba(255,255,255,.17) |
| **Profundo** | #0A3AA8 | #CBD9F2 | #BFD6FF | #7FB2FF | igual à escura |
| **Bevel** | #0062FC | #E1ECFF | #FFFFFF | #FFFFFF | rgba(255,255,255,.12) / rgba(255,255,255,.28) |
| **Clara** | #E4EBF7 | #566074 | #0062FC | #0062FC | #FFFFFF / #D3DCEC |
| **Degradê** | `linear-gradient(135deg,#010D21 0%,#021D55 55%,#0A42C8 100%)` | — | — | — | — |
- Cartões com raio **24px** (frases 20px). Títulos Jakarta 800, `letter-spacing:-.03em`, `line-height:1.06`.
- Rótulos: Inter 600, 12px, MAIÚSCULAS, `letter-spacing:.16em`.
- O "e" das taglines no site é **colorido e reto** (não itálico).
- Capa: símbolo grande à direita sobre o brilho azul.

## Superado
Paleta antiga das propostas do Zé (navy `#091222`, `#1E6BFF`, teal `#5FD3C4`, Oswald + Inter) — substituída pelo brandkit em 16/10/2026.

## Arquivos
- Logos oficiais (SVG, extraídos do brandkit em 17/10/2026): `06-Marketing/logos/`
- **Pacote do brandkit no Drive** (visto em 29/10/2026): `Drive Bevel/Marketing & IDV/Bevel Brandkit/` — 01 Logos (SVG, PNG transparente, PNG com fundo: logotipo, logo completa e símbolo, versões branca e escura) · 02 Grupos WhatsApp (fotos dos grupos cliente e time) · 04 Cores e fundos (navy, azul Bevel…).
- Apresentação institucional (2ª reunião): `06-Marketing/apresentacao/apresentacao-bevel.html` · https://claude.ai/artifact/Kfz5Nxx5Fk7m2MKMUwGPoB · PDF: `06-Marketing/apresentacao/Apresentacao-Bevel.pdf`
- **Produção (público): https://bevel-apresentacao.vercel.app** — conta Vercel do Lucas (jeflucas199-7514). Fonte do deploy: `06-Marketing/apresentacao/site-vercel/` (republicar com `npx vercel deploy --prod --scope jeflucas199-7514s-projects` dentro da pasta).
- Versão animada (slide a slide, para apresentar): `06-Marketing/apresentacao/apresentacao-bevel-animada.html` · https://claude.ai/artifact/F4oaoaeyKovSL8cGrjA1EE
