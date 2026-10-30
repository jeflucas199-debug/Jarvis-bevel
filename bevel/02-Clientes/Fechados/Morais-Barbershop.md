# Morais Barbershop (Gabe)
#cliente #fechado #barbearia

- **Contato:** Gabriel "Gabe" Morais. Barbearia em Curitiba, 11 anos de barbearia, 5 de marca. Veio por indicação pessoal.
- **Produto:** [[Chatbot-Agendamento]] de WhatsApp, atendimento e agendamento 24h.
- **Status:** **em produção desde 06/10/2026** ("Deploy em produção" e "Cliente avisado" concluídos no ClickUp).

## Status em 2026-10-24
- Parcela de **20/10 (R$ 357,50): sem registro de recebimento** nas notas nem tarefa no ClickUp → `[a confirmar]` se o Gabe pagou e em qual conta. Pelo contrato, multa 2% + juros 1% a.m. se atrasada.
- Próximas: 20/11 e 20/12 (R$ 357,50 cada). Não há tarefa de cobrança dessas parcelas no ClickUp.
- Custo real do bot: medir na fatura do cartão do Lucas que fecha em **27/10**.

## Contrato
- Assinado eletronicamente (valida.ae). Vigência inicial 02/09 a 09/10/2026 (1 mês de dev + 1 semana de implantação/testes).
- Plano no contrato: **"Chatbot Padrão", R$ 1.190**. O cofre do Zé diz "Plano 3".
- Parcelas: 2 × R$ 178,75 (02/09 e 25/09, **pagas**) + 3 × R$ 357,50 (20/10, 20/11, 20/12). Soma R$ 1.430.
  Provável explicação: R$ 1.190 + 2 meses de manutenção inclusos (out e nov) `[inferência]`.
- **Mensalidade:** 10% do contrato a partir de **20/12/2026**, todo dia 20 (≈ R$ 119) — fidelidade de 12 meses.
- ⚠️ O 1º pagamento caiu na **conta pessoal do Arthur** — precisa regularizar.

## Escopo levantado (10/09)
10 serviços avulsos (ex.: corte R$ 65/35 min; barba express R$ 70), 3 assinaturas ilimitadas (R$ 100 / 159,90 / 199,90), produtos Fox, 10% de desconto para assinante. Platinado, luzes e progressiva sem preço fixo. Bot pergunta preferência de barbeiro.

## Técnico
Evolution API (QR code, reaproveita o número) + Gemini. Prompt humanizado. Testado pelos 4 sócios.
Tarefa "verificar consulta de horário no Cash Barber" concluída, **resultado não anotado**.

## Backlog (ClickUp — conferido em 2026-10-24)
- [x] Check-in de 1 semana — **concluído no ClickUp em 06/10** (mesmo dia do deploy; parece marcado em lote, **sem registro do que foi conversado**)
- [ ] Go-live formal (ainda em backlog)
- [ ] Acompanhamento assistido e check-in mensal
- [ ] Cobrança recorrente
- [ ] Nota fiscal (impossível sem CNPJ)

## Em discussão (09/10/2026): aumentar a manutenção?
- Lucas acha que a mensalidade de ~R$ 119 está baixa e quer discutir aumento depois que as parcelas terminarem.
- Limite contratual: 10% do valor total, reajuste só anual por IPCA, fidelidade 12 meses a partir de 20/12. Aumento só por **acordo (aditivo)** ou cobrando **escopo novo** à parte.
- [ ] Conferir no PDF assinado: base dos 10% (R$ 1.190 ou R$ 1.430) e se 20/12 tem parcela + mensalidade
- **Custo do bot:** ~US$ 10/semana (≈ R$ 230–250/mês). ⚠️ **Estimativa por cima do Vitor, não confirmada (10/10)** — não usar como dado real. Se fosse real, os ~R$ 119 de mensalidade não cobririam o custo. Os custos do Gabe entram na fatura do cartão do Lucas que fecha em 27/10.
- Ainda em **período de teste**; funcionalidades novas são possíveis.
- **Decisão (09/10):** só mexer na mensalidade **depois que ele pagar o valor cheio do projeto** (última parcela em 20/12).
- ⚠️ A fidelidade de 12 meses e a mensalidade de 10% começam no mesmo 20/12. Se o aditivo não estiver assinado até lá, o valor antigo fica valendo pelo contrato. → negociar na 1ª quinzena de dezembro, com efeito a partir de 20/12 ou janeiro.
- [ ] VT: ver se dá para baixar o custo (modelo do Gemini, tamanho do prompt/histórico enviado a cada mensagem)

- **24/10 (CRM):** tarefa "Reunião com o pai do Gabe" — Lucas, até 06/11/2026. Motivo `[a confirmar]`. Status da parcela de 20/10 `[a confirmar]`.
- **25/10 (CRM):** tarefa nova "followup no gabe" — VT, até 02/11/2026, urgente: falar com ele sobre o pagamento total do projeto.
- ⚠️ **27/10 (dito pelos sócios na call da Accelera):** **o Gabe cancelou**. Ele vai fechar a barbearia e sair do Brasil em dezembro. Não há mensalidade a partir de 20/12. **A confirmar:** se as parcelas de 20/10, 20/11 e 20/12 (R$ 1.072,50) ainda serão pagas, quando o bot sai do ar e se a nota muda para Parados-ou-Perdidos. → [[2026-10-27-Accelera-360]]
- **28/10 (Lucas):** o Gabe vai pagar **1 parcela (R$ 357,50) + o valor de 1 mensalidade em 30/10/2026**. Valor da mensalidade `[a confirmar]`: R$ 119 se for 10% de R$ 1.190, ou R$ 143 se for 10% de R$ 1.430. **A confirmar:** se esse pagamento quita tudo ou se as parcelas de 20/11 e 20/12 continuam. Mensagem de cobrança redigida pelo Jarvis para o Lucas enviar.
- **28/10 (CRM):** "followup no gabe" agora está com o **Lucas**, "em execução" (até 02/11). A tarefa "Reunião com o pai do Gabe" não existe mais no CRM (apagada ou renomeada `[a confirmar]`).
