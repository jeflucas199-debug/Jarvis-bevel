# Assistente de Obra no WhatsApp
#produto #nicho

Produto principal no nicho. Nasceu com a [[Interativos]].

## Como funciona
O dono/responsável manda **mensagem ou áudio** com o que comprou, gastou ou o que falta → o sistema organiza em **planilhas** e envia **resumo semanal e mensal** com gastos, compras e andamento.

## Fluxo técnico (Zé)
Áudio no WhatsApp → transcrição (speech-to-text) → LLM (Gemini) extrai **obra, categoria, valor e etapa** → registra no Google Sheets (abas "Lançamentos" e "Etapas") → confirma na hora. Job mensal consolida e envia relatório por e-mail cruzando despesa com progresso. **Mudança pedida em 13/10:** relatório sob pedido, direto no WhatsApp, sem e-mail.
Construído em **n8n** `[inferência]` — a proposta do Júnior citava "backend Node.js/Python".

## Fases propostas
1. **MVP** — gasto por voz, obra piloto
2. **Fase 2** — início/fim de etapas com duração e motivo de atraso, relatório mensal
3. **Fase 3** — todas as obras, alertas de atraso e estouro de orçamento

## Implantação
~1 semana; **prometer 15 dias úteis**.

## Demo
Número de demonstração com obra fictícia **"Residencial Exemplo"**. VT mantém no ar e testado. Usado no [[Roteiro-Reuniao]].

## Riscos
- Depende da disciplina do dono em alimentar → **lembretes ativos do bot**.
- Já tem 6–7 concorrentes diretos ([[Concorrencia]]); "bot de gasto no WhatsApp" virou commodity.
- Economiza tempo mas é **difícil de provar em reais** → ver [[Tese-Estrategica]].
- LGPD de dado financeiro e de voz sem análise jurídica.

Relacionado: [[Modulos-e-Customizacao]] · [[Stack-Tecnica]] · [[Posicionamento]]
