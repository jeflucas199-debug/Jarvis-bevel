# Ortech (Augusto "Guto" Piano)
#cliente

- **Contato / decisor:** Augusto Francisco Piano (Guto), filho do dono. Trabalha em banco e com consultoria de investimentos; quer assumir com o pai a parte de automação e IA do escritório. **Orçamento e decisão passam pelo pai.**
- **Empresa:** Ortech Assessoria Contábil e Consultoria · **mais de 40 anos** · foco em comércio varejista e prestadores de serviço · cerca de 300 clientes ativos · 18 usuários internos (15 funcionários + 3 administradores: Augusto, o pai e o tio)
- **Cidade:** Curitiba (PR) (fonte: briefing deles)
- **Como chegou:** `[a confirmar]`
- **Status:** diagnóstico feito em 27/10/2026 → **não fechado**. Proposta só quando existir o projeto (roadmap do Du).
- **Valor:** no CRM, lead "Augusto Francisco Piano", Sistema, **R$ 30.000** (estimativa, não é proposta) · mensalidade a definir. Há caixa, mas não há orçamento definido.
- **Fora dos nichos** construção/imobiliário/industrial (ver Divergências abaixo).
- Relatório pós-diagnóstico (Zé para o Gui, 28/10): `_arquivo/2026-10-28-Relatório pós diagnóstico.pdf` · reunião: [[2026-10-27-Ortech-Diagnostico]]
- **Briefing de requisitos da Ortech** (documento deles, v1.1 de 24/10, apresentado pelo Augusto na reunião) → resumo completo em [[Ortech-Briefing-Requisitos]]
- Pasta no Drive: "Ortech - Gutão" (do Zé) — https://drive.google.com/drive/folders/13MAg1sF1Ff4oZuFpDVn6mCTGnGsSJngE
- Gravação no tldv: tldv.io/app/meetings/6ae14f8909686a0013a7f0e8 · ata completa e pasta de trabalho no Drive (BEVEL › Propostas › Ortech)

## O que querem
- **Dor principal:** o **Komunic** (nas notas antigas aparece como "Comunique"; é o produto de WhatsApp do próprio Acessórias, https://acessorias.com/site/komunic-gestao/) (atendimento ao cliente; custa ~R$ 700–1.000/mês `[a confirmar com o pai]`) é fraco: sem triagem, sem IA, só mensagem rápida. O Augusto mapeou isso com a equipe nas férias.
- **Fase 1 (foco da proposta):** atendimento no WhatsApp + CRM (feito do zero) para os clientes que já têm, com triagem por IA.
- **Fase 2:** agente interno de IA por departamento (RH, fiscal, contábil; dúvidas de lei, sindicato e instrução normativa).
- **Fase 3:** plataforma para os clientes do escritório, só depois de validar internamente.
- Ideias sem fase definida: e-mail automático todo dia 5 com o relatório de faturamento (busca no Drive) · consultar e enviar documentos do Drive · treinamentos gravados integrados ao Calendar · painel (NPS, obrigações no prazo) pela API do Acessórias (Fase 2 ou 3).
- **Ideia paralela:** marketplace de mão de obra temporária para supermercados (PWA). Sem escopo nem prazo; não prometer nada.

## Sistemas de hoje
- **Acessórias** (tarefas, tem API; https://app.acessorias.com/): **fica**. **Komunic** (WhatsApp do Acessórias): **sai**.
- **Sistema contábil:** provavelmente o **SCI** (https://www.sci.com.br/, link mandado pelo Augusto) `[confirmar]`; hoje roda pelo servidor local. A 1ª pergunta do briefing é se ele pode ir para a nuvem.
- **Já usam automação e IA:** n8n (Easypanel), Supabase com pgvector, Evolution API no WhatsApp e um "Agente Fiscal" pela metade, com aprovação pelo WhatsApp (briefing). Querem saber o que dá para reaproveitar.
- **Visual deles:** design system da Ortech (ouro sobre verde muito escuro; Figtree e Albert Sans). Tudo que for para eles segue esse visual.
- Servidor local sincronizado com o Google Drive (por cliente/departamento/tipo de documento) + robô local que lê o CNPJ e manda e-mail para o cliente certo. Ainda não foi decidido o que fazer com eles.
- E-mail: cancelaram a LocalWeb e estão avaliando o Google Workspace. Têm uma VPS na Hostinger.
- ⚠️ **Dados sensíveis:** mais de 500 certificados digitais de clientes (assinam documentos fiscais e o SPED). A segurança precisa entrar no projeto desde o início: criptografia, backup, perfis de acesso e cláusula no contrato.

## Já decidido na reunião (27/10)
- O CRM vai ser feito do zero, sob medida, e o Augusto deixou a decisão técnica com a Bevel.
- WhatsApp por **API não oficial**: o Vitor considera segura porque o uso é atendimento, não disparo em massa.
- Cobrança: valor fixo do projeto + mensalidade (que cobre IA, suporte e o custo de manter o sistema rodando).

## Decisões a tomar (relatório, p. 14–15)
1. Aceitar a Ortech: seguir com o projeto todo, só com a Fase 1 ou não seguir (quem decide: Zé)
2. Definir o que entra na Fase 1 (o Du propõe; Zé e VT validam)
3. Definir quem constrói: VT e Gui
4. Preço e mensalidade: manter os 12% da instalação ou cobrar a mensalidade pelo uso real de IA (Zé e VT)
5. Onde o sistema vai rodar: no servidor do cliente, no da Bevel ou nos dois (VT e Gui)
6. Como ligar o WhatsApp: Evolution em número próprio, no número atual ou API oficial da Meta (VT)
7. Até onde a Bevel acessa os certificados (Zé e VT)
8. O que fazer com o marketplace (Zé e sócios)

## Perguntas em aberto para o cliente
Quantas conversas por dia · quantos números e atendentes · regras da triagem por departamento · o que a IA pode responder sozinha · se o Comunique exporta o histórico · o que a API do Acessórias permite · onde ficam os cadastros · quem vai administrar o sistema · prazo desejado · quem aprova o valor (o pai).

## Divergências
- ⚠️ **Qual é a Fase 1?** O relatório do Zé põe como foco "WhatsApp + CRM com triagem por IA"; o briefing da Ortech pede **primeiro infraestrutura, migração do servidor local e plano B testado**, e só depois portal/CRM e IA ("nenhuma IA no ar antes da infraestrutura sólida"). Decidir o que a Bevel propõe → [[Divergencias-a-Resolver]] #27.
- O relatório diz que a Bevel está **"sem nicho desde 22/10"**, mas o cofre diz que os nichos de 08/10 seguem valendo ([[Nicho]]) → ver [[Divergencias-a-Resolver]].
- Nome: o relatório usa "Ortech", e a tarefa no CRM usa "ORETECH" `[confirmar a grafia]`.

## Histórico
- 2026-10-25 — Lead cadastrado no CRM (Sistema, R$ 30.000).
- 2026-10-27 — Reunião de diagnóstico (Zé, Lucas, Du e VT; o Gui não estava) → [[2026-10-27-Ortech-Diagnostico]]
- 2026-10-28 — Zé fez o relatório pós-diagnóstico para o Gui. Regra do Zé: a proposta só sai depois que o projeto existir. No CRM: tarefa "CRIAÇÃO DO PROJETO ORETECH" (VT, Gui e Zé, até 04/11) e evento "Reunião operacional com Augusto Francisco Piano" (30–31/10 `[confirmar]`).

- 2026-10-29 — Zé subiu no Drive (pasta "Ortech - Gutão") o **Briefing de Requisitos** que o Augusto apresentou na reunião (documento da Ortech, v1.1 de 24/10). Lido e resumido → [[Ortech-Briefing-Requisitos]]. O Augusto também mandou os links do Acessórias, do Komunic e do SCI.

## Próximo passo
- [ ] Lucas: criar o grupo de WhatsApp com o Augusto e o time da Bevel
- [ ] Ortech envia: ~~documento com a visão do Augusto~~ ✅ (Briefing de Requisitos no Drive, 29/10), documentação da API do Acessórias, backup das conversas de atendimento, estrutura de pastas do Drive e valor exato do Comunique
- [ ] Du: documento estrutural (roadmap) + proposta focada na Fase 1 — **cobrir os 7 entregáveis e responder as 7 perguntas do briefing** ([[Ortech-Briefing-Requisitos]])
- [ ] Gui: ler a API do Acessórias e a estrutura do Drive e passar uma estimativa de horas da Fase 1 ao VT e ao Du
- [ ] Bevel: estimativa de custo de manutenção e de uso de IA (o Augusto quer levar ao pai)
- [ ] Próxima reunião com o cliente em 5 a 7 dias, no início de novembro `[data a confirmar]`
