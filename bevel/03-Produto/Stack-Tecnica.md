# Stack técnica
#produto #tecnico

| Peça | Uso | Obs. |
|---|---|---|
| **n8n** | Orquestração de todas as automações | Hospedagem com custo |
| **Evolution API** | Conexão com WhatsApp | Escolhida em 21/09 no lugar da API oficial da Meta (QR code, reaproveita o número). **Não é oficial** → risco de política do WhatsApp |
| WhatsApp Cloud API, Z-API | Avaliadas, não usadas | |
| **Gemini API** | LLM | Bugs pontuais registrados; créditos pré-pagos |
| Speech-to-text | Transcrição de áudio | |
| Google Sheets / Calendar / Drive | Armazenamento e agenda dos clientes | |
| Telegram Bot API | Proposta Digitron; teste do "Mu" | |
| OpenAI, Claude | Exibidos no site | |
| Vercel | Landing page | |
| React Native + Expo, Node.js, PostgreSQL | App da XÁ (Guilherme) | |

**Custo variável por cliente ainda não calculado** (Gemini, Evolution, servidor, número) — só o VT tem → [[Precos]].
Nenhum JSON de workflow do n8n está documentado ainda.

## Automações internas
- Publicação automática em redes a partir do Google Drive (Vitor).
- Radar de vagas no LinkedIn ([[Leads-Radar-LinkedIn]]).
- Geração automática de propostas (ideia, 14/09).
- Backlog sem descrição: "HERMES", "OPEN CLAW", "Projeto - front office".

## Custo observado
- Bot do Gabe: ~US$ 10/semana (estimativa por cima do Vitor, não confirmada). Ver se dá para reduzir: modelo mais barato do Gemini, prompt e histórico menores por mensagem.
