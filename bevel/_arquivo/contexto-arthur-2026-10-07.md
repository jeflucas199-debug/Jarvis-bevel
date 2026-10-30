# Bevel Systems: contexto extraído do segundo cérebro do Arthur

> Gerado em 07/10/2026 a partir do cofre Obsidian "Segundo Cérebro" do Arthur, da pasta de trabalho `BEVEL/` (atas, contratos, propostas, planilhas, pesquisas, posts) e de uma leitura do ClickUp da empresa feita no mesmo dia.
> Marcações: `[inferência]` = conclusão minha, não está escrita na fonte. `[incerto]` = a fonte é ambígua ou contraditória.
> Regra de leitura: **a posição atual vale mais que a histórica.** Quando algo foi superado, aparece riscado ou marcado como "superado".

---

## 0. Resumo da posição atual (outubro de 2026)

- **Nicho atual:** construção civil + imobiliário, **foco exclusivo até o fim de 2026** (decidido em 24/09/2026). Exceção aceita: app hospitalar da XÁ (05/10/2026).
- **Clientes fechados:** 2.
  - **Gabe / Morais Barbershop**: chatbot de WhatsApp. Contrato assinado eletronicamente. Bot **colocado em produção em 06/10/2026** (ClickUp).
  - **Júnior Freitas / Construtora Interativos**: controle de gastos de obra por áudio no WhatsApp. Fechado em 10/09/2026, **sem contrato assinado e sem cobrança até a entrega**. Protótipo testado internamente, entrega em andamento. Reunião marcada para **07/10/2026, 20h**.
- **Em negociação:** XÁ (app para criança hospitalizada, proposta em PDF enviada em 05/10, valor "a definir"), Muzão (clínica veterinária, Plano 2 de R$ 2.499 em análise pelo dono), Fola (plano de chatbot para imobiliária, reunião em **07/10/2026, 21h**), Digitron (proposta de agosto, parada), Puppy Stop (lead de baixa prioridade).
- **Estrutura fiscal:** **sem CNPJ**. MEI **descartado** porque automação/chatbot/consultoria em TI é atividade proibida no MEI. Fatura pelo **CPF do Vitor como autônomo pessoa física** (sem nota fiscal, só recibo/RPA, imposto via carnê-leão).
- **Modelo de oferta atual:** projeto pontual (preço calculado por horas e score de complexidade) + mensalidade de suporte e manutenção, com fidelidade de 12 meses. Valor exato da mensalidade **não é revelado na venda** (decisão de 24/09).
- **Equipe:** 4 sócios com 25% cada (Arthur, Vitor, Lucas, Eduardo "Du") + **Guilherme**, desenvolvedor que passou a atuar com a equipe (confirmado em 05/10). Todos ainda têm emprego CLT; meta declarada é sair do CLT até dezembro de 2026.
- **Gestão interna:** ClickUp (desde 14/09).
- **Metas no ClickUp:** fechar 3 clientes por mês em outubro, novembro e dezembro de 2026.

---

## 1. Visão geral e história

- **O que é:** empresa de automação com IA, principalmente chatbots e agentes de WhatsApp construídos em **n8n**, para pequenos e médios negócios. Pitch institucional: "Automação inteligente para ganhar tempo e lucrar mais". Slogan de partida usado na página do LinkedIn: "Geramos valor com tecnologia".
- **Início:** os documentos mais antigos são de **julho de 2026**: rascunho de contrato (`Contrato.docx`, 11/07/2026) e metodologia de precificação (`PRECIFICAÇÃO.docx`, 17/07/2026). O histórico de conversas do Arthur com o Claude sobre a empresa começa em **23/07/2026**. Data formal de fundação: Nada encontrado.
- **Sócios fundadores:** o rascunho de contrato de julho/agosto lista **3 contratados**: Arthur Brolo de Almeida, Lucas Eduardo Moreschi Alves da Costa e Vitor Zani Melere Teixeira Trezub, "todos respondendo pelo nome fantasia BEVEL SYSTEM". Divisão era 33,3% cada. **Eduardo (Du) entrou depois como 4º sócio** e a divisão passou a 25% cada. Data exata da entrada do Du: Nada encontrado (já estava como 4º sócio em 05/09/2026). Como os sócios se conheceram: Nada encontrado.
- **Evolução da ideia (cronológica):**
  1. Jul/2026: automação genérica com IA "para qualquer negócio"; 4 projetos-modelo (chatbot de atendimento, crítica automática de sites, qualificação de leads do Instagram, radar de vagas do LinkedIn).
  2. Ago/2026: proposta para a Digitron (fabricante de balanças, agente de expedição via Telegram). Deck institucional em PDF (27/08/2026).
  3. 02/09/2026: primeiro cliente, **Gabe (barbearia)**. Por um tempo a empresa foi descrita como "começou no nicho de barbearias".
  4. 10/09/2026: segundo cliente, **Júnior Freitas (construção civil)**, primeiro caso fora de atendimento/agendamento.
  5. 14/09/2026: reunião de sócios cria linha de etiquetas NFC, adota ClickUp, define cadência de conteúdo.
  6. 21/09/2026: NFC revertida; mentoria adiada para 2027; ideia de SaaS de nicho.
  7. 24/09/2026: **nicho fechado em construção civil + imobiliário** e nova política de preço.
  8. 29/09 a 05/10/2026: entra o projeto XÁ (app hospitalar) como exceção, e o dev Guilherme passa a constar na equipe.
  9. 06/10/2026: bot do Gabe em produção.
- **Visão de longo prazo citada em reunião (14/09):** vender sistemas na faixa de **R$ 15.000 a R$ 30.000**.

## 2. Sócios e governança

### Papéis na prática (versão mais recente registrada, 14/09/2026, com ajustes posteriores)

| Pessoa | Papel registrado no cofre (14/09) | Como aparece em material posterior |
|---|---|---|
| **Arthur** (apelidos "Zé", "Brolinho") | Jurídico, financeiro, prospecção, criativos de conteúdo e postagens (LinkedIn, Instagram), estruturação do sistema interno de memória/gestão | Na proposta da XÁ (05/10): "Processos e marketing". Na ata da XÁ (29/09): "marketing, porta-voz secundário". No ClickUp: dono das tarefas diárias "fazer copy e criação das imagens" |
| **Vitor** ("VT", "Vitinho") | Operacional, automações em n8n, dev principal | Dev do Gabe, do Júnior e da XÁ. Responsável por abrir conta bancária PJ e pesquisar plataforma de parcelamento. É quem fatura pelo próprio CPF |
| **Lucas** ("LC", no ClickUp "Lucas Costa") | Follow up e relacionamento pós-venda com clientes fechados (saiu de marketing em 14/09) | Na prática é o **comercial**: conduz reuniões com XÁ, Muzão, Júnior e Fola; envia propostas e contratos; cobra pagamentos |
| **Eduardo** ("Du", no ClickUp "Eduardo Fonseca") | Redes e criação de conteúdo (registrado como "ainda não totalmente confirmado"), edição de vídeo para Instagram e TikTok | Montou a estrutura do ClickUp e gravou a apresentação dele, criou novas logos. Na proposta da XÁ: "Marketing e processos". Tem tarefa pendente de criar a planilha de fluxo de caixa |
| **Guilherme** (provavelmente o "Guizão" citado em 21/09 `[inferência]`) | Não é sócio. Dev com portfólio de apps mobile e sites animados | Dev principal do app da XÁ junto com o Vitor. Autorizou usar 4 apps dele como portfólio "da equipe" |

- **Sobreposições registradas:** Arthur e Du ambos em conteúdo/redes, sem divisão clara. Gestão, estratégia e administrativo **sem dono definido** (ponto aberto desde 14/09).
- **Regras de decisão:**
  - Decisões estratégicas tomadas em conjunto em reunião de sócios (atas de 14/09, 21/09 e 24/09).
  - Desde **24/09/2026**: reuniões **por departamento** em vez de com os 4 sócios; reunião geral só para decisão importante; pedido de informação entre áreas passa a ir **pelo CRM (ClickUp)**, checando lá antes de perguntar a outro sócio; responsável de cada tarefa sempre explícito no ClickUp.
- **Equity:** 25% cada, sempre divisão igual. Vesting, retirada de lucros, pró-labore, saída de sócio: **Nada encontrado.** Não existe minuta de contrato social nem acordo de sócios no material.
- **Tipo societário pretendido:** **LTDA** como objetivo de médio prazo. Sem data.
- **Disponibilidade:** os sócios têm empregos CLT. Meta: "sair do emprego atual até dezembro" de 2026 com receita da empresa (ata 14/09). A mentoria externa foi adiada justamente por falta de tempo dos 4 juntos.

## 3. Financeiro

### Estrutura fiscal e meios de recebimento (cronológico)
1. Plano inicial: faturar via **MEI de um sócio** (Vitor). Alternativa de usar MEI de um amigo de fora foi **rejeitada** (geraria custo recorrente, fatia em cada venda).
2. **05/09/2026: MEI descartado.** Descoberto que automação, chatbot e consultoria em TI são **bloqueadas para MEI em qualquer CNAE**. Também registrado: MEI não comporta sociedade e concentra risco fiscal numa pessoa só. Teto do MEI R$ 81 mil/ano.
3. **Situação atual:** contratos em nome de **Vitor, autônomo pessoa física**, "atuando comercialmente sob a marca BEVEL SYSTEMS". Recebimento por **Pix na chave CPF do Vitor (Caixa Econômica Federal)**. Imposto via carnê-leão (até 27,5%), sem nota fiscal, só recibo/RPA.
4. **CNPJ próprio (LTDA)**: objetivo, sem data. Visto como "tende a compensar mais rápido com o crescimento do volume de vendas".
5. **21/09/2026:** Vitor vai abrir **conta PJ no C6 ou Nubank** para guardar o caixa da empresa (hoje ele só tem Bradesco e Caixa). No ClickUp: "Criar conta no banco - armazenar caixa" (backlog) e "fazer conta" (à fazer, vencimento por volta de 07/10).
6. **Parcelamento:** necessidade de plataforma de pagamento parcelado no cartão; Vitor pesquisa a de menor taxa (21/09). Status: Nada encontrado depois disso.
- **Pendência registrada:** o primeiro pagamento do Gabe caiu na **conta pessoal do Arthur**, antes da estrutura estar definida. Precisa regularizar (repasse ou documentação). Se foi regularizado: Nada encontrado.
- ClickUp tem a tarefa "[Morais Barbershop] - Nota fiscal" em backlog (sem CNPJ não há como emitir).

### Receitas (contratadas)
| Cliente | Valor | Condições | Status do recebimento |
|---|---|---|---|
| Gabe / Morais Barbershop | Contrato assinado: **R$ 1.190,00** "plano Chatbot Padrão". Parcelas somam **R$ 1.430,00** (ver contradição na seção 13) | 1ª parcela em 2 partes de R$ 178,75 (02/09 e 25/09/2026); 2ª, 3ª e 4ª de R$ 357,50 em 20/10, 20/11 e 20/12/2026. Outubro e novembro de manutenção já inclusos. Mensalidade de **10% do valor do contrato** a partir de **20/12/2026**, todo dia 20 | Primeira parte confirmada (ClickUp, ~24/09); segunda parte paga (tarefa "aguardando segundo pagamento do gabe - 25/09" concluída ~28/09) |
| Júnior Freitas | Nada definido | Cobrança só depois da entrega do MVP, preço "a combinar por ligação" | Nada recebido até onde as fontes mostram |

- **MRR atual:** nenhum. A primeira mensalidade recorrente prevista é a do Gabe, a partir de 20/12/2026 (≈ R$ 119/mês se for 10% de R$ 1.190) `[inferência]`.
- Receita total contratada até hoje: R$ 1.430 (Gabe).

### Custos (planilha `controle financeiro BEVEL SYSTEM.xlsx`, aba "Planilha1", referência agosto)
| Item | Valor | Tipo |
|---|---|---|
| Claude (assinatura do Arthur, "claude ze") | R$ 110,00/mês | recorrente |
| Claude (assinatura do Vitor, "claude vt") | R$ 110,00/mês | recorrente |
| "playbook" (provavelmente comunidade/mentoria do Victor Baggio, Playbook Lab `[inferência]`) | R$ 29,90/mês | recorrente |
| Chip pré-pago (3 números) | R$ 90,00 | pontual |
| Tokens Claude | R$ 26,00 | pontual |
| Chip pré-pago do Vitor (1 número) | R$ 35,00 | pontual |
| **Total recorrente** | **R$ 249,90/mês** | |

- Outros custos citados sem valor: créditos da API do Gemini (tarefa "[Bevel] - Adicionar dinheiro do Gemini" concluída), chip comprado para o Gabe (ClickUp, ~30/09), hospedagem/n8n, Evolution API, contas de loja de app (Apple US$ 99/ano, Google Play R$ 130/ano, citado na reunião da XÁ). Hospedagem da landing page na Vercel.
- Orçamento aprovado (24/09): **R$ 300 a 400/mês** para impulsionar conteúdo no Instagram para o nicho.
- Mentoria externa avaliada em ~R$ 10.000/ano, adiada para 2027.

### Planilhas e como são alimentadas
- `controle financeiro BEVEL SYSTEM.xlsx` é um **modelo da Contabilizei** com abas mensais (JAN a DEZ) e "VISÃO GERAL". **As abas mensais estão vazias**, sem lançamentos. Só a aba de custos acima tem dado. Não há métrica de MRR calculada.
- O cofre cita um arquivo `Controle_Financeiro_Bevel_Systems.xlsx` que "só cobre rateio de custos entre sócios", com pendência de criar aba "Recebimentos" (cliente, projeto, parcelas, datas, status). `[incerto]` se é o mesmo arquivo.
- ClickUp: "[Bevel] - Criar planilha de fluxo de caixa e gastos", responsável **Eduardo**, urgente, ainda "à fazer" (vencia ~20/09).
- Google Sheets aparece como armazenamento nas automações de clientes, não como controle financeiro da Bevel.

### Preços praticados e propostos (cronológico)
1. **Tabela de referência de mercado** usada no início: automação básica R$ 700 a 1.200; intermediária R$ 1.500 a 3.000; avançada R$ 3.500 a 8.000+. Lacuna: nada cobre integração com sistema externo (ex.: Cash Barber, One Beleza); faltava um adicional "integração com sistema externo: +R$ X".
2. **Metodologia de precificação por complexidade** (`PRECIFICAÇÃO.docx`, jul/2026). Score = soma de 6 critérios:
   - Quantidade de APIs: 1=2, 2=4, 3=6, 4=8, 5+=10
   - Quantidade de credenciais: 1=1, 2=2, 3=3, 4=4, 5+=5
   - Agentes de IA, quantidade: 1=2, 2=4, 3=6, 4=8, 5+=10; complexidade do agente: FAQ=2, Atendimento=4, Agendamento=5, Vendas=6, Financeiro=7, Multiagente=10
   - Complexidade técnica (IFs, switches, JS, tratamento de erro, loops): Muito baixa=2, Baixa=4, Média=6, Alta=8, Muito alta=10
   - Quantidade de workflows: 1=2, 2=4, 3=6, 4=8, 5+=10
   - Regras de negócio: até 5=2, 6-10=4, 11-20=6, 21-40=8, 40+=10

   | Score | Classe | Horas | Valor |
   |---|---|---|---|
   | 0-15 | Pequeno | 20-40 h | R$ 3.000-6.000 |
   | 16-30 | Médio | 40-80 h | R$ 6.000-10.000 |
   | 31-45 | Grande | 80-160 h | R$ 10.000-18.000 |
   | 46-60 | Enterprise | 160-300 h | Sob orçamento |
3. **Planos de chatbot para barbearia (Gabe):** Plano 1 chatbot padrão R$ 1.000; Plano 2 (+ dados em planilha: nome, CPF, telefone, data/hora) R$ 1.500; Plano 3 (+ Google Calendar + notificação no celular) R$ 2.000. Manutenção 10% do valor. Pagamento padrão: 35% de entrada + restante na entrega, Pix à vista ou parcelado no crédito.
4. **Planos para clínica veterinária (Muzão, 17/09):** Plano 1 R$ 1.189 (respostas básicas, serviços e preços); Plano 2 R$ 2.499 (porte do animal por raça/idade, agendamento, atualização de cadastro); Plano 3 R$ 3.359 (1+2 + site). Mensalidade ≈ 10% (R$ 100 a 300). Pagamento parcelado no cartão (Plano 2 em 6 a 7x) ou 35% entrada + 65% na entrega.
5. **App XÁ (29/09):** R$ 6.000 citado em reunião, incluindo manutenção e suporte, até 6x sem juros ou pagamento por fases. **Descartado por decisão do Arthur em 05/10**: a proposta escrita diz "a definir".
6. **Nova política de preço (24/09/2026), vigente:**
   - Preço do projeto calculado com base em **horas**, para justificar o orçamento.
   - Mensalidade recorrente com **metodologia padronizada por escopo**, substituindo o "10% do valor" caso a caso.
   - "Adiar divulgar valor exato da mensalidade até depois do projeto entregue e implementado." A cláusula de taxa mensal entra no contrato **sem valor exato**; se o cliente perguntar, dar só **faixa por complexidade**.
   - Racional: "Posicionar o sistema como serviço próprio da empresa, não produto transferível, pra justificar recorrência."
7. **Recomendação da pesquisa de nicho construção (24/09), não decidida:** setup R$ 1.500 a 3.000 + mensalidade R$ 150 a 350, ancorado nos concorrentes (ObraFácil R$ 79-349/mês, ConstrAI R$ 199-399/mês).

### Meta de faturamento e projeções
- Meta citada nos relatórios de nicho: **R$ 50-60 mil/mês recorrente em 6 meses**. Os três relatórios (advocacia, construção, balanças) concluíram que é **"apertada a improvável"** em qualquer nicho isolado. Construção: a R$ 300/mês precisa de 167-200 clientes; a R$ 600, 84-100; a R$ 1.000, 50-60, o que exige fechar e implantar 8-10 clientes/mês desde o primeiro mês. Histórico: 2 clientes em semanas, via indicação.
- Meta operacional no ClickUp: "Fechar o primeiro cliente" (até 02/09, feita), "Fechar 2 clientes" (até 30/09, feita), **"Fechar 3 clientes" com prazos 31/10, 30/11 e 31/12/2026**.
- Meta de curto prazo da ata de 14/09 (ligada ao NFC, superada): 4 vendas de fim de semana de R$ 1.500/mês para cobrir despesa de escritório.

## 4. Clientes e pipeline

### Clientes fechados

**Gabe (Gabriel Morais) / Morais Barbershop**, barbearia em Curitiba
- Primeiro cliente, por indicação pessoal. 11 anos de barbearia, 5 de marca.
- Escopo: chatbot de WhatsApp para atendimento e agendamento 24h. O cofre registra "Plano 3 fechado", mas o **contrato assinado diz "plano Chatbot Padrão"**, R$ 1.190 (ver seção 13).
- Contrato: assinado eletronicamente (valida.ae), vigência inicial 02/09 a 09/10/2026 (1 mês de desenvolvimento + 1 semana de implantação e testes). Fidelidade da manutenção: 12 meses a partir de 20/12/2026.
- Levantamento de requisitos em 10/09: catálogo com 10 serviços avulsos (ex.: corte R$ 65, 35 min; barba express R$ 70), 3 assinaturas ilimitadas (R$ 100 / R$ 159,90 / R$ 199,90), produtos da linha Fox, 10% de desconto para assinante. Platinado, luzes e progressiva sem preço fixo. Requisito: o bot pergunta se o cliente tem preferência de barbeiro.
- **Cash Barber:** ClickUp tem a tarefa "VERIFICAR POSSIBILIDADE DE CONSULTA DE HORÁRIO O CASHBARBER", **concluída** (~06/10). O resultado (se dá ou não para consultar horário via Cash Barber) não está registrado. No cofre, o Cash Barber (empresa Podium) aparece ligado ao lead **Jean (Imperium Barbershop)**, não ao Gabe `[incerto]`.
- Andamento: Evolution API escolhida em 21/09 (login por QR code, reaproveita o número existente) no lugar da API oficial da Meta. Prompt ajustado para personalizar/humanizar. Testes internos com os 4 sócios. **"Deploy em produção" e "Cliente avisado que está no ar" concluídos em ~06/10/2026.** Backlog: go-live formal, acompanhamento assistido, check-in mensal, cobrança recorrente, nota fiscal.

**Júnior Freitas / Construtora Interativos** ("Junhão"), construção civil
- Contato de confiança pessoal dos sócios. Fechado em **10/09/2026**.
- Dor (relatada por áudio): paga material na obra e esquece de lançar; perde controle de quanto gastou por obra. Exemplo real usado em post: "Chegou um caminhão de areia. Paguei 1.100 reais."
- Proposta enviada em 09/09 (deck sem preço), depois reformatada em Word/PDF (12/09) e em site de slides (18/09, este nunca enviado).
- Condição: **entrega do MVP como teste antes de cobrar, sem contrato assinado**. Risco aceito conscientemente por ser pessoa de confiança.
- Andamento: em 21/09 já funcionava com controle de despesa, histórico de trabalho e relatório mensal por e-mail que cruza despesa com progresso da obra; bugs pontuais na API Gemini; Júnior testa por um número de teste. ClickUp: montagem do fluxo (concluída ~19/09), finalização do protótipo (concluída), testes internos (concluídos ~29/09), **"ENTREGA DO PROTÓTIPO" em andamento**. Reunião "[REUNIÃO] - Junior | Interativos" em **07/10/2026, 20h**, com o Lucas.
- Ativo comercial: o Júnior **prometeu apresentar a Bevel a mais de 10 donos de outras construtoras** (citado no relatório de nicho como "dez indicações quentes"). É a base da escolha do nicho.

### Pipeline (do mais recente para o mais antigo)

| Lead | Segmento | Origem | Status mais recente | Próximo passo |
|---|---|---|---|---|
| **XÁ** (no ClickUp provavelmente a lista "CHICO \| APLICATIVO" `[inferência]`) | App para criança hospitalizada | Indicação de Rodolfo | Reunião 29/09. Proposta técnica/comercial em PDF de 9 páginas gerada em 05/10 (tarefa "PDF detalhado das fases" concluída). Valor "a definir". Aceito como exceção ao nicho | Contrato de confidencialidade; protótipo em 20-30 dias pelo Guilherme; reuniões quinzenais após o protótipo |
| **Fola** | Imobiliário (chatbot SDR) | `[incerto]` | Lead levantado em 14/09. ClickUp: "[REUNIÃO] - Plano imobiliária com o Fola" em **07/10/2026, 21h** (Lucas) | Reunião |
| **Puppy Stop** | Pet `[inferência]` pelo nome | Nada encontrado | ClickUp "[LEAD] - Puppy Stop", backlog, prioridade baixa | Nada encontrado |
| **Muzão (Gabriel)** | Clínica veterinária / banho e tosa | Já estava no pipeline, tinha esfriado | Reunião 17/09: prefere Plano 2 (R$ 2.499). Decisor financeiro é o **padrasto** (dono), não a mãe | Gabriel conversar com o padrasto, enviar CNPJ, definir pagamento; Lucas envia contrato. Desfecho: Nada encontrado |
| **Empresa de engenharia** (sem nome) | Engenharia | Contato do Vitor | Citada em 24/09: automação de orçamento feito hoje em várias planilhas | Vitor passar o contato |
| **"Mu"** (nome possivelmente errado na transcrição) | Nada encontrado | Nada encontrado | Automação testada no Telegram; pais (decisores) avaliando preço; projeto suspenso | Provável pedido de parcelamento |
| **Digitron** | Fabricante de balanças, Curitiba | Amizade pessoal dos sócios | Proposta de projeto em ago/2026 (agente de IA de expedição via Telegram, sem preço). Desenvolvimento chegou a começar no n8n. **Nunca fechou** (o cofre corrigiu um registro errado em 13/09). A pasta local se chama "Digitron - off". ClickUp tem "Proposta Comercial - DIGITRON BALANÇAS" em backlog | `[inferência]` parado ou perdido. Pesquisa sugere usar como piloto e testar upsell de gestão de calibração |
| **Jacon** | DJs/eventos (etiquetas NFC) | Nada encontrado | Recebeu proposta de R$ 50/etiqueta; depois o NFC foi pausado | Lucas comunicar a decisão sugerindo que ele mesmo configure ou procure terceiro |
| **Whindersson** | Site | Negociado pelo Arthur | Citado em 14/09: projeto de site, lançamento futuro | Nada encontrado |
| **Bia** | Site de joias | Ligado ao Guizão | Citado como "projeto pessoal" em 21/09; ClickUp "follow up - site joias" à fazer | `[incerto]` se é da Bevel |
| **Jean (Imperium Barbershop)** | Barbearia | Nada encontrado | Primeiro contato; usa app Cash Barber | Reaproveitar roteiro de levantamento do Gabe |
| **Bolino** | Academia (São José dos Pinhais) | Indicação | Sem reunião marcada | — |
| **Instituto Camara Lopes** | Consultoria | LinkedIn | "Em negociação" (registro de 05/09) | Nada encontrado |
| Leads da planilha de vagas do LinkedIn | SAÚDESPA, Nutrix, RRA, Hospital Pequeno Príncipe, ETEL, CB20, HA Medicina Avançada, Viviane Efeiche Advocacia, Jurídico Vagas, Hama Pilates, REMAX MAIS | Automação de vagas (empresas contratando SDR/BDR ou secretária) | Qualificados, sem contato registrado | — |

### Objeções e aprendizados de venda
- Clínica veterinária: decisor real era outra pessoa (padrasto); o argumento usado foi que um atendente dedicado custaria mais de R$ 20.000/ano.
- Mu: preço e parcelamento.
- Jacon: não entendia a simplicidade técnica da etiqueta NFC.
- Gabe e Muzão: parcelamento é pedido recorrente, daí a busca por plataforma de cartão.
- Perdas formais com motivo: Nada encontrado.

## 5. Produtos, serviços e cases

### Os 4 cases da apresentação institucional (`apresentação - bevelsystems.pdf`, 27/08/2026)
Descritos como "automações que projetamos e colocamos em funcionamento".
1. **Chatbot de atendimento**: recebe o contato, faz cadastro, agenda, encaminha para a equipe. Resultado anunciado: "Vende enquanto você dorme. Menos horas em tarefas manuais. Menos clientes perdidos."
2. **Crítica automática de sites**: recebe o site, analisa pontos-chave, gera crítica estruturada. Uso: prospecção ("proposta pronta em minutos").
3. **Qualificação de leads do Instagram**: recebe mensagem, interage, classifica, direciona ao comercial.
4. **Radar de vagas no LinkedIn**: n8n busca vagas, filtra e joga numa planilha Google Sheets. Uso interno de prospecção: vagas de SDR/BDR e secretária/administrativo em empresas de Curitiba = sinal de dor de atendimento/agenda.
- Métricas de resultado reais desses cases: Nada encontrado.

### Ofertas e entregas reais
**Chatbot de WhatsApp para agendamento (barbearia, petshop/clínica)**
- Lógica: WhatsApp → n8n coleta serviço, data e hora → consulta e cria agendamento (API do sistema do cliente, ou planilha/Google Calendar) → confirma ao cliente. Sem API disponível, alternativa seria RPA via navegador (frágil, possivelmente contra termos de uso).
- Conexão com WhatsApp: avaliadas WhatsApp Cloud API, Z-API e Evolution API. **Evolution API escolhida (21/09).** O time entende que não há risco de suspensão por ser assistente 1:1 e não disparo em massa.
- LLM: **Gemini API**.
- Planos por nível: resposta automática → + registro em planilha → + Google Calendar e notificação.

**Controle financeiro de obra por voz (Júnior Freitas)**
- Lógica: áudio no WhatsApp → transcrição (speech-to-text) → LLM extrai obra, categoria, valor e etapa → registra no Google Sheets (camadas "Lançamentos" e "Etapas") → confirma na hora. Job mensal consolida e envia relatório por e-mail.
- Fases propostas: MVP (gasto por voz, obra piloto) → Fase 2 (início/fim de etapas com duração e motivo de atraso, relatório mensal) → Fase 3 (todas as obras, alertas de atraso e estouro de orçamento).
- O documento de proposta lista "Backend dedicado (Node.js/Python)", mas a entrega real foi em n8n `[inferência]`, a partir das atas e do ClickUp.

**Agente de expedição (Digitron, proposto, não fechado)**
- PDF da Ordem de Serviço enviado via Telegram → LLM cadastra o produto → funcionários atualizam status por mensagem ("como está o produto 4521?") → relatório semanal com produtos parados. Stack: Telegram Bot API, LLM, Google Sheets API, job semanal.

**Chatbot SDR / qualificação de lead para ticket alto (Fola, imobiliário)**
- 3 a 4 perguntas de triagem. Receita pensada: **assinatura mensal + comissão % sobre venda qualificada**; venda de imóvel ≥ R$ 300.000. Vitor já tem estrutura pronta de outro projeto. Replicável para venda de carros.

**App mobile (XÁ), com o Guilherme**
- Plataforma de vídeos para criança hospitalizada, pedagogia antroposófica, "cabine mágica", inspirado no Castelo Rá-Tim-Bum. Pesquisa em 3 hospitais de Curitiba (out-dez/2026); lançamento previsto jan/fev 2027.
- Stack proposta: React Native com Expo (iOS e Android), back-end Node.js + PostgreSQL separado, vídeos em nuvem (MP4 H.264, 16:9, até 1080p), HTTPS, login. Possível pagamento dentro do app. Modelo de negócio do cliente indefinido (lei de incentivo, compra pelo hospital ou assinatura).
- Portfólio apresentado como "apps que nossa equipe já construiu" (são do Guilherme): Moss do Brasil (tacógrafos), Arbitragem de Cripto (fintech, React Native), Unit (delivery com doação), ECG+ (educação médica com IA). A Bevel como empresa **ainda não tem app publicado**.

**Automações internas**
- Publicação automática em redes a partir do Google Drive (Vitor, 14/09) para agendar o mês inteiro.
- Automação de geração de propostas, vista como aplicável a construção e imobiliário (14/09).
- Itens no backlog do ClickUp sem descrição: "HERMES", "OPEN CLAW", "Projeto - front office".

**Linhas superadas ou em ideia**
- ~~Etiquetas NFC~~ (14/09 → pausado em 21/09): R$ 50/etiqueta, venda presencial, restaurantes/DJs/eventos. Custo R$ 20-50/etiqueta, margem mínima.
- SaaS de nicho (ideia de 21/09): rodar em paralelo com a consultoria; exemplo: chatbot de ensino de inglês. Sem produto nem piloto.

### Integrações e ferramentas técnicas
n8n, Evolution API, WhatsApp Cloud API (avaliada), Telegram Bot API, Gemini API, Google Sheets API, Google Calendar, OpenAI e Claude (exibidos no site). **Credenciais:** não foram copiadas para este documento (ver seção 10).

### Demos e links
- Site: `lp-steel-pi.vercel.app`
- Instagram `@bevelsystems`; LinkedIn `linkedin.com/company/bevelsystems` (página criada em 15/09/2026)
- Levantamento do Gabe publicado como artifact (link no cofre).
- Vídeo narrado de 1min39s da proposta da XÁ (`Propostas/Xá/Proposta_Aplicativo_Xa_video.mp4`).

## 6. Estratégia, nicho e mercado

### Linha do tempo do nicho
1. Jul-ago: genérico ("qualquer negócio").
2. Set: tração real só com barbearia; prospecção ampla (barbearia, petshop, academia, consultoria, saúde).
3. 14/09: "foco principal: identificar nichos de mercado e desenvolver soluções de chatbot".
4. 21/09: mentor (Fola) recomenda nichar e "mapear processo e auditar o negócio do cliente antes de propor automação". Construção civil apontada como forte (problemas recorrentes); imobiliário como oportunidade de qualificação de lead. "Segmentar permite reaproveitar solução entre clientes parecidos."
5. 24/09: pesquisas de nicho entregues (advocacia, construção, balanças). Tarefa no ClickUp: "Pensar em 2 ou 3 nichos e subnichos para reunião do dia 25/09".
6. **24/09: decisão**: construção civil + imobiliário, exclusivo até o fim de 2026. Engenharia como subnicho de alto valor (automação de orçamento). Lucas e Du pesquisariam o nicho até 27/09.
7. 05/10: XÁ (hospitalar) aceito como exceção.

### Nichos avaliados e o que foi concluído
| Nicho | Resultado |
|---|---|
| **Construção civil (construtoras pequeno/médio porte)** | **Escolhido.** 165,8 mil empresas (IBGE/PAIC 2023) a 400 mil+ (fonte privada). MEI fora do público. Subnicho mais atacável: construtora residencial pequena, obra sob encomenda, dono único decisor (perfil do Júnior, CNAE 41.20-4). Reforma em 2º. Dor comercial é a mais comprovada: pesquisa SCALE (2,29 mensagens por lead, ~2 dias entre contatos, +50% de velocidade de visita para quem responde em menos de 24h), conversão do setor imobiliário é a pior entre 17 segmentos (mediana 1,52%), Reclame Aqui cheio de "cliente sem visibilidade do andamento da obra". Dor financeira (a do Júnior) é real mas **já tem 6-7 concorrentes** |
| Imobiliário | Escolhido junto. Ângulo: qualificação de lead e filtro de cliente (lead Fola) |
| Advocacia (escritórios médios) | Não escolhido. Concorrência já existe (FourAI, Wublo, Chat Jurídico, ConvertLab, SocialHub); risco regulatório do Provimento 205/2021 da OAB (veda captação, promessa de resultado, preço em publicidade). Vantagem: Arthur atua como advogado. Modelo sugerido seria setup R$ 2.500-6.000 + R$ 997-1.997/mês |
| Balanças industriais (perfil Digitron) | Não escolhido. Mercado de só 100-250 empresas no Brasil `[estimativa da pesquisa]`; pior resultado dos 3 no teste da meta. Achado interessante: Portaria INMETRO 157/2022 (verificação anual) e 657/2025 abrem espaço para software de gestão de calibração do parque instalado |
| Barbearia | Origem dos primeiros clientes; não é mais o foco. Descarte formal: Nada encontrado (ver seção 13) |
| Lista de nichos do contexto do Eduardo (incorporadora, contabilidade, corretora de seguros, clínica de alto ticket, advocacia em massa) | No material do Arthur só aparecem advocacia, construção, imobiliário e balanças. Contabilidade e corretora de seguros: Nada encontrado |

### Concorrentes mapeados (construção)
ObraFácil (RDO por voz via WhatsApp, R$ 79-349/mês), ConstrAI (lançamento via WhatsApp, R$ 199-399/mês), Meu Construtor (voz dentro do app, R$ 299,90/mês), Etapa da Obra, Obra no Bolso IA, AppObraCivil, NumPasso Obras. ERPs: Sienge (líder) e Vobi, ambos com queixas no Reclame Aqui (Vobi: cobrança após cancelamento).

### Padrão observado em todos os nichos pesquisados
Existe uma lacuna entre software genérico barato (fraco na dor do nicho) e software corporativo caro (implantação longa, mal avaliado por empresa pequena). Nenhum concorrente está livre de reclamação de suporte. Leitura: **atendimento próximo é diferencial real** para fornecedor pequeno.

### Tese estratégica interna (registrada nos roteiros de 01/10)
"Por que verticalizar em vez de repetir o produto do Júnior": o controle de gasto por voz "economiza tempo, mas é difícil de provar em reais". **Resposta rápida de lead e obra visível para o cliente geram contrato fechado direto**, são mais fáceis de mostrar em reais e de cobrar mais caro. Ou seja, a empresa prefere **front office** (geração de receita) a back office.
- Risco apontado pelas pesquisas com confiança alta: o nicho está sendo puxado pelas indicações do Júnior, mas a dor validada com ele é back office, justamente a que a tese evita.

### Modelo de oferta e recorrência
- Atual: **serviço pontual + mensalidade** (formato A). Pesquisa recomenda migrar para **produto padronizado com setup** (formato C) quando houver 5 a 8 clientes com a mesma configuração, com preço por número de obras simultâneas.
- Retainer de gestão contínua (formato B): avaliado como não escalável com 4 sócios.
- SaaS: não é padrão; aparece só como ideia paralela (21/09).

### Tese de custo de troca (relatório de construção)
O cliente perderia: histórico de gasto por obra, relatórios, o hábito da equipe de mandar áudio e o número de WhatsApp já conhecido; no módulo comercial, histórico de leads e cadência de atualização. Mas o custo de troca é **baixo** se o produto continuar simples (não é ERP), e concorrentes maduros têm mais features. Risco técnico: mudança de política da API do WhatsApp.

## 7. Comercial e vendas

- **Regra fixa: nunca falar valor de projeto por WhatsApp.** Preço só por ligação.
- **Regra (24/09):** só começar trabalho depois de pagamento ou contrato assinado, para evitar scope creep. Cronograma claro por fase; documentação completa (PDF, apresentação) para cliente grande; reunião semanal ou quinzenal durante o projeto com cliente corporativo. (O caso Júnior é exceção anterior a essa regra.)
- **Mensalidade:** não revelar o valor exato na venda, só faixa por complexidade (24/09).
- **Canais:** 100% dos 3 primeiros clientes/leads quentes vieram de **indicação pessoal**. Prospecção fria via radar de vagas do LinkedIn. Contato frio preferido: WhatsApp (maior resposta para esse porte), manual, porque **WhatsApp proíbe disparo frio em massa**.
- **Estratégia de troca (registrada, sem resultado):** automação de postagem no Instagram grátis por 1-2 meses para perfis com 3-5 mil+ seguidores, em troca de 1 post semanal divulgando a Bevel, depois oferecer mensalidade.
- **Critério de qualificação de lead:** negócios com agenda de atendimento ao público (clínica, consultório, escritório, imobiliária, estúdio); descartar vaga de estágio; empresa contratando SDR/BDR ou secretária = dor real. Negócio ainda no MEI dificilmente paga o ticket.
- **Funil para o nicho (24/09):** conteúdo de conscientização no Instagram para construção → **formulário de qualificação** → WhatsApp. R$ 300-400/mês de impulsionamento. Guia de prospecção com tópicos de conversa para ligar para construtoras (em desenvolvimento, não encontrado pronto). Prospecção com lista já preparada.
- **Funil B2B do LinkedIn (modelo do Victor Baggio, adotado 18/09):** conteúdo transacional + lead magnet → perfil pessoal como landing page → conversão e entrega por formulário e automação → warm outreach com quem comentou → agendamento automatizado → venda em **duas reuniões (diagnóstico, depois proposta)** → "land and expand" (vender projeto menor primeiro). Só a etapa de conteúdo está pronta.
- **Perguntas de descoberta (construção, do relatório de 24/09):** tempo até a primeira resposta a pedido de orçamento; orçamentos por mês e quantos fecham; se já perdeu cliente por demora; como o cliente final sabe do andamento da obra; reclamações por falta de informação; como registra gastos; se já esqueceu de lançar gasto; quanto acha que perdeu por falta de controle; se já usou Sienge, Vobi, ObraFácil, ConstrAI; quanto pagaria por mês e o que o faria cancelar.
- **Roteiro de levantamento para chatbot de barbearia:** serviços e duração, produtos e preços, endereço, horário, número de profissionais, cursos, chave Pix, dados para contrato.
- **Formatos de proposta (cronológico):** deck PowerPoint com 3 planos (Gabe) → deck "como funciona" sem preço (Júnior, 09/09) → documento Word/PDF com fundo navy (12/09) → **site de slides interativo** como novo padrão (18/09, inspirado em `slide-mentoria.vercel.app`) → PDF de slides 16:9 de 9 páginas para app (XÁ, 05/10) + vídeo narrado. Diagrama de fluxo em PDF (fundo branco, cores pastel por tipo de etapa) como entregável técnico separado.
- **Argumentos usados:** atendimento 24/7, automação cobre "95% do processo de agendamento" (Muzão), atendente custaria mais de R$ 20 mil/ano, site pode aumentar o negócio em ~30% (afirmação usada na reunião, sem fonte).
- **Regra de material:** nunca prometer algo que ainda não é verdade (ex.: dizer que a automação "já está pronta"); sem prova social ou case fabricado.
- **Comissão ou incentivo entre sócios:** Nada encontrado.

## 8. Marketing e marca

### Identidade visual
- Fundo navy `#091222` (variações `#03060d`, `#0a1120`, `#111C36`), azul de destaque `#1E6BFF` (usar com moderação), teal `#5FD3C4` (rótulos, checks), texto `#F4F6FB`.
- Tipografia das propostas: **Oswald** (títulos em caixa alta) + **Inter** (corpo). Documento Word: Arial Nova 12pt.
- Logo "bevel SYSTEMS" em texto. PNG quadrado criado em 15/09 para o LinkedIn (`BEVEL/Posts Linkedim/`), arquivo `BEVEL/logo bevel.jpeg`. Du fez "novas logos" (ClickUp, ~14/09).
- Documentos internos para os sócios usam outro estilo (editorial, fundo creme, Fraunces + Public Sans + IBM Plex Mono).

### Posicionamento e tom
- **Princípio central (13/09):** o conteúdo "não vende inteligência artificial ou automação em si, vende o problema resolvido e o lucro que sobra depois". Teste: tirar a palavra "IA" do texto; se ainda fizer sentido para o dono de negócio, está certo.
- Reforçar que a automação tira a parte repetitiva, **não o atendimento humano** (medo principal da persona: contratar algo caro/complicado ou perder o toque humano).
- Para o nicho: "Não vendemos automação ou agente de IA genérico... Vendemos resposta rápida pro lead que quer construir, obra visível pro cliente que já contratou, e controle de gasto que não depende de ninguém lembrar."
- **Não citar cliente fechado por nome** em conteúdo até segunda ordem; case do Júnior só de forma anônima ("um cliente nosso que toca obra").
- Estilo de escrita do Arthur: frases diretas, **sem travessão, parênteses ou aspas**.
- Estrutura de carrossel validada: sem imagem repetida, tipografia grande, 3 bullets por slide, CTA no final.
- Estrutura de vídeo curto validada: 40-50s, gancho nos 3 primeiros segundos sem se apresentar, desenvolvimento com exemplo concreto, CTA único ("Chama a gente").
- O site atual (hero com CTA de WhatsApp, processo em 6 etapas: Imersão, Planejamento, Estruturação, Desenvolvimento, Testes, Publicação; stack OpenAI, Claude, n8n, WhatsApp API) fala com "qualquer negócio" e não tem case publicado. Em 21/09: precisa de **reformulação completa** se a empresa nichar. Status: Nada encontrado.

### Canais e cadência
- **Instagram:** 2 Reels + 1 carrossel por semana (14/09). Conteúdo do nicho a partir de 01/10. Primeiro carrossel: "qualificação de leads" (PDF em `carrosel/`). Semana 1 do nicho: 2 Reels (controle financeiro de obra, orçamento demorado) + carrossel "o dinheiro que some na obra".
- **TikTok:** vídeo diário do Vitor documentando a criação da empresa (14/09). Visto como mais fácil de viralizar. Execução real: Nada encontrado.
- **LinkedIn:** perfil pessoal do Arthur, cronograma a partir de 21/09/2026 com post a cada 2 dias até 25/10 (no cofre aparece como 3x por semana, terça a quinta; a planilha `CRONOGRAMA.xlsx` mostra dias alternados). Só o primeiro ("Atendimento lento no WhatsApp", 21/09) está marcado como feito na planilha. Posts escritos: atendimento lento, lead que esfria, agenda cheia de furo, informação espalhada em planilhas, antes e depois construtora (case anônimo), processo que depende de uma pessoa só, controle financeiro na cabeça do dono, orçamento demorado, pedido real construtora (case anônimo), equipe presa em tarefa repetitiva, cliente sem retorno, crescer sem contratar mais gente. Próximos sem texto: decisão no achismo, inadimplência, onboarding bagunçado, dado copiado na mão, reclamação que demora, e o 1º Lead Magnet (25/10, sugerido: checklist "3 sinais de que seu negócio está perdendo dinheiro"). Público dos posts: empresas de R$ 1 a 10 milhões de faturamento.
- Página da empresa no LinkedIn criada em 15/09.
- **Tráfego pago:** prioridade é orgânico (14/09); exceção de R$ 300-400/mês para o nicho (24/09).
- Ideias de conteúdo em vídeo: 5 formatos (porta de entrada; série semanal de n8n com Vitinho e Du; evento de case de cliente, aguardando sinal; mundo da IA; bastidores). 7 roteiros genéricos (13/09) e 7 roteiros do nicho (01/10), em `BEVEL/Criação de conteúdo bevel/`.
- ClickUp: tarefas diárias do Arthur "fazer copy e criação das imagens" (várias concluídas, as de 30/09 em diante em backlog); "Criação de conteúdo construtora" (Arthur em andamento, Du em backlog); "Criação de conteúdo - VÍDEOS" (Du, em andamento); "Mentoria do Tráfego orgânico" (Arthur, em andamento).
- **Resultados** (seguidores, alcance, leads gerados por conteúdo): Nada encontrado.

## 9. Operação e processos

- **Reuniões:** reuniões de sócios gravadas e transcritas pelo **tl;dv**, com atas em `BEVEL/Atas das reuniões/` (14/09, 21/09, 24/09; com clientes: Muzão 17/09, XÁ 29/09). Cadência das reuniões de sócios: semanal `[inferência]` pelas datas. Desde 24/09, reuniões por departamento.
- **Ferramentas:** ClickUp (gestão e CRM, desde 14/09; estrutura feita pelo Du; espaços "Espaço da equipe" com listas Metas, Administrativo, Marketing, Financeiro & Societário, Comercial, Automação & Produto; "Clientes" com uma lista por cliente; "Templates" com "Cliente - Automação"; plano de migrar para outra ferramenta no futuro), n8n, WhatsApp, Google Sheets/Drive/Calendar, Claude (chat, Projects, Claude Code; um Project por cliente/frente), Canva, Vercel, PowerPoint/Word, tl;dv, Artlist (geração de vídeo/voz), Obsidian (memória do Arthur). Antes do ClickUp usavam Google Agenda.
- **Onboarding de cliente (template do ClickUp, aplicado ao Gabe):** apresentação e fechamento → contrato enviado/assinado → primeiro pagamento → briefing inicial → coleta de acessos (WhatsApp Business, CRM/planilha, outros sistemas) → setup interno → desenho do fluxo (casos de erro mapeados, fluxo validado) → construção no n8n → testes internos → ajustes pós-teste → deploy em produção → cliente avisado → check-in de 1 semana → go-live → acompanhamento assistido → check-in mensal → cobrança recorrente → nota fiscal. Ao integrar cliente novo, duplicar o modelo.
- **Entrega:** prazo padrão do contrato do Gabe: 1 mês de desenvolvimento + 1 semana de implantação e testes. Prazo do primeiro rascunho de contrato: 2 semanas.
- **Suporte (contrato):** dias úteis, 8h às 18h; correção de falhas, ajustes pontuais dentro do escopo, monitoramento preventivo.
- **Responsáveis por cliente:** Vitor desenvolve; Lucas faz contato comercial e cobrança; Arthur cuida de contrato e conteúdo.
- Material de cliente salvo em `BEVEL/Propostas/<Cliente>/`.

## 10. Jurídico e compliance

### Contrato de prestação de serviço (modelo atual, versão assinada com o Gabe)
- Contratada: **Vitor como autônomo pessoa física**, "atuando comercialmente sob a marca BEVEL SYSTEMS". Enquadramento: prestação de serviço de tecnologia (arts. 593 a 609 do Código Civil).
- **Anexo I** concentra as condições de cada cliente (escopo, valor, parcelas, meses de manutenção inclusos, vencimento, prazos, vigência), para não reescrever o contrato.
- Cláusulas principais:
  - Serviços adicionais fora do escopo dependem de contratação e valor à parte.
  - Mensalidade de suporte e manutenção = **10% do valor total**, a partir do mês seguinte à entrega (ou após meses já inclusos), reajuste anual pelo **IPCA**.
  - **Fidelidade de 12 meses** contados do início da cobrança da mensalidade (era 4 meses contados da assinatura no rascunho de agosto).
  - Atraso: multa de 2% + juros de 1% ao mês; atraso da mensalidade acima de **7 dias** permite suspender o suporte.
  - Prazo de entrega começa só com contrato assinado + primeira parcela paga + acessos entregues; fica suspenso enquanto o cliente não entrega o necessário; após 5 dias + 5 de notificação, pode rescindir e reter o sinal.
  - Aceite tácito se o cliente não apontar desconformidade até o fim da semana de testes.
  - Rescisão imotivada com 30 dias de aviso; antes do fim da fidelidade, **multa de 15% do valor total do serviço**. Rescisão motivada após 7 dias sem sanar.
  - Confidencialidade por **5 anos** após o término.
  - **Propriedade intelectual:** o cliente pode usar a automação feita para ele "de forma perpétua e não exclusiva", só para o próprio negócio, **sem ceder, sublicenciar ou revender**. A Bevel continua dona de metodologias, know-how, códigos-base, templates e estruturas genéricas e pode reutilizá-los em outros projetos. Licenças de terceiros (WhatsApp API, hospedagem) ficam entre o cliente e o fornecedor.
  - **LGPD:** cliente é **controlador**, Bevel é **operadora**; incidentes comunicados em até 7 dias; dados devolvidos ou eliminados ao fim.
  - Obrigação de resultado, sem vínculo empregatício, título executivo extrajudicial (art. 784, III CPC), foro de Curitiba/PR.
- Folha de rosto do contrato (`folha-de-rosto- bevel contrato.docx`) ainda prevê "CNPJ/CPF do MEI responsável", ou seja, ficou desatualizada após o descarte do MEI.
- Rascunho mais antigo (`CONTRATO BEVEL termianar.docx`, ago/2026) tinha os 3 sócios originais como contratados, 50% de sinal + 50% na entrega e vigência de 2 meses.

### Outros pontos
- **Contrato pode ser informal**: mensagem/áudio já formam contrato de prestação de serviço no Brasil (prova mais fraca); o contrato escrito "absorve" o que já foi combinado, citando a data. Usado no caso do Gabe.
- **NDA**: prometido à XÁ antes do início do trabalho. Modelo: Nada encontrado.
- **Pendências e riscos:** Júnior sem contrato; recebimento do Gabe na conta pessoal do Arthur; sem nota fiscal; sem CNPJ; LGPD de dado financeiro de obra processado por voz/IA ainda sem pesquisa jurídica; termos de uso do WhatsApp (proibido disparo em massa; Evolution API não é a API oficial).
- **Credenciais:** existem arquivos com login e senha de contas da empresa (e-mail Outlook da Bevel e Instagram) em `BEVEL/CONTAS/CONTAS.docx` e `BEVEL/Financeiro/Nova pasta/folha de rosto.docx`. **Não reproduzidas aqui.** Recomendo tirá-las de documentos de texto soltos `[inferência]`.
- O Arthur também atua como advogado fora da Bevel (casos próprios). Isso não é atividade da empresa, mas explica a vantagem dele no nicho jurídico.

## 11. Decisões tomadas (cronológicas)

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| Jul/2026 | Divisão societária sempre igual (33,3% com 3 sócios) | Sócios | Nada encontrado além da regra |
| Antes de 05/09 | Entrada do Du como 4º sócio, 25% cada | Sócios | Nada encontrado |
| Antes de 05/09 | Rejeitado usar MEI de amigo de fora | Sócios | Custo recorrente, fatia em cada venda |
| Antes de 05/09 | Contrato com cláusulas separadas para desenvolvimento e manutenção | Arthur (jurídico) | Naturezas diferentes de serviço |
| Antes de 05/09 | Fidelidade da manutenção de 4 para 12 meses, contada do início da cobrança | Arthur / sócios | Nada detalhado |
| Antes de 05/09 | Nunca falar valor de projeto por WhatsApp | Sócios | Negociação por ligação |
| Antes de 05/09 | Um Project do Claude por cliente/frente | Arthur | Separar contexto técnico |
| 05/09 | **MEI descartado**; faturar pelo CPF do Vitor como autônomo | Sócios | Atividade bloqueada no MEI |
| 10/09 | Entregar MVP do Júnior antes de cobrar, sem contrato | Sócios | Pessoa de confiança, risco aceito |
| 13/09 | Vídeos curtos de 45s em 5 formatos em vez de canal longo no YouTube | Arthur | Formato original era vertical curto |
| 13/09 | Conteúdo vende problema resolvido e lucro, não IA; não citar cliente fechado | Arthur | Posicionamento |
| 14/09 | ~~Etiquetas NFC como linha paralela~~ | Reunião de sócios | Receita rápida para sair do CLT |
| 14/09 | Adotar **ClickUp** | Reunião de sócios | Google Agenda não dava visibilidade; faltava CRM |
| 14/09 | Orgânico antes de tráfego pago | Reunião de sócios | Validar formato e audiência |
| 14/09 | Lucas sai de marketing para pós-venda; Arthur assume conteúdo | Sócios | Motivo não registrado |
| 14/09 | NFC do Jacon cobrado por etiqueta, não assinatura | Reunião de sócios | Assinatura complexa demais |
| 18/09 | Propostas passam a ser site de slides interativo | Arthur | Mais moderno |
| 18/09 | Adotar funil B2B de LinkedIn do Victor Baggio | Arthur | Modelo de referência |
| 21/09 | **Evolution API** no lugar da API oficial da Meta | Vitor / reunião | QR code, reaproveita número |
| 21/09 | **NFC pausado**, foco total em projeto de cliente | Reunião de sócios | Margem mínima, competia com entregas |
| 21/09 | **Mentoria externa adiada para 2027** | Reunião de sócios | ~R$ 10 mil/ano e exige os 4 juntos |
| 24/09 | **Nicho: construção civil + imobiliário, exclusivo até o fim de 2026** | Reunião de sócios | Já há prova de conceito (Júnior); foco e eficiência acima de TAM |
| 24/09 | **Nova política de preço** (horas, mensalidade por escopo, não revelar mensalidade na venda) | Reunião de sócios | Posicionar como serviço próprio e justificar recorrência |
| 24/09 | Só começar trabalho após pagamento ou contrato | Reunião de sócios | Evitar scope creep |
| 24/09 | Reuniões por departamento; pedidos entre áreas via ClickUp | Reunião de sócios | Eficiência |
| 24/09 | R$ 300-400/mês de impulsionamento no Instagram só para o nicho | Reunião de sócios | Funil do nicho |
| 24/09 | Migrar do ClickUp no futuro | Reunião de sócios | Motivo não registrado |
| 05/10 | **XÁ aceito como exceção ao nicho** | Arthur | Projeto interessante (visibilidade com hospitais e incentivo fiscal) |
| 05/10 | Valor do app XÁ "a definir" (R$ 6.000 da reunião descartado); prazos de suporte "a combinar" | Arthur | Escopo ainda pode mudar |
| 05/10 | Portfólio do Guilherme apresentado como "apps que nossa equipe já construiu" | Arthur, com autorização do Guilherme | Ser verdadeiro: a Bevel em si não tem app publicado |

## 12. Pendências, riscos e perguntas abertas

**Pendências**
- Abrir CNPJ (LTDA) e conta PJ; definir quem é o responsável legal; atualizar a folha de rosto do contrato.
- Plataforma de parcelamento no cartão.
- Regularizar o pagamento do Gabe recebido na conta do Arthur.
- Contrato e preço do Júnior (reunião 07/10).
- Planilha de fluxo de caixa (Eduardo) e aba de recebimentos; hoje não há controle de caixa nem de MRR.
- Definir a metodologia padronizada de mensalidade por escopo (decidida em princípio, sem tabela encontrada).
- Guia de prospecção por ligação para construtoras; formulário de qualificação; lead magnet.
- Reformulação do site para o nicho.
- Desfechos de Muzão, Mu, Digitron, Fola, Puppy Stop, Instituto Camara Lopes, Whindersson.
- Dono de gestão/estratégia/administrativo; divisão de conteúdo entre Arthur e Du.
- Acordo de sócios (vesting, saída, pró-labore, distribuição de lucro): inexistente.
- Formalizar a relação com o Guilherme (é sócio? prestador? como é pago?): Nada encontrado.

**Riscos**
- Todo o faturamento e o contrato estão no CPF de um sócio só (Vitor): risco fiscal, de caixa e de governança `[inferência]` (o cofre registra que concentrar no MEI de uma pessoa tinha esse problema, e o mesmo vale para o CPF).
- Cliente-âncora do nicho (Júnior) sem contrato e sem pagamento.
- Concorrência direta madura no produto validado (controle de gasto de obra por voz).
- Meta de R$ 50-60 mil/mês em 6 meses considerada improvável por todas as pesquisas.
- Capacidade: 4 sócios com CLT, 1 dev principal (Vitor) mais o Guilherme, vários projetos ao mesmo tempo, inclusive fora do nicho (XÁ).
- Dependência de terceiros: WhatsApp/Meta (Evolution API não oficial), Gemini (bugs registrados), transcrição.
- LGPD de dado financeiro e de voz sem análise.

**Perguntas abertas**
- O Fola do lead imobiliário (14/09) é o mesmo Fola da mentoria (21/09)? `[incerto]`
- "Mu" é o nome correto do cliente? `[incerto]`
- "Chico" (ClickUp) é a XÁ? `[inferência]`
- O Guizão é o Guilherme? `[inferência]`
- Qual plano o Gabe realmente comprou? (ver seção 13)

## 13. Contradições e atualizações

### Em relação ao contexto que o Eduardo já tem
1. **"Operam pelo MEI do Vitor"**: **superado.** O MEI foi descartado em 05/09/2026 porque automação, chatbot e consultoria em TI são proibidos no MEI em qualquer CNAE. Hoje faturam pelo **CPF do Vitor como autônomo pessoa física** (sem nota fiscal, carnê-leão). O CNPJ (LTDA) continua pendente.
2. **"Recebem só via Pix"**: em parte. Recebem por Pix (chave CPF do Vitor, Caixa), mas o primeiro pagamento do Gabe caiu na conta pessoal do Arthur; oferecem e buscam **parcelamento no cartão** (Muzão 6-7x, XÁ até 6x); conta PJ no C6/Nubank em abertura.
3. **"Controle financeiro em Google Sheets, métrica MRR"**: o arquivo que existe é **Excel (modelo da Contabilizei)**, com abas mensais **vazias** e só uma tabela de custos (R$ 249,90/mês recorrentes). Não há MRR medido. A planilha de fluxo de caixa é tarefa pendente do próprio Eduardo no ClickUp. MRR hoje é zero; a primeira mensalidade do Gabe começa em 20/12/2026.
4. **"Nicho ainda não escolhido"**: **superado.** Em **24/09/2026**: construção civil + imobiliário, exclusivo até o fim de 2026, com engenharia (orçamento) como subnicho de alto valor. Exceção: app da XÁ (05/10).
5. **Nichos em análise**: no material do Arthur foram pesquisados advocacia, construção civil e balanças industriais (Digitron). Advocacia e balanças foram **descartados** em 24/09. Contabilidade, corretora de seguros e clínica de alto ticket não aparecem.
6. **"Barbearias descartadas"**: não há registro de descarte formal. A barbearia foi a **origem** (Gabe é cliente pagante, bot em produção desde 06/10) e o Jean (Imperium) ficou como lead. Na prática, barbearia ficou fora do foco quando o nicho foi escolhido `[inferência]`.
7. **"Modelo de oferta em aberto"**: definido na prática como **projeto pontual + mensalidade de manutenção com fidelidade de 12 meses**, precificado por horas e score de complexidade, sem revelar a mensalidade na venda (24/09). SaaS segue como ideia paralela.
8. **"Lead Gabe (barbeiro)"**: **superado.** Gabe é o **primeiro cliente fechado**, com contrato assinado e pagamento em curso. Sobre a "pergunta-chave sobre o Cash Barber": no cofre o Cash Barber aparece ligado ao lead **Jean (Imperium Barbershop)**. No ClickUp do Gabe, a tarefa "verificar possibilidade de consulta de horário no Cash Barber" foi **concluída** sem resultado anotado `[incerto]`.
9. **"Chatbot WhatsApp para barbearias em 3 planos"**: confirmado (R$ 1.000 / 1.500 / 2.000), mas o contrato assinado não bate com isso (item abaixo). O mesmo modelo de 3 planos foi reaplicado à clínica veterinária com outros valores (R$ 1.189 / 2.499 / 3.359).
10. **"Marketing só em Instagram e LinkedIn"**: também foi decidido **TikTok** diário (Vitor, bastidores), em 14/09. Execução não confirmada.
11. **Papéis dos sócios**: o Eduardo lista "Arthur (financeiro)". No cofre o Arthur aparece com jurídico + financeiro + prospecção + conteúdo/postagens; nas propostas recentes aparece como "processos e marketing". Lucas está oficialmente em "pós-venda/relacionamento", mas na prática é quem faz o comercial. Vitor confere. Eduardo aparece como marketing/conteúdo/edição de vídeo e estrutura do ClickUp.
12. **Cases**: os 4 estão certos, mas nenhum tem métrica de resultado. Os entregáveis reais para clientes são o chatbot do Gabe e o controle de obra do Júnior.

### Conflitos entre as próprias fontes do Arthur
- **Plano e valor do Gabe:** o cofre diz "Plano 3 fechado" e "Total R$ 1.430 em 4 parcelas". O **contrato assinado** diz "plano **Chatbot Padrão**", valor total **R$ 1.190**, mas a tabela de parcelas soma **R$ 1.430** (2 × R$ 178,75 + 3 × R$ 357,50). Explicação provável: R$ 1.190 do projeto + 2 meses de manutenção inclusos (outubro e novembro, 10% de R$ 1.190 = R$ 119 cada → R$ 1.428 ≈ R$ 1.430) `[inferência]`. Também não bate com a tabela de planos (Plano 1 = R$ 1.000). O contrato tem essa inconsistência interna entre valor total e parcelas.
- **Digitron:** registrada por engano como cliente fechado e corrigida em 13/09. Proposta é de agosto; a pasta local se chama "Digitron - off".
- **Papel do Lucas**: "pós-venda" no cofre vs. "comercial" nas atas e propostas.
- **NFC:** adotado em 14/09 e revertido em 21/09, mas na mesma reunião de 21/09 aparece "Vitor compra etiquetas NFC e testa configurações essa semana".
- **Cadência do LinkedIn:** cofre diz 3x/semana (terça a quinta); a planilha de cronograma usa dias alternados.
- **Fidelidade:** 4 meses no rascunho antigo vs. 12 meses no contrato atual (o atual vale).
- **Proposta do Júnior** lista "backend dedicado Node.js/Python", mas a construção real foi em n8n `[inferência]`.

## 14. Glossário e pessoas

**Termos internos**
- **Brolinho / Zé**: apelidos do Arthur. **VT / Vitinho**: Vitor. **LC**: Lucas. **Du**: Eduardo.
- **Junhão**: Júnior Freitas.
- **Guizão**: dev externo/colaborador que constrói SaaS; provavelmente o Guilherme `[inferência]`.
- **Plano 1/2/3**: níveis do chatbot (resposta automática → + planilha → + agenda/notificação ou site).
- **Score de complexidade**: soma dos 6 critérios da metodologia de precificação.
- **Anexo I**: anexo do contrato com as condições de cada cliente.
- **Front office / back office**: geração de receita (lead, vendas, cliente final) vs. controle interno (financeiro, expedição). A empresa prefere atacar front office.
- **Land and expand**: vender projeto pequeno e depois expandir.
- **Formato 1 a 5**: formatos de vídeo curto.
- **Lead Magnet**: material gratuito do funil do LinkedIn.
- **Segundo Cérebro**: cofre Obsidian do Arthur, memória da empresa.

**Pessoas externas**
| Nome | Relação com a Bevel |
|---|---|
| Gabriel "Gabe" Morais | Dono da Morais Barbershop, cliente 1 |
| Júnior Freitas | Dono da Construtora Interativos, cliente 2, fonte de 10+ indicações |
| Gabriel "Muzão" | Lead, cuida de banho e tosa da clínica veterinária da família; padrasto é o decisor |
| XÁ | Idealizadora do app para criança hospitalizada (artista, tem espaço de arte em Curitiba) |
| Rodolfo | Indicou a XÁ |
| Guilherme | Dev que passou a atuar com a equipe (app XÁ) |
| Fola | Lead de chatbot SDR imobiliário e/ou mentor de nicho (~R$ 10 mil/ano) `[incerto]` se é a mesma pessoa |
| Jacon | Lead de etiquetas NFC (DJs/eventos) |
| Jean | Imperium Barbershop, lead, usa Cash Barber |
| Bia | Site de joias, ligado ao Guizão |
| Whindersson | Projeto de site negociado pelo Arthur |
| Victor Baggio | Referência de funil B2B no LinkedIn (Playbook Lab); "grupo baggio" no ClickUp |
| Digitron | Fabricante de balanças de Curitiba (desde 1997), lead via amizade |

## 15. Índice de fontes

Caminhos relativos a `C:\Users\ACS Gamer\Documents\BEVEL\`. Cofre = `obsidion/Segundo Cérebro/`.

| Informação | Fonte |
|---|---|
| Visão geral, sócios, estado atual, histórico | Cofre: `00 Empresa (Bevel Systems).md` (atualizada até 05/10) |
| Decisões e raciocínio | Cofre: `02 ⚖️ Decisões/_Índice Decisões.md` |
| Preferências de estilo do Arthur | Cofre: `01 🧭 Preferências/_Índice Preferências.md` |
| Modelos de proposta, carrossel, roteiro, identidade visual | Cofre: `03 📐 Modelos e Padrões/_Índice Modelos e Padrões.md` |
| Status por área | Cofre: `04 🗂️ Áreas da Empresa/` (Automações, Financeiro, Jurídico, Marketing e Conteúdo, Vendas e Prospecção) |
| Ferramentas | Cofre: `05 🧰 Ferramentas/_Índice Ferramentas.md` |
| Aprendizados (MEI, WhatsApp, nichos) | Cofre: `06 💡 Aprendizados/_Índice Aprendizados.md` |
| Dossiês de clientes | Cofre: `07 🤝 Clientes Fechados/` (Gabe; Júnior Freitas) |
| Reuniões de sócios | `Atas das reuniões/Reuniões com os sócios/` 2026-09-14, 2026-09-21, 2026-09-24 (transcrição tl;dv) |
| Reuniões com leads | `Atas das reuniões/Reuniões com clientes não fechados/` Muzão 2026-09-17, XÁ 2026-09-29 |
| Contrato assinado do Gabe | `clientes   ARRUMAR ------/Gabe/Contrato Gabe morais ASSINADO.pdf` |
| Modelo de contrato atual | `Juridico/Contrato bvl - aguardando gabe.docx` (05/09/2026) |
| Rascunho antigo com 3 sócios | `Juridico/CONTRATO BEVEL termianar.docx` (03/08/2026); também `CONTRATO BEVEL REVISAR.docx`, `Contrato.docx`, `Contrato bvl2].docx` (jul/2026, não detalhados) |
| Folha de rosto | `folha-de-rosto- bevel contrato.docx` |
| Metodologia de preço | `PRECIFICAÇÃO.docx` (17/07/2026) |
| Custos | `Financeiro/controle financeiro BEVEL SYSTEM.xlsx`, aba "Planilha1" |
| Deck institucional e 4 cases | `apresentação - bevelsystems.pdf` (27/08/2026) |
| Proposta Digitron | `Digitron - off/PROPOSTA DE PROJETO - DIGITRON.pdf` (ago/2026) |
| Propostas Júnior | `Propostas/junior freitas/` (docx, pdf, site html, versão do Vitor) |
| Proposta XÁ | `Propostas/Xá/Proposta_Aplicativo_Xa.pdf` e `.html` (out/2026) |
| Levantamento Gabe | `Propostas/Gabe/Morais_Barbershop_Levantamento.html` |
| Posts e cronograma do LinkedIn | `Posts Linkedim/*/texto.txt` e `Posts Linkedim/CRONOGRAMA.xlsx` |
| Roteiros de vídeo | `Criação de conteúdo bevel/z.html` (13/09) e `Roteiros, Construção e Imobiliário.html` (01/10) |
| Pesquisas de nicho | `reports/Construtoras pequeno médio porte Brasil.md`, `reports/Balanças industriais Brasil.md`, `research_notes/` (24/09/2026); advocacia só resumida no cofre (relatório não salvo) |
| Status mais recente (deploy do Gabe, reuniões de 07/10, metas, tarefas) | ClickUp, workspace da Bevel, lido em 07/10/2026 |

---

## Cobertura

**O que pesquisei**
- O cofre Obsidian inteiro (é pequeno: índices, 5 notas de área, 2 dossiês de cliente; as notas `2026-09-05.md`, `Bem-vindo.md` e `crie um link.md` estão vazias ou são padrão).
- Toda a pasta `BEVEL/`: 5 atas, 5 contratos/rascunhos, folhas de rosto, precificação, planilha financeira (todas as abas), deck institucional, propostas (Digitron, Júnior, XÁ, Gabe), 12 posts e o cronograma do LinkedIn, 2 documentos de roteiros, 2 relatórios de nicho (o de construção lido em detalhe nas seções de oferta, custo de troca, modelo, GTM e riscos; o de balanças pelo resumo no cofre e pelos títulos).
- ClickUp: todas as tarefas abertas e fechadas dos espaços "Espaço da equipe" e "Clientes" (só leitura, títulos e status, sem abrir descrições nem comentários).

**O que não acessei ou não aproveitei**
- **Gravações e transcrições completas do tl;dv** (só as atas resumidas). A pasta `gravações de reunioes` está vazia.
- **Conversas de WhatsApp** com clientes e entre sócios, e áudios (onde estão as negociações de preço, que por regra acontecem por ligação).
- **Fluxos do n8n** (nenhum JSON de workflow no material), então a seção técnica descreve a lógica pelas propostas e atas, não pelo código.
- **Histórico de conversas do Claude.ai** (23 conversas de 23/07 a 05/09 foram resumidas no cofre em 05/09; não reli os originais).
- Descrições e comentários das tarefas do ClickUp, docs do ClickUp e o canal de chat.
- Imagens: carrossel do Instagram (PDF só com imagem), comprovante de pagamento, `pexin.jpg`, logo.
- `research_notes/` (10 notas de pesquisa de fase 1) e o relatório de balanças completo: lidos só pelos resumos.
- Pasta `Propostas/Plaquinhas NFC (pessoal)`: ignorada por estar marcada como pessoal.

**Onde ainda deve haver informação não extraída**
- Como os sócios se conheceram e a data de fundação: provavelmente nas primeiras conversas do Claude.ai ou em memória dos sócios, não no material escrito.
- Valores reais negociados por ligação (Júnior, Muzão, Fola) e resultado das reuniões de 07/10.
- Acordo entre sócios sobre divisão de receita, pró-labore e o papel/remuneração do Guilherme.
- Reuniões de sócios depois de 24/09 (não há ata de 28/09 em diante).
- Métricas de redes sociais e resultado dos posts.
