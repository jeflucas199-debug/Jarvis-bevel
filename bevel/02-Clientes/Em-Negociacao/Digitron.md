# Digitron Balanças / Donato
#lead #nicho-industrial

- Fabricante de balanças de Curitiba (desde 1997). Veio por amizade pessoal dos sócios.
- **08/10/2026:** volta ao foco com o novo nicho **industrial/manufatureiro**.
- **Donato** (neto do dono): projeto de **expansão**, chance de sair de projeto pequeno para algo maior. **Reunião em 10/10/2026.**

## Histórico
- Proposta de ago/2026: **agente de IA de expedição via Telegram** (PDF da OS → LLM cadastra → funcionários atualizam status por mensagem → relatório semanal de produtos parados). Sem preço. Desenvolvimento chegou a começar no n8n.
- Nunca fechou (registro errado corrigido em 13/09). Pasta local do Zé: "Digitron - off". ClickUp: proposta em backlog.
- Pesquisa de nicho: Portarias INMETRO 157/2022 e 657/2025 abrem espaço para **software de gestão de calibração**.

## Próximo
- [ ] Reunião com o Donato (10/10, presencial, Zé + VT; Lucas talvez por Meet) — **descoberta, não venda** → [[2026-10-10-Donato-Digitron]]
- [ ] Montar PDF de proposta de projeto (no estilo do Chico/XÁ) e ofertar direto à empresa

## Plano de ação do Zé (out/2026) — `_arquivo/digitron-fluxo-e-plano-de-acao-zé.html`
- Bot de expedição **no WhatsApp** (antes Telegram): cadastra a OS lendo o PDF/foto, atualiza status por texto ou áudio, responde consultas, relatório toda segunda 8h e alerta de produtos parados nos dias úteis às 9h.
- Etapas: Cadastrado → Em separação → Em pesagem → Em embalagem → Pronto para envio → Enviado (+ Com pendência).
- Stack: n8n (65 nós, **ainda não importado num n8n real**), Evolution API, Gemini 2.5 Flash, Google Sheets (abas Produtos, Historico, Relatorios).
- Pessoas citadas: Donato e o **tio (diretor industrial)**.

### Revisão do Claude (09/10)
- Ótimo como **documento interno**; **não pode ir para o cliente como está** (expõe n8n, credenciais, faturamento no CPF, "preço por ligação", caso Júnior, Evolution não oficial).
- Fazer **duas versões**: interna (este plano) e **proposta para o cliente** (resumo executivo, diagnóstico com números deles, solução, fases com critério de aceite, o que a Digitron fornece, dados e segurança, suporte, investimento, próximos passos).
- Na reunião de 10/10, **descobrir antes de mostrar**: a expansão do Donato pode precisar de outra coisa que não a expedição.
- Empresa grande → pesam: **nota fiscal/CNPJ**, API oficial do WhatsApp vs Evolution, dados na conta Google deles, LGPD, SLA de suporte.
- Mensalidade: **não usar "10% como nos outros"** — o Gabe mostrou que 10% não cobre o custo. Estimar custo de Gemini pelo volume de OS e cobrar custo + margem.

- **ClickUp (09/10):** "Proposta Comercial - DIGITRON BALANÇAS" — VT, urgente, prazo **16/10**.

- **24/10 (CRM):** lead em "Agendado", valor estimado R$ 7.500. Tarefas: VT estrutura 2 projetos + preço até 27/10; Zé monta a proposta até 29/10.

- **28/10 (CRM):** "estruturar projeto digitron" (VT + Arthur, urgente, em execução) teve o prazo adiado de 27/10 para **10/11/2026**. A tarefa "proposta Digitron" (Zé, 29/10) não aparece mais no CRM; a proposta só sai depois dessa estruturação.

- **24/10 (ata da reunião de sócios):** existe uma **carta de apresentação final do Donato**; todos os sócios leem e mandam feedback **até 25/10/2026**. A carta não está no cofre → guardar em `_arquivo/` quando estiver final. Reunião de 10/10: a ata não diz o que saiu `[a confirmar]`. → [[2026-10-24-Socios]]
