# CRM da Bevel (feito pelo Gui)
#operacao #crm

- Montado pelo **Gui** (Guilherme) em 24/10/2026. Link: https://prospeccao-two.vercel.app/site/dashboard
- **Acesso (conferido em 2026-10-28):** pede login (e-mail + senha; tem 2FA opcional). Os dados vêm de uma API própria (`/api/leads`, `/api/sales`, `/api/contracts`, `/api/events`, `/api/sellers`), que responde 401 sem login. Para o [[Jarvis-Bevel]] ler o CRM, o Gui criou em 2026-10-28 um **usuário só leitura no banco** (Postgres na Neon); o acesso fica só no `.env` do Jarvis, nunca no cofre.
- Lista numerada em txt: `07-Operacao/Alteracoes-CRM-2026-10-24.txt`
- Abas citadas: Agenda · Atividades · Tarefas · Prospectar · Leads · (formulário de lead ligado ao WhatsApp).
- Substitui/complementa o [[ClickUp]] como CRM `[a confirmar]`.

## Ata da reunião de sócios (24/10, feita pelo Du) × esta lista
A ata oficial ([[2026-10-24-Socios]]) tem **11 pontos de CRM + 2 de formulários**. Cruzando com a lista do Lucas abaixo:
- **Já feitos pelo Gui:** histórico/"criada por" (ata 3), WhatsApp na agenda (ata 4 — confirmar que abre a conversa via wa.me), contrato no cartão (ata 7), aba Bevel (ata 9), aba Docs (ata 11), redirecionar ao WhatsApp (ata 16).
- **Parciais:** filtro por cliente (ata 10, falta cadastrar clientes) · resumo de atividades (ata 5, ideia; hoje só a métrica simples).
- **Pendentes:** atualização automática (ata 1) · prazo com hora (ata 6) · formulário pós-venda (ata 17).
- 🆕 **Novos na ata (não estavam no txt):** **campo de metas da empresa** (ata 2) · **coluna "Atrasado" automática** nas Tarefas (ata 6) · **botão lead → cliente** (ata 8). Adicionados ao txt como 21–23.
- Responsáveis: todos "a definir" na ata. Próximo passo da ata: virar tarefas no ClickUp (ver [[Divergencias-a-Resolver]] #25).

## Lista de alterações pedidas (anotações do Lucas, 24/10/2026)
Fotos originais: `_arquivo/2026-10-24-anotacoes-crm-IMG_4980/4981/4982.jpg`

> Conferido pelo Claude em 2026-10-25 (só leitura; 2ª revisão às 00h50). Placar: **15 feitas · 2 parciais · 2 pendentes ou não verificáveis**. O número entre parênteses é o do txt.

**Agenda e reuniões**
- [x] Contrato gerado direto na agenda (1) — botão "Gerar contrato" no evento
- [x] Na agenda, já deixar vinculado ao clicar no WhatsApp (5) — evento mostra o número do lead + botão "Chamar"
- [x] Agendamento de: reunião de diagnóstico · reunião de proposta · reunião de alinhamento (18) — campo "Tipo de reunião"
- [x] Ao agendar reunião, campo **não obrigatório** "Tema da reunião" (19)

**Atividades e tarefas**
- [ ] Não precisar dar F5 para a informação aparecer (2) — não dá para conferir só lendo; testar com dois sócios logados
- [x] Filtro de atividades de cada um + métrica de atividade (3) — filtro por responsável com nº de tarefas abertas e concluídas (métrica simples)
- [x] Mostrar quem criou a atividade (4) — "Criada por" em cada card
- [x] Prazo (6) — visão "Prazo" nas Tarefas. ⚠️ Todas as 6 caíram em "Depois", inclusive a de 26/10 → conferir os grupos com o Gui
- [x] Aba interna da Bevel para tarefas da empresa (7) — visão "Bevel" (vazia)
- [~] Filtrar tarefas por cliente (8) — filtro existe, mas só lista "Sem cliente" porque a aba Clientes está vazia
- [ ] **Coluna "Atrasado"** automática quando o prazo vence (21, ata 24/10)
- [ ] **Campo de metas da empresa** (22, ata 24/10) — quais metas e período a definir
- [ ] **Botão para transformar lead em cliente** (23, ata 24/10)
- [ ] **Hora no prazo da tarefa** (20, novo em 2026-10-25; também na ata, ponto 6) — hoje o campo Prazo só tem data. Não estava nas anotações de 24/10 nem no txt; avisar o Gui `[confirmar se já foi pedido]`

**Leads e prospecção**
- [x] Na aba Prospectar, botão de limpar busca (13) — ao filtrar a lista de leads aparecem o "×" no campo e "Limpar filtros (n)" (visto na 2ª revisão; na 1ª não testei com filtro ativo, então pode já existir antes)
- [~] Busca do lead no Prospectar mais precisa (15) — agora tem bairro, categorias e filtros por nota, nº de avaliações e canais (WhatsApp, site, Instagram…)
- [x] Lead que virar lead de verdade sai de Prospectar e vai para a aba Leads (14) — botão "Virar lead no CRM" na ficha + "Ocultar fechados"
- [x] Tirar o campo "vendedor responsável" (16) — saiu do cadastro de lead (continua no evento da agenda e nos filtros)
- [x] Botão extra de mensalidade na criação do lead (17) — opção "Tem mensalidade"

**Formulários e integrações**
- [x] Depois de preencher o formulário, ir direto para o WhatsApp (9) — opção "Depois de enviar" com número e mensagem pronta
- [x] Formulário de lead deve cair no **nosso número** (12) — campo vazio agora usa o "número padrão da Bevel", que no código é **55 41 9749-5784** (sem o 9 da frente) com a mensagem "Oi! Acabei de preencher o formulário da Bevel." ⚠️ Testar preenchendo o formulário uma vez: se o WhatsApp não abrir a conversa certa, pedir ao Gui para usar 5541997495784
- [ ] Formulário pós-venda para o contrato (10) — não encontrado
- [x] Aba "Docs" integrando o Google Drive ao CRM (11) — aba Docs com links do Drive por cliente/lead e prévia (não é integração automática). **Testada em 2026-10-25: funciona** (ver observações)

### Outras observações da conferência (2026-10-25)
- A Prospecção virou um módulo embutido ("Prospecta") com base própria de **76 empresas** (53 com WhatsApp) e funil próprio. Buscas feitas: nutricionistas/odonto/estética em Curitiba (24/10) e transportadoras em Rio do Sul-SC (23/10) — **fora dos nichos** construção/imobiliário/industrial.
- O painel diz "Motor ligado — roda 100% no seu computador". **2026-10-25:** o Gui disse que já hospedou (não precisa de Docker aberto). Conferido pelo Claude: a Prospecção carrega e responde 100% pelo próprio site (`prospeccao-two.vercel.app/painel-maps/api/...`, status "motor ligado, fila 0"), sem chamar nada no computador de ninguém. O texto "roda no seu computador" ficou desatualizado (pedir ao Gui para trocar). **Teste de busca (2026-10-25, 00h33, com OK do Lucas):** busca rápida "construtoras" em Curitiba-PR rodou inteira pelo site e concluiu em ~3 min: **20 construtoras novas** (15 com WhatsApp, 11 com e-mail, todas com site), entre elas MAORI, Voigt, ALTMA, Golpar, Monreal, Gadens, Víncere, Avantus. Base da Prospecção foi de 76 para 96. Funcionou de madrugada; não dá para garantir daqui que o computador do Gui estava desligado `[confirmar com o Gui]`. Essas 20 ainda **não** viraram lead no CRM.
- **2ª revisão (2026-10-25, 00h50):** sem outras mudanças visíveis. Dashboard, Leads (mesmos 4), Agenda, Recuperação, Contratos, Vendas, Clientes, Mensalidades, Métricas (comparecimento ainda 200%), Docs e Tarefas iguais. Ainda sem "Indicação", sem "Automação de processos", sem formulário pós-venda (10); texto "Roda 100% no seu computador" continua. Prospecção: 96 empresas (68 com WhatsApp), 17 marcadas como Construtora. Registro curioso: o lead "Perfeccionare Estética" (que já tinha sido chamado no WhatsApp em 24/10) voltou de "Contatado" para **"Novo" às 00h41 de 25/10** — não foi o Claude; ver quem mexeu.
- **3ª revisão (2026-10-25, 12h20) — de ontem para hoje:** **nenhuma melhoria nova do Gui no sistema.** O código publicado é o mesmo da madrugada (mesmos arquivos; cache do site com ~12h, ou seja, sem nova publicação desde ~00h). Pendentes continuam: 2, 8, 10, 15, 20 (hora no prazo), "Indicação", "Automação de processos", grupos do Prazo, texto "roda no seu computador". **Mudaram só os dados (alguém da equipe cadastrou):**
  - Lead **XÁ** (App, +55 21 99199-1814, R$ 10.000) em "Follow-up pós-reunião" — **aparece duplicado** (2 cards iguais, coluna soma R$ 20.000) → apagar um. Valor R$ 10.000 diverge da nota [[XA-Chico]] (valor "a definir") `[confirmar]`.
  - Tarefa nova **"followup no xá"** (Lucas, 30/10, alta, em "Aguardando cliente"): continuar o follow-up do XÁ — pelo processo seria do Du, mas fica com o Lucas.
  - Tarefa nova **"followup no gabe"** (VT, 02/11, urgente): falar com o Gabe sobre o pagamento total do projeto → [[Morais-Barbershop]].
  - Prospecção: 96 empresas, todas em "Novo" (o Perfeccionare também voltou para Novo).
- **4ª revisão (2026-10-28, pelo banco, pedido do Lucas: "o que o Zé mudou"):** o banco não guarda quem editou cada coisa, só quem criou. Horários como aparecem no banco.
  - **Criado pelo Zé:** evento "REUNIÃO MENTORIA" (alinhamento, 27/10 — a call da [[2026-10-27-Accelera-360]]) · evento **"Reunião operacional com Augusto Francisco Piano"** (criado 28/10 ~23h52, marcado para 30–31/10 `[confirmar data e hora]`).
  - **Editado na mesma janela (28/10 ~23h49–23h52, provável Zé `[a confirmar]`):** Zé entrou como responsável junto com o VT em "terminar projeto escolinha maua" (agora **concluída**) e "estruturar projeto digitron" (prazo passou de 27/10 para **10/11**, urgente); tarefa nova do VT **"CRIAÇÃO DO PROJETO ORETECH"** (VT, Gui e Zé, prazo 04/11, alta, em execução).
  - **Sumiram as tarefas** "proposta escolinha" (Zé, 27/10) e "proposta Digitron" (Zé, 29/10) — apagadas ou concluídas e removidas `[confirmar com o Zé]`.
  - **Leads mexidos (29/10 ~01h31–01h33):** Júnior/Interativos R$ 3.500 (era 2.500), nota "esperando o Júnior voltar de férias" · Escolinha R$ 4.000 (era 3.500) · Digitron em "Promessa" (era Agendado), nota "temos que apresentar os docs até o final desse mês" · **lead novo Augusto Francisco Piano** (criado 25/10; Sistema, **R$ 30.000**, "Novo"): automatizar atendimento, montar CRM e integrar o sistema. Reunião de diagnóstico com ele 28/10, criada pelo Lucas. Não tem nota no cofre `[confirmar se Oretech é a empresa dele]`.
  - Outros: reunião da Escolinha remarcada para **29/10** (criada pelo Lucas em 27/10) · formulário novo "Formulário primeiro contato Cliente" (canal Site, 26/10) · doc "bevel" na aba Docs (Lucas, 25/10) · **XÁ não está mais duplicado** (só 1 lead).
  - Continuam vazios: vendas, contratos, mensalidades.
- **Ideia de integração com o Jarvis (2026-10-29, conversa com o Lucas):** (a) o Jarvis disparar buscas na Prospecção por voz e trazer o resultado. Hoje ele não consegue, porque só lê o banco do CRM e a base da Prospecção não aparece para ele; o Lucas acompanharia pelo próprio CRM. (b) Ler o repositório do código para contar o que o Gui mudou. (c) O Claude propor mudanças no código, com link de teste na Vercel, que só vão para o ar com a aprovação do Gui. Tudo depende do Gui → [[Pendencias]] 1q.
- **Teste da aba Docs (2026-10-25, ~12h40, pedido do Lucas):** ✅ funciona. Testado com um link de teste (planilha pública de exemplo do Google), apagado no final; a aba voltou vazia.
  - ✅ Barra link que não é do Google ("Esse link não é de um arquivo ou pasta do Google Drive, Docs, Planilhas ou Apresentações") e reconhece o tipo ("Reconhecido: Planilha").
  - ✅ Salva, mostra "cadastrado por" e data, e continua lá depois de recarregar a página.
  - ✅ Prévia do arquivo aparece dentro do CRM (só para arquivos compartilhados com "qualquer pessoa com o link" ou com a conta Google logada no navegador; senão usar "Abrir no Google").
  - ✅ Busca acha por nome, nota e nome do lead; mostra "Nada encontrado" quando não existe.
  - ✅ Editar (nome, lead) funciona; apagar pede confirmação e avisa que o arquivo no Google continua lá.
  - ⚠️ O link vinculado a um lead **não aparece na ficha do lead** — só na aba Docs (sugestão ao Gui: mostrar os docs na ficha).
  - ⚠️ Filtro "Cliente" só tem "Sem cliente" porque a aba Clientes está vazia (mesmo caso do item 8).
  - ⚠️ No seletor de lead, **"xá" aparece duas vezes** (dois leads com IDs diferentes) — confirma a duplicação do XÁ.
  - Painel de prévia é estreito: o nome do arquivo fica cortado ("TESTE Cl…").
- **2026-10-25:** Lucas mandou ao Gui a lista do que falta (itens 2, 8, 10, 12, 13, 15 + Indicação, Automação de processos, grupos do Prazo). Conferência automática de hora em hora ligada e **desligada em 2026-10-25 12h20** a pedido do Lucas: revisar só quando ele pedir.
- Formulário ganhou "Canal de origem" (Site, Call, Meta Ads, WhatsApp, Prospecção; padrão Bio). **Ainda sem "Indicação"** aqui e nas Vendas.
- Continuam iguais: tipos de serviço sem "Automação de processos"; Gabe e Júnior fora de Clientes; Júnior em "Promessa"; vendas, clientes, mensalidades e contratos vazios.

## Retrato do CRM (lido pelo Claude em 24/10/2026, só leitura)
> CRM criado em 24/10/2026 e **ainda em montagem**: os cadastros não estão completos e as 19 alterações ainda vão ser feitas. Os pontos abaixo servem como checklist para depois, não como problema.
**Abas:** Dashboard ("Comando central": Hall da Fama, próximos eventos, conversão e receita por tipo de serviço) · Leads (tabela/kanban) · Prospecção (busca no Google Maps por nicho e cidade) · Agenda (por vendedor) · Recuperação (remarcação, follow-up, inadimplentes) · Contratos (gerados com dados do CRM) · Vendas (bruto/líquido, forma, canal) · Clientes · Mensalidades · Tarefas (kanban) · Métricas de Leads (funil) · Formulários.
**Etapas do kanban de leads:** Novo · Agendado · Remarcação · Follow-up pós-reunião · Promessa · Contrato enviado · Contrato assinado · Venda realizada · Ocioso · Perdido.
**Tipos de serviço:** Landing page · Institucional · Loja · App · Agente de IA · Sistema · Tráfego pago.

**Dados lá dentro:** 4 leads — Digitron R$ 7.500 e Escolinha Furacão Maúa R$ 3.500 (Agendado); Construtora Interativos/Júnior R$ 2.500 e EQUIVET R$ 3.500 (Promessa). Reunião Escolinha 27/10 19h30. Formulário "Formulário Clientes" ativo (2 novos leads). Vendas, clientes, mensalidades e contratos: vazios.
**Tarefas:** proposta escolinha (Zé, 27/10) · proposta Digitron (Zé, 29/10, aguardando material do VT) · reunião com o pai do Gabe (Lucas, 06/11) · terminar projeto escolinha (VT, 26/10) · estruturar projeto Digitron, 2 projetos + preço (VT, 27/10) · processo de acompanhamento de prazo (Zé, 30/10).

### Análise do Claude
- ✅ Cobre o processo de vendas quase todo: funil, recuperação (follow-ups 6A/6B), contrato gerado, vendas com taxas, mensalidades, métricas.
- ⚠️ **Gabe e Júnior não estão como clientes**; vendas e mensalidades vazias → as parcelas do Gabe (20/10, 20/11, 20/12) e a mensalidade não aparecem em "Inadimplentes" nem no faturamento.
- ⚠️ **Métrica errada:** comparecimento 200% ("2 de 1 agendadas") — reuniões feitas antes do CRM sem agendamento.
- ⚠️ **Canal de venda sem "Indicação"** (tem Kiwify, TikTok, YouTube…), mas 100% dos clientes vieram por indicação.
- ⚠️ Todos os leads estão como "Agente de IA"; falta tipo "Automação de processos" (EQUIVET, Júnior).
- ⚠️ Júnior está em "Promessa", mas é cliente fechado em teste.
- ⚠️ Tarefas agora existem no CRM **e** no ClickUp → decidir um lugar só. Du não tem tarefas no CRM.
- Valores dos leads no CRM diferem das notas (ex.: EQUIVET R$ 3.500 × proposta R$ 3.499 + R$ 419,88/mês) → `[confirmar]` qual vale.
