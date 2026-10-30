# EQUIVET — Hospital veterinário 24h
#lead #fora-do-nicho #indicacao

- **Indicação:** Malu, amiga do time, que trabalha lá; falou com o **VT**.
- **Contatos:** **Monika**, responsável pelo Comercial (de férias, volta no início de novembro). Uma pessoa nova que entrou para ajudar no setor está falando com a Bevel e pode ficar fixa. Nomes `[a confirmar]`.
- **1ª reunião:** 13/10/2026, 20h → [[2026-10-13-Equivet]]
- **Briefing interno:** feito pelo **Du** em 16/10 → `_arquivo/briefing-equivet-du-2026-10-16.pdf`
- **2ª reunião (proposta):** ~~seg 19/10, 19h30~~ cancelada → **terça, 20/10/2026, 20h30** → [[2026-10-20-Equivet-2a-reuniao]]

## Problema
Veterinários pedem medicamentos num **grupo de WhatsApp da farmácia**. Os pedidos se misturam com conversa, não há lista central, pedidos se perdem ou são **comprados duas vezes**. A responsável negocia com fornecedores pelo número do Comercial (o mesmo número também trata de faturamento).

## Solução (direção confirmada)
Automação lê o grupo e registra cada pedido numa planilha, **marca possíveis duplicados** (sem apagar nada), **não responde no grupo** e não compra nada. A responsável atualiza cotações e status ao longo do dia e recebe um **resumo privado no fim do dia**.
- Planilha: abas Solicitações · Cotações e compras · Resumo.
- Status (a validar): Solicitação recebida → Em cotação → Cotação recebida → Pedido enviado → Aguardando confirmação → Confirmado → Recebido · Sem compra registrada.
- **Opção A (recomendada):** só lê o grupo; pessoa atualiza compras. **Opção B:** também lê conversas com fornecedores (mais risco de associar cotação errada; precisa excluir faturamento).
- Fora do escopo: controle de estoque, respostas no grupo, escolha de fornecedor, compra automática.
- Futuro: registro de retiradas por QR code na farmácia.

## Revisão do Claude (16/10) — sugestões para o briefing/proposta
1. **Número dedicado no grupo** em vez de conectar o número do Comercial: tira o risco de bloqueio da linha comercial (Evolution não é API oficial), evita ler conversas de fornecedor/faturamento e simplifica LGPD.
2. **Atualizar status pelo WhatsApp** (mensagem privada ao bot) em vez de abrir a planilha — reduz o risco de a responsável não atualizar.
3. **Catálogo de medicamentos** + marcação de "não entendi" para nomes abreviados/comerciais; perguntar se pedem por áudio ou foto.
4. **Linha de base e critério de sucesso** do piloto: quantos pedidos se perdem/duplicam hoje; meta do piloto.
5. **Dados e LGPD:** planilha na conta Google da EQUIVET; mensagens podem ter dados de tutores/pacientes.
6. **Quem aprova e assina** — Monika só volta em novembro; risco de a proposta parar até lá.
7. **Fases com preço:** A = Fase 1, B = Fase 2, QR code = Fase 3 (land and expand).
8. **Custo:** a automação lê todas as mensagens do grupo 24h → perguntar volume/dia para calcular a mensalidade (custo + margem). Hospital pode exigir **nota fiscal**.
9. Na proposta ao cliente, trocar "IA" por "automação" (regra da mentoria).

Fora dos 3 nichos → 4 filtros de [[Nicho]]. Referência de preço para veterinária: [[Muzao]] / [[Planos-Chatbot]].

## Proposta comercial (19/10/2026) — `_arquivo/proposta-equivet-2026-10-19.pdf`
- 11 páginas, no brandkit. "Organização dos pedidos de medicamentos — menos pedidos repetidos e compras na quantidade certa."
- Assistente lê os grupos da farmácia → planilha (remédio, quantidade, data, quem pediu) → **soma pedidos do mesmo remédio no mesmo dia e "emite" um pedido** → aviso de possível repetição nos últimos 2 dias → lista do dia às 18h + lista da noite de manhã. Não responde no grupo.
- **Plano 1 (pedidos): R$ 3.499** instalação · **Plano 2 (pedidos + estoque por NFC ou formulário): R$ 4.299** · mensalidade "a combinar" (inclui tudo: WhatsApp, automação, leitura, planilha, 24h, suporte). Validade 15 dias.
- Prazo Plano 1: 4 semanas a partir da liberação do acesso ao WhatsApp da farmácia.

### Revisão do Claude antes da call (19/10)
- ⚠️ **Somar pedidos do mesmo dia contradiz a dor**: se a Dra. Ana e o Dr. Paulo pedirem o mesmo remédio por esquecimento, somar vira a compra em dobro. Sugestão: somar **e marcar para a responsável confirmar** antes de emitir.
- Esclarecer o que é "emitir" (marcar na planilha × mandar ao fornecedor). O briefing dizia que a automação não decide compra.
- Ter **faixa de mensalidade** pronta (custo de leitura 24h dos grupos + margem) — "nada à parte" significa que a Bevel absorve o custo.
- Plano 2 (estoque) estava fora do escopo no briefing e o hospital tem sistema próprio; NFC foi uma linha pausada em 21/09. Cuidado com prazo e escopo.
- Levar: quem aprova/assina (Monika volta em novembro), 50% de entrada, nota fiscal, número dedicado ao bot, volume de mensagens/dia.

## Proposta atualizada em HTML (19/10, tarde) — `_arquivo/proposta-equivet-site-2026-10-19.html`
- Mesma estrutura + **demonstração interativa** (grupo de WhatsApp → planilha → aviso de repetido → lista das 18h), com dados fictícios.
- **Mensalidade definida: Plano 1 R$ 419,88/mês · Plano 2 R$ 515,88/mês** (12% da instalação). Instalação mantida: R$ 3.499 / R$ 4.299.
- Seção "O que a mensalidade cobre" agora cita as ferramentas: n8n, Evolution API, "OpenAI e Claude", Google Planilhas, servidor, horas de manutenção.
- Revisão do Claude: (1) a soma automática no mesmo dia continua sem confirmação da responsável; (2) a leitura na prática roda no **Gemini**, não em OpenAI/Claude — conferir com o VT; (3) citar Evolution API e as marcas expõe o "como" e convida o cliente a comparar fornecedores — melhor descrever a função, não a ferramenta.

## Após a 2ª reunião (20/10/2026)
- Não fechado; Gabriele leva ao médico e ao financeiro em 21/10. Condições ditas na call e pedidos novos (Totem, aviso de 4–5 dias, dose diferente, crédito acumulado, upgrade pela diferença) em [[2026-10-20-Equivet-2a-reuniao]].

## Status e pendências (24/10/2026)
- **Retorno da Gabriele:** prazo era 21/10; **nenhum retorno registrado** no cofre `[a confirmar com o Du]`. Pelo [[Processo-de-Vendas-e-Entrega]], follow-up do Lucas nos dias 2 (22/10), **5 (25/10)**, 10 (30/10), 20 e 30.
- **Validade da proposta:** 15 dias a partir de 19/10 → **vence em 03/11/2026**, mesma época da volta da Monika.
- **PDF com pagamento:** item do Arthur (incluir parcelamento) e envio do Du pelo WhatsApp sem confirmação de que foram feitos. O PDF no `_arquivo/` ainda diz mensalidade e pagamento "a combinar".
- **Contrato — condições da call que conflitam com o [[Contrato-Modelo]]:** mensalidade 12% × 10% no modelo · "fixa" × reajuste IPCA · 4x cartão / Pix 3x / 15-30-45 × entrada padrão (35% em [[Precos]], 50% em [[Pagamentos]]) · "crédito de IA acumula" não existe no modelo e não há franquia definida (precisa de limite) · upgrade pela diferença · fidelidade 12 meses e multa de 15% não foram ditas na call.
- **Totem:** pedido novo, fora da proposta → orçamento à parte (cláusula "fora do escopo"); falta saber se o Totem tem API/exportação.
- **Nota fiscal:** sem CNPJ só há recibo/RPA no CPF do Vitor ([[Estrutura-Fiscal]]); hospital tende a exigir NF.
- **Número próprio:** a proposta diz "acesso ao WhatsApp da farmácia"; sugestão do Claude (16/10) é número dedicado no grupo. Decidir quem paga o chip e se entra na mensalidade.
- ⚠️ Divergência: [[Registro-de-Decisoes]] (19/10) diz que **Du + Vitor** conduziriam a 2ª reunião; a ata diz **Eduardo e Arthur**.

- **24/10 (CRM):** etapa "Promessa", valor R$ 3.500.
- **27/10 (call da Accelera):** os sócios disseram que a EQUIVET é "certeza essa semana", mas a contato ainda não tinha levado a decisão ao responsável. Sugestão do documento do Du: falar direto com quem decide. → [[2026-10-27-Accelera-360]]
