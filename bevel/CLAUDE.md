# Contexto — Bevel (segundo cérebro)

Esta pasta (`~/Desktop/bevel`) é o **segundo cérebro da Bevel** e também o **cofre do Obsidian**. O Claude é usado em dois lugares que
leem e escrevem as MESMAS notas: o app do Claude (Code) e o plugin **Claudian** dentro do Obsidian. As instruções abaixo valem para os dois.

## Como trabalhar (pedido do Lucas, 24/10/2026)
1. **Antes de responder qualquer coisa sobre a Bevel, consulte as notas.** Comece por `00-Inicio.md` e abra as notas do assunto
   (cliente, área, `Pendencias.md`, `08-Decisoes/`). Não responda só de memória da conversa.
2. **As notas são a fonte da verdade.** O Lucas edita notas direto no Obsidian; se a nota disser algo diferente do que foi falado antes
   na conversa, vale a nota (ou pergunte, se a diferença importar). Se algo conflitar entre notas, aponte.
3. **Tudo que for novo vira registro.** Qualquer informação, decisão, reunião, cliente, número ou ideia que surgir na conversa — aqui ou no
   Obsidian — vai para a nota da área certa, na mesma resposta. Sem perguntar, a não ser que esteja ambíguo.
4. **Ao final de cada resposta em que algo foi salvo**, diga em uma linha quais notas foram criadas ou atualizadas.
5. **Arquivos novos no cofre:** quando o Lucas falar de uma reunião, ata ou documento, procure arquivos novos ou alterados
   (`ls -t` em `_arquivo/` e `09-Reunioes/`) antes de responder, mesmo que ele não avise que colocou algo. Arquivo novo que ainda não
   foi processado → processe (nota da reunião, decisões, pendências) na mesma resposta.
6. Mantenha `00-Inicio.md` ("Onde estamos agora") e o resumo abaixo atualizados quando algo relevante mudar.

## Sessões por setor (24/10/2026)
O contexto de uma conversa tem limite; a memória de longo prazo é este cofre. Por isso o trabalho é dividido em **uma sessão por setor**
(barra lateral do app do Claude, **um grupo por setor**: "Bevel · Geral", "Bevel · Comercial", "Bevel · Clientes", "Bevel · Financeiro e Jurídico", "Bevel · Marketing", "Bevel · Operação e Processos"; títulos "Setor · …", "Cliente · …", "Marketing · …"): **Comercial e Clientes** · **Financeiro e Jurídico** · **Marketing** (ver sessões de tema abaixo) ·
**Operação e Processos** · **Geral** (assuntos que cruzam setores).
- Cada sessão começa lendo este arquivo, `00-Inicio.md` e as notas do seu setor — não precisa do histórico de outras sessões.
- Tudo que for decidido numa sessão é salvo nas notas na hora; as outras sessões e o Claudian veem pelas notas.
- **Sessões por cliente** (título "Cliente · Nome"): cada cliente ativo tem a sua sessão para ir a fundo (EQUIVET, Escolinha do Furacão,
  Interativos/Júnior, Morais Barbershop/Gabe, Digitron/Donato). A nota do cliente em `02-Clientes/` é a âncora: tudo do cliente vai nela
  (e reuniões em `09-Reunioes/` com link). **Cliente novo que avançar para proposta → sugerir uma sessão própria.** Leads frios ficam na sessão Comercial.
- **Sessões de marketing por tema** (grupo "Bevel · Marketing"): **Visão geral** (liga tudo) · **Posicionamento e nicho** · **Tráfego pago** · **Materiais de venda** · **Site e formulário** · **Conteúdo e redes**.
- **Sessão do CRM** ("Setor · CRM", grupo Bevel · Operação e Processos): CRM do Gui (`07-Operacao/CRM-Bevel.md`).
- **Sessões ↔ Jarvis (28/10/2026):** a lista única de sessões do app e abas do Jarvis é `07-Operacao/Sessoes-e-Temas.md`.
  Criou uma sessão no app → acrescentar a linha lá (o Jarvis cria a aba sozinho). Linha com **⏳ pendente** (pedida pelo Jarvis) →
  criar a sessão no app com o título e o grupo da linha (start_session + set_session_title; soltar com detach_session se nascer aninhada;
  move_sessions para o grupo), trocar para ✅ com a data e avisar o Lucas. Fazer isso ao notar pendentes ou quando ele disser
  "cria as sessões pendentes do Jarvis".
- **Assunto novo que não cabe nos setores** (ex.: um projeto grande, um produto novo) → sugerir ao Lucas abrir uma sessão nova para ele
  e criar a pasta/nota correspondente no cofre.
- Quando a conversa estiver longa (contexto acima de ~70%), garantir que tudo foi salvo nas notas e sugerir continuar numa sessão nova do setor.
  Na **Geral**: exportar a conversa para `_arquivo/conversas/`, registrar em `07-Operacao/Conversas-Claude.md` e abrir a próxima
  numerada. **Nome com datas:** a Geral ativa se chama "Bevel · Geral N (desde DD/MM/AAAA)"; ao abrir a próxima, renomear a anterior para
  "Bevel · Geral N (DD/MM a DD/MM/AAAA)" com a data final, e a nova fica "Bevel · Geral N+1 (desde DD/MM/AAAA)". O Claude não vê a % de contexto: o Lucas avisa, ou o Claude sugere quando a conversa estiver muito longa.

## Estrutura
`00-Inicio` (painel) · `01-Empresa` · `02-Clientes` (`Fechados`, `Em-Negociacao`, `Leads`, `Parados-ou-Perdidos` + `Clientes.md`) ·
`03-Produto` · `04-Mercado` · `05-Comercial` (inclui `Roteiros/`) · `06-Marketing` · `07-Operacao` · `08-Decisoes` · `09-Reunioes` ·
`10-Financeiro` · `11-Juridico` · `12-Projetos` (projetos internos, ex.: `Jarvis-Bevel.md`) · `Pendencias.md` · `Templates/` · `_arquivo/` (originais: atas, PDFs, propostas — não editar).

## Regras de registro
- Decisão nova → linha no **topo** de `08-Decisoes/Registro-de-Decisoes.md`, com data absoluta (AAAA-MM-DD).
- Reunião → `09-Reunioes/AAAA-MM-DD-nome.md` (modelo em `Templates/Template-Reuniao.md`) + link na nota do cliente.
- Cliente/lead novo → nota em `02-Clientes/<status>/` (modelo `Templates/Template-Cliente.md`) + linha em `02-Clientes/Clientes.md`.
- Documento recebido (ata, PDF, proposta) → cópia em `_arquivo/` + resumo na nota certa.
- Pendência resolvida → riscar/remover em `Pendencias.md`. Divergência resolvida → remover de `08-Decisoes/Divergencias-a-Resolver.md` e registrar a decisão.
- Links sempre `[[Nome-da-Nota]]` (sem `.md`); nomes de arquivo únicos; datas absolutas, nunca "ontem/amanhã".
- **Grafo por pastas (25/10/2026):** centro `Bevel.md` → uma nota-mapa por pasta com o nome da pasta (`01-Empresa/01-Empresa.md`, `02-Clientes/Leads/Leads.md`, `05-Comercial/Roteiros/Roteiros.md`…). **Nota nova → adicionar `- [[Nota]]` na nota-mapa da pasta dela.** Cliente que muda de status → mover a nota e o link para o mapa da nova subpasta. Depois, rodar `python3 .claude/scripts/gerar_mapa.py` para atualizar o quadro `Mapa-Bevel.canvas` (mapa separado por pasta, sem sobreposição).
- Nunca inventar números ou fatos; marcar `[a confirmar]`. Nunca copiar senhas ou credenciais.
- Não editar `.obsidian/` sem o Lucas pedir.
- **Tarefa para o ClickUp sem acesso ao ClickUp** (ex.: no Claudian) → adicionar linha em `07-Operacao/Fila-ClickUp.md` e avisar o Lucas.
  Numa conversa com acesso ao ClickUp, quando ele pedir "processa a fila do ClickUp", criar as tarefas e marcar ✅ com o link.

## Padrões
- **Todo documento** (proposta, briefing, relatório, planilha, página, PDF) segue o brandkit: `06-Marketing/Identidade-Visual.md`
  (https://bevel-brandkit.vercel.app/). Navy #020B1E, Azul Bevel #0062FC, Azul escrita #4895F6, Tinta #161618, Branco,
  degradê #010D21→#0A42C8; Plus Jakarta Sans 800/700 nos títulos, Inter 400/500 no corpo. Slogan oficial: "Você e a Bevel."
- Material oficial de apresentação: carta de apresentação (`06-Marketing/Carta-de-Apresentacao.md`).
- Processo oficial de venda e entrega: `05-Comercial/Processo-de-Vendas-e-Entrega.md`.
- A Bevel atende o Brasil todo e não faz só automação de WhatsApp (processos, sistemas, apps).

---

## Resumo rápido (posição em 2026-10-24)
- **Empresa:** Bevel Systems — tecnologia para otimizar processos e gargalos (automações, sistemas e apps, IA aplicada).
  4 sócios, 25% cada, todos em CLT: Vitor (VT, dev), Eduardo (Du, marketing/vendas), Arthur (Zé, processos/jurídico/financeiro/propostas),
  Lucas (comercial e contato do cliente). Gui (Guilherme): dev parceiro, não sócio.
- **Fiscal:** sem CNPJ; fatura pelo CPF do Vitor. InfinitePay do Vitor para links de pagamento (19/10). Contas da Bevel acertadas todo dia 1.
- **Clientes fechados:** Morais Barbershop (Gabe, bot no ar; parcelas até 20/12) · Interativos (Júnior, padrasto do Lucas; em teste, sem contrato e sem preço).
- **Em negociação:** EQUIVET (proposta R$ 3.499 + R$ 419,88/mês, aguardando médico/financeiro) · Escolinha do Furacão (Tafarel; proposta apresentada 29/10, em espera até a nova escolinha, jan–fev/2027) ·
  Digitron/Donato · XÁ · Muzão.
- **Nichos (08/10):** construção, imobiliário, industrial — iam ser revistos em 24/10, mas a ata (Du, 25/10) não registrou mudança → seguem valendo.
- **Links:** site **https://www.bevelsystems.com.br/** (domínio próprio, no ar em 29/10; antes lp-steel-pi.vercel.app) · formulário https://bevel-contato.vercel.app (em modo de teste) ·
  WhatsApp (41) 99749-5784 · Bevelsystems@gmail.com · @bevelsystems.
- Reunião de sócios 24/10: `09-Reunioes/2026-10-24-Socios.md` (CRM, formulários, prazos da semana).
- Prioridades: `Pendencias.md` e `08-Decisoes/Divergencias-a-Resolver.md`.
