# Ferramentas
#operacao

| Ferramenta | Uso |
|---|---|
| ClickUp | Gestão e CRM ([[ClickUp]]) |
| n8n, Evolution API, Gemini | Automações ([[Stack-Tecnica]]) |
| Google Sheets / Drive / Calendar | Dados dos clientes |
| Claude (chat, Projects, Claude Code) | Um Project por cliente/frente |
| tl;dv | Grava e transcreve reuniões |
| Canva, Artlist | Criativos, vídeo e voz |
| PowerPoint / Word | Propostas e contratos |
| Vercel | Landing page |
| Obsidian | Segundo cérebro do Zé (e este aqui) |
| valida.ae | Assinatura eletrônica de contrato |

## ⚠️ Segurança
Existem logins e senhas de contas da empresa (e-mail Outlook e Instagram) em documentos de texto soltos na pasta do Zé (`CONTAS/CONTAS.docx` e uma folha de rosto). **Não foram copiados para cá.** Recomendação: mover para um gerenciador de senhas compartilhado.

## Google Drive da Bevel (20/10/2026)
- O Claude tem acesso ao Drive pela conta do Lucas, incluindo o que foi compartilhado com ele.
- Pastas: **"Bevel"** (dona: bevelsystems@gmail.com, compartilhada com o Lucas) · "Bevel Brandkit" · "BEVEL Systems" (do Vitor).
- Arquivos relevantes: "[Bevel] Fluxo de caixa e contratos" (planilha, 16/10) · "brandkit-completo.pdf" · "Carta de apresentação" (.pptx/.pdf).

## Obsidian + Claudian (24/10/2026)
- Cofre do Obsidian = `~/Desktop/bevel`. Plugin **Claudian** (Yishen Tu) ativo, usando o Claude Code local; modelos Sonnet 5.5 (padrão) e Opus 5.5.
- Backup antes de ativar plugins: `~/Desktop/bevel-backup-2026-10-24.zip`.
- Uso sugerido: Claudian para notas e perguntas do dia a dia; app do Claude (Code) para ClickUp, Drive, publicar páginas/Vercel e navegador.

## Ideia: "Jarvis" por voz (Lucas, 2026-10-28) — em discussão
- Objetivo: falar em vez de digitar, com um ponto de entrada só (a Geral), que entende o tema ("CRM", "EQUIVET"…) e manda para a sessão certa sem perder o foco de cada uma.
- Caminho sugerido pelo Claude, em etapas: (1) **voz → texto** com o ditado do macOS (grátis) ou um app de ditado com atalho global (ex.: Wispr Flow, Superwhisper — conferir preço) · (2) **a Geral como roteador:** ela identifica o tema e repassa a mensagem para a sessão do setor/cliente (ferramenta de mensagens entre sessões do app) e abre a sessão ao lado · (3) depois, se valer a pena: resposta falada e palavra de ativação, como projeto à parte.
- Tabela de roteamento (tema → sessão) ficaria no `CLAUDE.md`, a partir da lista da barra lateral em [[Conversas-Claude]].
- **Decisão do Lucas (28/10):** quer **falar e ser respondido por voz**.
### Análise do vídeo "Construí meu próprio Jarvis com Claude Code + Obsidian" (Gabriel Rabelo, 16 min) — Claude, 2026-10-28
https://www.youtube.com/watch?v=plH2tvy37r0
- **O que é o "Odin":** app web próprio (Next.js + robô 3D) com duas metades: (1) **chat por voz** que consulta o Obsidian antes de responder (RAG: notas em banco vetorial Supabase/pgvector) e (2) **pipeline de prospecção** com 6 agentes (pesquisa no Maps → analisa o site → qualifica → nota 0–10 → escreve a mensagem) e **aprovação humana** antes de enviar no WhatsApp.
- **Stack:** voz de entrada = Web Speech API do Chrome (grátis) · cérebro = API do Gemini (reserva: GPT-4o mini) · voz de saída = OpenAI TTS · agentes = LangGraph. O Claude Code foi usado para **construir**, não é o cérebro do Odin.
- **Limite para a Bevel:** o Odin **só lê** as notas; não registra decisão, não edita nota, não repassa para sessões. É um app para manter (servidor, chaves de API, custo por uso).
- **Caminho sugerido para a Bevel:**
  1. **Agora (teste, sem programar):** o próprio Claude (Geral) como cérebro, já com leitura e escrita no cofre e repasse para as sessões. Voz de entrada: ditado do macOS ou Wispr Flow. Voz de saída: hook do Claude Code que lê em voz alta um resumo curto de cada resposta (voz do Mac de graça; voz melhor com TTS pago). `[a testar se o hook funciona no app desktop]`
  2. **Depois, se valer:** um "Jarvis da Bevel" no estilo do Odin (app próprio com palavra de ativação), feito por VT/Gui — e que serve de **demonstração vendável** (ver [[Modulos-e-Customizacao]]).
- **Decisão do Lucas (28/10): pular a etapa 1 e partir direto para o app próprio** no estilo do Odin → desenho completo em [[Jarvis-Bevel]].
- O cofre é pequeno (~100 notas): o Claude lê os arquivos direto, não precisa de banco vetorial por enquanto.

