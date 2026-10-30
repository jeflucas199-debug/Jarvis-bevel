# Escolinha do Furacão (Tafarel — personal da namorada do Lucas)
#lead #fora-do-nicho #indicacao

- **Contato:** **Tafa**, personal trainer da namorada do Lucas, dono de uma escolinha de futebol.
- **Pedido:** "secretária com automação" — atendimento/secretaria automatizada.
- **Origem:** indicação pessoal (Lucas).
- **Status:** 1ª reunião **ter 20/10/2026, 19h30**, conduzida por **Lucas + Zé** → [[2026-10-20-Tafa]]
- **Status (29/10/2026): em espera / promessa.** Reunião de apresentação da proposta em 29/10, 19h30 (Lucas). Foi boa, mas o Tafa disse que **no momento não faz sentido** para ele. Ele vai abrir **outra escolinha em jan–fev/2027** e disse que volta a falar com a Bevel quando ela começar a tracionar. Ata e gravação da reunião: o **Zé** ainda vai mandar ao Lucas (29/10) → criar `09-Reunioes/2026-10-29-Tafa.md` quando chegar.

## Hipóteses para a reunião (a validar)
Matrícula e cadastro de alunos, horários de treino, cobrança de mensalidade dos alunos, avisos para pais, confirmação de presença.
Base reaproveitável: [[Chatbot-Agendamento]].

Fora dos 3 nichos → 4 filtros de [[Nicho]].

## Após a 1ª reunião (20/10/2026)
- Escolinha do Furacão, ~140 alunos, 1 unidade. Dor principal: WhatsApp compartilhado e sobrecarregado (matrícula, aula experimental, dúvidas dos pais, convocação de jogos, lembrete e conciliação de Pix). Sistema Joga + planilhas.
- Bot anterior falhou → precisa de escopo claro do que o bot faz e de passagem para humano.
- Próximo: proposta em PDF + reunião de revisão. Detalhes: [[2026-10-20-Tafa]].

## Planejamento da proposta (rascunho do Claude, 24/10/2026, a validar com Lucas e Arthur)
**Prazo do processo:** 2ª reunião (projeto) idealmente 4–7 dias após 20/10, ou seja, **até 27/10**. Preço definido por Arthur + Vitor ([[Processo-de-Vendas-e-Entrega]]).

### Lacunas a perguntar ao Tafa (antes ou na 2ª reunião)
- **Decisão e dinheiro:** Tafa é o dono e decide sozinho? Faixa de investimento?
- **Volume:** mensagens/dia no número, contatos novos por mês, quantos viram aula experimental e matrícula.
- **Pessoas:** quem é a "secretária" que manda os lembretes (é o Luiz ou outra pessoa)? Quem assume o que o bot não resolve, e em que horário?
- **Bot anterior:** qual ferramenta, quanto pagavam, o que exatamente irritava os pais.
- **Conteúdo:** folheto atual (horários, faixas etárias, valores, transporte, uniforme), regras de aula experimental (dias, vagas, idade).
- **Jogos:** nº de categorias e atletas por categoria; como montam a lista hoje; prazo para confirmar.
- **Número/API oficial:** manter o número atual ou usar um novo? A escola tem CNPJ (necessário para a API oficial da Meta)? Custo por mensagem da Meta é repassado.
- **Joga:** link/contato do Joga (pedido em 20/10) para saber se há API ou exportação.
- **Pix:** banco da escola e se gera extrato (para conferir comprovante automaticamente).
- **LGPD/menores:** como os pais autorizam o uso de dados hoje (contrato de matrícula?).

### Escopo sugerido em fases
- **Fase 1 — Secretária virtual (atendimento):** responde dúvidas do folheto, faz pré-cadastro, agenda aula experimental (ter/qui/sáb), registra em planilha e **passa para o Luiz com resumo** quando não resolve. Escopo fechado e limite de tentativas, para não repetir o erro do bot anterior. Base: [[Chatbot-Agendamento]].
- **Fase 2 — Convocação de jogos:** envio por categoria pela API oficial, botões Sim/Não, lista de confirmados para o professor, lembrete a quem não respondeu.
- **Fase 3 — Financeiro:** lembrete de mensalidade (3 dias antes e no atraso), leitura do comprovante Pix e baixa na planilha; integração com o Joga só se houver API. Maior risco técnico.
- Formato sugerido: mesmo modelo da proposta EQUIVET (situação atual → solução → dia a dia → responsabilidades → planos → prazo), com Fase 1 como plano base e Fases 2–3 como planos/opcionais. Valores [a definir por Arthur + Vitor].

- **24/10 (CRM):** "Escolinha Furacão Maúa", valor estimado R$ 3.500. **Reunião 27/10/2026, 19h30.** Tarefas: VT termina o projeto até 26/10 (não mandar o projeto em doc de proposta); Zé monta a proposta até 27/10.

## Proposta comercial (Zé, 28/10/2026) — `_arquivo/2026-10-28-Proposta Escolinha do Furacao.pdf`
- 15 páginas, no brandkit. "Atendimento e rotina da escola no WhatsApp". Validade 15 dias → **vence em 12/11/2026**. **Reunião de revisão com o Tafarel: 29/10/2026** (Lucas).
- **Plano 1 (recomendado):** R$ 4.000 de instalação + R$ 480/mês. Atendimento, folheto por idade, aula experimental, dados da matrícula entregues ao professor, respostas às convocações, repasse de comprovantes Pix e lembrete mensal. Lê o JOGA só para consultar horários e categorias.
- **Plano 2:** R$ 7.000 + R$ 840/mês. Tudo do Plano 1, mais cadastro direto no JOGA, convocação enviada pelo assistente e registro de interessados com relatório mensal.
- Mensalidade = 12% da instalação (mesma regra da EQUIVET). Prazo: 4 semanas a partir da assinatura. Pagamento: Pix, cartão em até 4x sem juros ou de 5x a 12x com taxa, Pix no crédito em até 3x. A combinar: número do WhatsApp e acesso ao JOGA.
- Valor acima do estimado no CRM (R$ 3.500).

### Revisão do Claude (28/10)
1. **A dor da capa só é resolvida no Plano 2:** "não sabe quantos interessados desistem" é o destaque da pág. 4, mas o registro de interessados só existe no Plano 2, e o recomendado é o Plano 1. Sugestão: colocar um registro simples de interessados no Plano 1 ou mudar o destaque.
2. **O Plano 1 também depende do JOGA** (consulta de horários e categorias), mas a API do JOGA ainda é desconhecida. Confirmar antes de prometer, ou prever um plano B (planilha de horários).
3. **Risco de bloqueio do número:** a proposta usa o número atual da escola com Evolution API (não oficial). Em 20/10 foi dito que envio em massa pode banir o número → definir número dedicado ou API oficial.
4. **Pág. 12 expõe as ferramentas** (n8n, Evolution, "OpenAI e Claude", Hostinger). É o mesmo ponto da EQUIVET; a leitura na prática roda no Gemini. Melhor descrever a função.
5. **Condições incompletas:** faltam entrada (35% ou 50%), início da mensalidade, fidelidade, reajuste e quem emite a nota/recibo (sem CNPJ).
6. **Lembrete de mensalidade:** em 20/10 era 3 dias antes **e** no atraso; a proposta só fala do aviso no vencimento.
7. **Prazo:** contar da assinatura **e da liberação dos acessos** (número e JOGA), como na EQUIVET.
8. "Prezados" → personalizar para o Tafarel.

### Arquivos no Drive (vistos em 29/10) — pasta `Bevel/Clientes/escolinha furacao /`
- `Proposta_Comercial_Escolinha_do_Furacao.pdf`: **projeto do Vitor (26/10)**, 8 págs., texto detalhado de como cada plano funciona. Plano 1: consulta o JOGA só para ler horários e categorias; a convocação é enviada pelo professor e o assistente responde lendo as últimas 5 a 10 mensagens do chat; o comprovante Pix é encaminhado ao número particular do professor; o lembrete de mensalidade é mensal, sem conferir pagamento; o assistente pausa se o professor escrever. Plano 2: cadastro direto no JOGA (confere CPF e se o aluno já existe), convocação enviada pelo assistente e funil com relatório mensal. Cronograma de 4 semanas, com testes num número da Bevel antes de passar para o da escola. Custo interno de ferramentas: cerca de R$ 387/mês (não mostrar ao cliente). Horas de suporte: a definir.
- `ideia de projeto escolinha furacao.pdf`: rascunho de 22/10 com 3 planos e sem preços (superado).
- `Projeto Escolinha do Furacão.docx`: não lido (Word).

- **24/10 (ata da reunião de sócios):** "tentar marcar a reunião com o Tafarel nesta semana" e **proposta finalizada até 28/10**; responsáveis "a definir". ⚠️ Conflita com o CRM (reunião 27/10 19h30, proposta do Zé até 27/10) → [[Divergencias-a-Resolver]] #24 · [[2026-10-24-Socios]].
