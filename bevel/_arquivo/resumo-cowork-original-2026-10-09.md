# Contexto — Bevel

Arquivo de contexto do projeto. Leia antes de responder qualquer coisa sobre a Bevel.

---

## 1. A empresa

**Bevel (bevel Systems)** — automações e IA para empresas. Quatro sócios, nenhum funcionário.
Base: Curitiba / São José dos Pinhais – PR.

Todos os sócios ainda têm emprego. O objetivo é chegar a uma receita recorrente que permita
sair dos empregos e viver da Bevel em até 12 meses.

### Sócios e papéis
| Pessoa | Apelido | Função |
|---|---|---|
| Vitor | VT | Desenvolvimento / automações / produto |
| Eduardo | Du | Marketing e prospecção |
| Arthur | Zé | Financeiro, marketing, conteúdo |
| Lucas | — | Prospecção, vendas, reuniões, relação com cliente |

Guizão: dev externo (colega de trabalho do Lucas), vai tocar o app do Chico, remunerado por projeto.
Não é sócio.

### Situação jurídica
- **Não existe CNPJ da Bevel ainda.** Existe um MEI do VT, que **não serve**: MEI não pode ter sócio,
  tem teto de R$ 81 mil/ano e não permite CNAEs de desenvolvimento de software (6201, 6202, 6203, 6204, 6209).
- Pendente: acordo de sócios por escrito e abertura de ME/SLU no Simples, com CNAE 6201-5/01 ou 6202-3/00.
- Gatilho combinado: abrir quando fechar o 2º ou 3º cliente pagante, ou quando uma construtora exigir nota fiscal.

---

## 2. Clientes e projetos

| Cliente | O que é | Status |
|---|---|---|
| Morais Barbershop | Chatbot / automação de atendimento | Entregue, pago |
| Puppy Stop (petshop) | Lead comercial | Esfriou, parado |
| Interativos Construtora (Junior) | **Assistente de obra no WhatsApp** | Protótipo entregue, em teste |
| Chico | Aplicativo | Aguardando parecer do PDF de fases; Guizão tocaria |
| Digitron Balanças | Proposta comercial | Em aberto |
| Joalheria | Site | Lead solto |

### O produto principal (Interativos)
Assistente no WhatsApp para o dono da obra. Ele manda mensagem ou áudio com o que comprou,
gastou ou o que falta, e o sistema organiza em planilhas e envia **resumo semanal e mensal**
com gastos, compras e andamento da obra.

- Junior é padrasto do Lucas → validação fraca, mas é a melhor fonte de indicações.
- Implantação leva ~1 semana (prometer 15 dias úteis).
- Risco do produto: depende da disciplina do dono em alimentar. Pensar em lembretes ativos do bot.

---

## 3. Nicho

**Nicho escolhido (em teste até dezembro/2026):** construtoras e incorporadoras pequenas e médias
que sobem e vendem por unidade, com 1 a 5 obras simultâneas, dono envolvido no operacional e
**sem ERP** (controlam por planilha, caderno e WhatsApp).

O ramo imobiliário entra como **canal de indicação** (amigo "Fola" do ramo), não como segundo produto.

### Posicionamento
> "Um assistente de obra no WhatsApp: você fala, ele organiza gastos, compras e andamento,
> e te manda o resumo da semana."

Nunca falar "IA" ou "automação" com construtor. Falar áudio, planilha, resumo, controle.

### Critério de decisão do nicho
Até o fim de novembro: 40 construtoras contatadas e 8 a 10 reuniões. Em dezembro, decidir com dado.
Expectativa realista: 2 a 4 construtoras fechadas até o fim do ano.

### Regra sobre serviço avulso
Prospecção ativa é 100% nicho. Serviço fora do nicho só se cair no colo E passar em 4 filtros:
entrega em até 2 semanas; não exige o VT aprender nada novo; ticket mínimo; 50% pago antes de começar.
O gargalo da empresa é a capacidade do VT, não a falta de demanda.

---

## 4. Concorrência

Mercado validado e já disputado. Principais:

- **ConstrAI** — o mais parecido. Bot no WhatsApp, custo por unidade, orçado vs. realizado, PDF para investidores. 14 dias grátis.
- **Obra no Bolso IA** (@obranobolsoai) — gastos, tarefas, cronograma e relatórios pelo WhatsApp + painel web.
- **Meu Construtor** — app com IA (texto, áudio, foto de recibo), a partir de R$ 149,90/mês.
- **Prevision (Sienge)**, **Operatop**, **AIRO** — sistemas maiores, mira construtora média/grande.
- Assistentes financeiros genéricos (FalaZuki, ZapGastos, GranaZen) mostram que "bot de gasto no WhatsApp" virou commodity.

**Diferencial da Bevel não é funcionalidade, é modelo:** eles vendem ferramenta para o cliente
configurar sozinho; a Bevel implanta, adapta ao jeito que a construtora já trabalha e acompanha de perto,
com gente local.

### Customização sem matar a escala
Núcleo igual para todos (gastos, compras, andamento, resumos) + módulos sob medida cobrados à parte.
Módulo feito para um cliente vira opção no cardápio para os próximos.

---

## 5. Preços (sugestão ainda não fechada pelos sócios)

| Item | Valor sugerido |
|---|---|
| Implantação (1 obra) | R$ 2.000 |
| Implantação (2 a 3 obras) | R$ 2.500 |
| Mensalidade — 1 obra | R$ 697 |
| Mensalidade — 2 a 3 obras | R$ 1.097 |
| Mensalidade — 4+ | Sob consulta |
| Módulo extra | Mínimo R$ 800 |

**Condição de cliente fundador (Junior):** R$ 1.000 de implantação + R$ 497/obra travado por 12 meses,
em troca de feedback, depoimento e apresentação a pelo menos 3 construtores.

Regras: nunca negociar a mensalidade (ceder na implantação); falar implantação e mensalidade
**juntas, na mesma reunião**; fidelidade de 6 meses na condição de fundador; reajuste anual por IPCA;
mensalidade começa na entrega.

**Pendência crítica:** calcular o custo variável por cliente (API Gemini, Evolution, servidor, número)
para saber o piso de preço. Só o VT tem esse número.

### Pagamentos
Hoje só Pix manual. Recomendado: conta PJ na Cora ou Nubank PJ para o dia a dia + **InfinitePay ou Asaas**
para cobrança recorrente automática (cartão recorrente reduz inadimplência). Tudo exige CNPJ.

---

## 6. Prospecção

Existe uma planilha com 61 construtoras de Curitiba, região metropolitana e litoral
(Guaratuba, Matinhos/Caiobá, Pontal), classificadas por prioridade. 27 são prioridade alta.

Blocos por sócio: Lucas (SJP), Du (Curitiba), Zé (região metropolitana), VT (litoral).

### Ciclo que todos seguem
1. Pesquisar o lead (dono, obra em andamento, telefone, Instagram)
2. Aquecer no Instagram 2 a 5 dias antes
3. Primeiro contato: **ligação** > WhatsApp > direct > LinkedIn
4. Registrar na hora
5. Follow-up em 48h, 5 dias e 15 dias — depois encerra
6. Confirmar a reunião na véspera
7. Conduzir a reunião (quem marcou conduz)

### Reunião: 30 a 40 minutos, uma só
10 min de perguntas → 10 min de demonstração ao vivo (o cliente manda o áudio do celular dele
para o número de demonstração com a obra fictícia) → 5 a 10 min de preço e data.
**Nunca mostrar dados reais da Interativos.**

### Canais, por força
1. Indicação do Junior (muito superior a tudo)
2. Lista de telefones / ligação
3. Placas de obra
4. Instagram (direct começa com pergunta, nunca com oferta)
5. LinkedIn (perfil pessoal, não página; melhor para engenheiros e corretores)

### Estado atual
Algumas ligações feitas, **nenhuma reunião marcada ainda**. As 61 construtoras ainda não viraram
tarefas no ClickUp. Essa é a maior lacuna entre o plano e a execução.

### WhatsApp
Chip separado para prospecção. Aquecer 10 dias. Começar com 5 a 10 mensagens/dia, máximo 20 a 30.
Nunca disparador em massa, nunca mensagem idêntica, sem link na primeira mensagem.

---

## 7. Marketing

Instagram @bevelsystems (perfil genérico de automação, precisa ser repaginado para construtor),
LinkedIn (página com poucos seguidores; alcance está nos perfis pessoais),
landing page em https://lp-steel-pi.vercel.app/ (boa, mas genérica — precisa de versão para o nicho).

Quem aparece em vídeo: VT e Du. Lucas e Zé não aparecem por enquanto.
Lucas não publica nada da Bevel enquanto estiver na Solid Tech (decisão ética dele).

### Conteúdo
3 posts por semana, pelo menos 2 em vídeo. Pilares: demonstração do bot, dor do construtor, prova/case.
**O vídeo mostrando o bot funcionando ainda não existe — é o ativo mais importante que falta.**

### Funil de tráfego pago (desenho acordado)
1. **Topo:** objetivo visualização de vídeo e alcance (NÃO seguidores), Curitiba, região e litoral,
   interesses de construção civil / engenharia / incorporação. R$ 10 a 15/dia, 2 criativos, 4 a 6 semanas.
2. **Meio:** mensagens no WhatsApp + isca de planilha gratuita de controle de obra,
   para quem assistiu 50% dos vídeos, seguidores e visitantes do perfil.
3. **Remarketing:** quem clicou e não falou.

Campanha direta para WhatsApp é conversão, não topo: precisa de **R$ 20 a 25/dia (R$ 600 a 750/mês)**,
2 criativos no mesmo conjunto, 30 dias sem mexer nos primeiros 7.
Expectativa: R$ 40 a 100 por conversa iniciada.

Formulário: o do Meta (instantâneo) gera lead frio; **formulário no site próprio é bom** — 3 perguntas:
quantas obras em andamento, cidade, papel na empresa. Responder em minutos.

---

## 8. ClickUp

Workspace organizado em: Clientes, Espaço da equipe (Metas, Administrativo, Marketing,
Financeiro & Societário, Comercial, Automação & Produto), Templates, Arquivado.

Problemas recorrentes: tarefas sem responsável e sem data; etapas de funil viradas tarefa solta;
tarefas diárias de conteúdo acumulando.

Melhorias combinadas e ainda não feitas: lista "Prospecção | Construtoras" em formato quadro, com a
empresa como tarefa e a etapa como status (Lead → Pesquisado → Contato feito → Em conversa →
Reunião marcada → Proposta enviada → Fechado/Perdido), campos personalizados e tarefas recorrentes.

---

## 9. Decisões já tomadas

- Nicho = construção civil; imobiliário entra como canal, não como produto.
- Prospecção ativa 100% no nicho; avulso só com filtro.
- SaaS não agora: primeiro vender o mesmo serviço para 3 a 5 construtoras.
- Preço só é apresentado na reunião, nunca por mensagem; valor decidido internamente antes.
- Nada de produção para o Chico antes de contrato assinado e primeira parcela paga.
- Tráfego pago só depois do perfil repaginado e do vídeo de demonstração pronto.

## 10. Pendências em aberto

- [ ] Custo variável por cliente (VT)
- [ ] Fechar a tabela de preços entre os quatro
- [ ] Conversa de valores com o Junior ao fim dos ajustes
- [ ] Gravar o vídeo de demonstração do bot
- [ ] Repaginar Instagram e LinkedIn para o nicho
- [ ] Subir as 61 construtoras para o ClickUp e começar a prospecção de verdade
- [ ] Acordo de sócios e abertura do CNPJ
- [ ] Versão da landing page para construtoras
