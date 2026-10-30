# Jarvis da Bevel — assistente por voz do segundo cérebro
#projeto #jarvis #interno

> Projeto interno. Desenho feito na Bevel · Geral 2 em 2026-10-28. Inspiração: vídeo do "Odin" (análise em [[Ferramentas]]).
> Status (2026-10-28): **v0.1 construída e testada, roda pelo plano do Claude do Lucas (sem API, sem custo extra)** — falta só o teste com a voz dele (ver "Como rodar").
> Código: `~/Desktop/jarvis-bevel` (fora do cofre) · guia passo a passo no `LEIA-ME.md` dessa pasta.

## Objetivo
O Lucas **fala** e o Jarvis **responde em voz**, usando o segundo cérebro (este cofre) como memória. Sem digitar e sem ter que escolher a sessão certa: o Jarvis entende o tema e mantém o foco de cada um.

## Decisões do Lucas (2026-10-28)
| Tema | Escolha |
|---|---|
| Onde usar | **Mac primeiro** (roda local, abre no Chrome). Celular numa versão 2 |
| Cérebro | **Claude** (mesmo motor do app: lê e escreve no cofre, segue o `CLAUDE.md`) |
| Ativação | **Atalho e fala** (segurar uma tecla ou clicar no microfone). Palavra de ativação depois |
| Quem constrói | **Claude com o Lucas**, numa sessão própria. VT/Gui revisam se quiserem |
| Ponto de partida | App próprio no estilo do Odin (etapa "só voz no app do Claude" foi pulada) |

## Diferença para o Odin
| | Odin (vídeo) | Jarvis da Bevel |
|---|---|---|
| Cérebro | Gemini via API | **Claude Agent SDK** (mesmo motor do Claude Code) |
| Notas | Copiadas para banco vetorial (RAG), **só leitura** | Lê os arquivos do cofre direto e **escreve** (registra decisão, reunião, pendência) |
| Regras | System prompt próprio | Usa o **`CLAUDE.md`** do cofre (as mesmas regras do app e do Claudian) |
| Foco por tema | Não tem | **Temas** (CRM, cada cliente, marketing…) com conversa própria |
| Ações externas | Pipeline com aprovação humana | Fase 3, sempre com botão de aprovar |

## Como funciona (desenho)
1. **Ouvir:** o Lucas segura a tecla → o navegador transcreve (Web Speech API do Chrome, pt-BR, grátis). Melhoria futura: Whisper, que erra menos nomes (EQUIVET, Tafarel).
2. **Escolher o tema:** palavra no início ("CRM: …", "EQUIVET: …", "Tráfego: …") ou "muda para…". Sem palavra → **Geral**. Fase 2: o Jarvis deduz pelo assunto e confirma.
3. **Pensar:** o Claude roda com a pasta do cofre como base, lê `CLAUDE.md`, `00-Inicio.md` e as notas do tema, responde e registra nas notas (regra 3 do `CLAUDE.md`).
4. **Responder:** resposta completa na tela + **versão falada curta** (2–3 frases) lida em voz alta. Começa com a voz do navegador (grátis, robótica) → trocar por voz natural (OpenAI TTS ou ElevenLabs) `[custo a medir]`.
5. **Mostrar o que salvou:** lista "salvei em…" com link para abrir a nota no Obsidian.

### Temas (substituem a troca manual de sessão)
Cada tema guarda a própria conversa (retomada na próxima vez) e começa lendo a nota-âncora (lista atualizada em "v0.1 — o que foi construído"; os temas espelham as sessões do app):
Geral → `00-Inicio` · CRM → [[CRM-Bevel]] · EQUIVET → [[Equivet]] · Escolinha → [[Escolinha-de-Futebol]] · Digitron → [[Digitron]] · Júnior → [[Interativos]] · Gabe → [[Morais-Barbershop]] · Marketing/Tráfego → [[Trafego-Pago]] · Financeiro → [[Resultado-Acumulado]] · Processo → [[Processo-de-Vendas-e-Entrega]].
As sessões do app do Claude continuam existindo; a memória comum é o cofre.

### Tela (brandkit — [[Identidade-Visual]])
Fundo navy #020B1E · "orbe" no degradê #010D21→#0A42C8 que pulsa ouvindo/falando · tema ativo em destaque · conversa em texto · aviso "✓ salvo" que some + ícone ✓ com o histórico · Plus Jakarta Sans nos títulos, Inter no corpo.

### Segurança
- Escreve **só dentro do cofre**; nunca em `.obsidian/` nem nos originais de `_arquivo/` (regras do `CLAUDE.md`).
- Sem comandos de terminal e sem ações externas no MVP.
- Fase 3: ações fora do cofre (ClickUp, CRM, WhatsApp, e-mail) só com **botão de aprovar** (human in the loop).
- Chaves de API num arquivo `.env` local que **o Lucas preenche**; nunca no cofre nem no código.

## Técnica (proposta)
- **Onde fica o código:** fora do cofre, para não poluir o Obsidian → `~/Desktop/jarvis-bevel` (confirmado pelo Lucas em 2026-10-28).
- **Servidor local** em Node/TypeScript + página web aberta no Chrome (`localhost`).
- **Claude Agent SDK** com a pasta do cofre como diretório de trabalho; ferramentas liberadas: ler, buscar, criar e editar arquivos. Modelo padrão: **Claude Opus 5.5** (`claude-opus-5-5`), escolha do Lucas em 2026-10-28 (Sonnet 5.5 sai pela metade do preço, se o custo pesar).
- Conversa de cada tema salva localmente para retomar.

## Custos
- **v0.1: R$ 0 a mais.** Roda pelo plano do Claude que o Lucas já paga (login do app no Mac). Decisão do Lucas em 2026-10-28: **não pagar API em dólar agora** (US$ 30/mês pesa no momento).
- API da Anthropic (por uso, em dólar) só se o limite do plano não aguentar ou para a versão de vender a clientes.
- Voz natural (fase 2): chave da OpenAI ou ElevenLabs `[custo a medir]` — procurar opção grátis antes.

## Fases
- **v0.1 (MVP):** segurar e falar · Claude no cofre com o `CLAUDE.md` · resposta na tela + voz do navegador · temas por palavra-chave · lista "salvo em".
- **v0.2:** voz natural · Whisper · tema deduzido pelo assunto · histórico por tema na tela.
- **v0.3:** celular (acesso ao Mac pela internet, ex.: Tailscale) · palavra de ativação ("Ei, Bevel") · ações com aprovação (ClickUp/CRM).
- **Depois:** pipeline de prospecção com nota e mensagem pronta ligada ao CRM · versão para vender a clientes ([[Modulos-e-Customizacao]]).

## v0.1 — o que foi construído (2026-10-28)
- **Servidor local** Node/TypeScript (`npm start`, porta 4321, só aceita conexões do próprio Mac) + **página no Chrome** no brandkit (navy, orbe no degradê que pulsa ouvindo/pensando/falando, Plus Jakarta Sans + Inter).
- **Ouvir:** segurar a barra de espaço ou o círculo (clique rápido liga/desliga); Web Speech API do Chrome em pt-BR. Também dá para digitar.
- **Cérebro:** Claude Agent SDK com o cofre como pasta de trabalho; o `CLAUDE.md` vai no prompt a cada pergunta (pega as edições do Lucas na hora).
  Ferramentas: só ler, buscar, criar e editar arquivos. Um **guardião no código** bloqueia qualquer arquivo fora do cofre, escrita em `.obsidian/`, `_arquivo/`, `.claude/` e qualquer outra ferramenta (terminal, internet). Não carrega hooks, plugins nem MCP.
- **Resposta:** completa na tela + versão falada curta (2–3 frases, voz do navegador; prefere a voz "Luciana" do Mac). Botão "Ouvir de novo".
- **Voz (2026-10-28, pedido do Lucas):** escolha da voz e da velocidade no painel da direita ("Testar voz"); fica salvo no Chrome. Vozes grátis do Mac: Luciana, Eddy, Flo, Reed, Rocko, Sandy, Shelley… Vozes "Melhorada/Premium" baixadas no Mac aparecem primeiro. **Lucas não gostou de nenhuma das vozes padrão (2026-10-28)** → tentar a Luciana Premium (grátis, baixada no Mac); se o Chrome não mostrar, fazer o Jarvis falar pela voz do Mac direto (comando `say`). Voz paga (ElevenLabs/OpenAI) fica para depois, por causa do custo em dólar. **Lucas instalou a Fernanda (Aprimorada)** no Mac em 2026-10-28 (Ajustes → Acessibilidade → Leitura e Fala → ⓘ do Leitor → Voz). O Chrome **não mostra** vozes Aprimoradas → o Jarvis passou a falar também pela **voz do Mac** (comando `say` no servidor; lista "Vozes do Mac" com ★ nas naturais, Esc cala). Vozes da Siri não funcionam fora dos apps da Apple.
- **Temas:** palavra no início da fala (aceita erros comuns de transcrição: "equivete", "gabi", "digitrom"…), "muda para X" fixa o tema, clique no tema fixa/solta. Sem palavra → Geral. Cada tema guarda a sua conversa (retoma na próxima vez); botão "Nova conversa neste tema".
- **Documentos (2026-10-28, pedido do Lucas):** arrastar PDF/foto/texto na tela ou clicar no 📎 → o arquivo vai para `_arquivo/` (com data no nome, sem sobrescrever) e segue junto com a próxima fala; o Jarvis lê e processa pelas regras do CLAUDE.md. Testado com um PDF (leu certo). Aceita PDF, imagens, TXT/MD/CSV até 30 MB; .docx ainda não.
- **Barra lateral de temas = barra do app do Claude (pedido do Lucas, 2026-10-28):** os temas do Jarvis agora são as mesmas sessões, nos mesmos grupos: **Geral** · **Comercial** (Comercial e Clientes) · **Clientes** (EQUIVET, Escolinha do Furacão, Digitron (Donato), Interativos (Júnior), Morais Barbershop (Gabe)) · **Marketing** (Visão geral, Posicionamento e nicho, Tráfego pago, Materiais de venda, Site e formulário, Conteúdo e redes) · **Financeiro e Jurídico** · **Operação e Processos** (Operação e Processos, CRM). Lista simples no estilo do Obsidian, grupos com ▸/▾; o tema em uso fica destacado com barra azul e um **ponto azul pulsando enquanto o Jarvis trabalha nele**; o grupo dele abre sozinho. ↺ ao lado do tema ativo = nova conversa. Cada tema tem nota-âncora e assunto próprios para a escolha automática (ex.: Instagram → Conteúdo e redes, site/formulário → Site e formulário, Guto → Comercial). O antigo tema "Marketing" virou "Tráfego pago" (conversa e histórico mantidos). **Sessão nova no app → acrescentar o tema em `src/temas.ts`.**
  - **Feito (2026-10-28):** tema **Ortech (Guto)** no grupo Clientes, âncora [[Ortech]]; "Guto", "Augusto", "Ortech", "Comunique" e "Acessórias" vão direto para ele.
- **O Jarvis cria temas sozinho (pedido do Lucas, 2026-10-28):** quando o Lucas pede uma aba/tema novo, ou um cliente avança para proposta, o Jarvis cria a nota (se faltar) e usa a ferramenta `criar_tema` (nome, grupo, nota-âncora, nomes que identificam, assunto). O tema aparece na hora na barra e entra na escolha automática.
- **Tela atualiza sozinha (pedido do Lucas, 2026-10-29):** a página confere a cada 4 s se algo mudou (aba nova vinda do app ou criada pelo Jarvis, resposta nova) e redesenha só quando muda, sem F5. Não atualiza no meio de uma resposta nem enquanto ele ouve. Testado: linha nova na lista → aba apareceu em segundos.
- **Trilha ao vivo (pedido do Lucas, 2026-10-29):** embaixo do círculo aparece o que o Jarvis está fazendo agora e em qual pasta, ex.: "📖 Abrindo 📁 Clientes › 📁 Em Negociacao › Ortech" ou "🔎 Procurando "proposta" em 📁 Comercial". O painel da direita ("Caminho desta resposta") guarda todos os passos da resposta, em ordem, com link para abrir cada nota no Obsidian. Fica visível enquanto ele fala.
- **App e Jarvis com a mesma lista (pedido do Lucas, 2026-10-28):** a lista única de sessões do app e abas do Jarvis é [[Sessoes-e-Temas]].
  - Sessão nova criada no app → linha na lista (✅) → o Jarvis lê a lista a cada pergunta e cria a aba sozinho.
  - Aba nova pedida ao Jarvis por voz → ele cria a aba e acrescenta a linha com **⏳ pendente** → o Claude do app cria a sessão no grupo certo na próxima conversa no app (ou quando o Lucas disser "cria as sessões pendentes do Jarvis") e marca ✅. O Jarvis não cria sessões no app sozinho (só o app tem essa ferramenta).
  - Regra registrada no `CLAUDE.md` ("Sessões ↔ Jarvis"). Testado nos dois sentidos com linhas de teste (apagadas depois).
  - Sessão **Cliente · Ortech (Guto)** criada no grupo Bevel · Clientes do app em 2026-10-28. Testado: "cria uma aba Construtoras no Comercial" → criada e usada na pergunta seguinte (aba de teste apagada depois).
- **Escolha de tema mais esperta:** a fala atual manda mais que a anterior (citar outro cliente troca de tema) e cliente sem tema próprio vai para Comercial. Motivo: a pergunta sobre o PDF da Ortech tinha ficado no tema CRM só porque a conversa anterior era de CRM.
- **Velocidade (2026-10-28, pedido do Lucas "demora muito"):** medido antes: voz começava em ~10–23 s (escolha do tema 5–6 s + 1–2 idas ao modelo só para ler notas + voz só depois do texto inteiro). Mudanças, sem trocar o cérebro:
  - **Fala primeiro e em tempo real:** a versão falada é a 1ª linha da resposta e começa a ser lida assim que fica pronta; o texto da tela aparece enquanto é escrito.
  - **Notas principais já no prompt:** CLAUDE.md, 00-Inicio e a nota-âncora vão prontas (versão atual a cada pergunta) → sem idas ao modelo só para ler.
  - **Tema em paralelo:** quando não há pista, o Jarvis já começa a responder no tema anterior enquanto escolhe o tema; se confirmar, ganha os ~6 s; se não, cancela sem ter escrito nada (escrita só liberada depois da confirmação) e responde no tema certo.
  - Medido depois: pergunta direta → **voz em ~3 s** (Opus); continuação sem pista → **~7 s** (antes 13,5 s); troca de tema sem pista → ~16 s; quando ele decide consultar o CRM, ~16 s.
  - **Modo rápido opcional (botão 🧠 Calmo / ⚡ Rápido ao lado do campo):** Sonnet 5.5 com menos esforço, só quando o Lucas liga. Mesma pergunta: **voz em 1,7 s e fim em 6,9 s** (Sonnet) × 2,8 s e 8,1 s (Opus). O padrão continua Opus (escolha do Lucas).
  - O log do Jarvis (janela do Terminal) mostra a linha do tempo de cada resposta (`[tempo] …`).
- **Tema automático pelo assunto (pedido do Lucas, 2026-10-28):** sem palavra-chave, o Jarvis escolhe o tema sozinho. Ordem: correção ("não, é CRM") > palavra-chave no início > tema fixado na tela > assunto. Nomes óbvios decidem na hora (Gabriele/Monika → EQUIVET, Tafarel → Escolinha, Donato → Digitron, Gui → CRM, Gabe → Gabe…); senão um modelo rápido (Claude Haiku 5.5) classifica em ~6 s, levando em conta a fala anterior ("e quando vence?" fica no mesmo tema). Na dúvida → Geral. A tela mostra "Indo para EQUIVET" e a fala começa com "Em EQUIVET." quando o tema muda. "Não, é CRM" refaz a última pergunta no tema certo sem duplicar registros. Testado: Gabriele → EQUIVET, "não, é CRM" → CRM, "quanto recebemos" → Financeiro.
- **Conversa nova automática (2026-10-28):** depois de cada resposta o Jarvis mede o tamanho da conversa do tema (tokens). Passou do limite → pede ao Claude para conferir se tudo está nas notas e salvar o que faltar, zera a conversa e avisa ("A conversa de EQUIVET ficou longa: vou conferir as notas e começar uma nova"); a próxima pergunta espera a conferência e começa lendo as notas. **Limite: 200 mil tokens** (`JARVIS_LIMITE_CONVERSA` no `.env`), em vez de 70% da janela: a janela do Opus 5.5 é de 1 milhão e 70% (700 mil) deixaria cada resposta lenta e gastaria muito do limite do plano. Testado com limite baixo: conferiu, não mexeu em notas sem necessidade e zerou as conversas.
- **Notas salvas (visual limpo, pedido do Lucas em 2026-10-28):** sem painel fixo. Depois de uma resposta que salvou algo aparece um aviso azul que some em 3 s ("✓ Salvo em Escolinha de Futebol" ou "✓ 3 notas atualizadas"). Para consultar, o ícone **✓ N** no topo abre a lista do tema (nome curto + hora, link para o Obsidian), fechada por padrão. Documentos gerados ficam só no botão embaixo da resposta.
- **Documentos em PDF no brandkit (2026-10-28):** pedir "me faz um resumo em PDF de…" → o Jarvis copia o modelo `jarvis-bevel/documentos/_modelo.html` (capa no degradê com o logo, números em destaque, tabelas, etiquetas, rodapé "Você e a Bevel.") e cria `documentos/AAAA-MM-DD-nome.html`; a tela mostra **"📄 Abrir / Salvar em PDF"** (impressão do Chrome em A4). Ele só pode criar `.html` nessa pasta (fora do cofre). Testado: "resumo de todos os leads e clientes" → 17 contatos (2 fechados, 6 em negociação, 6 leads, 3 parados), ~1 min.
- **GitHub privado (2026-10-30, pedido do Lucas):** o cofre `bevel/` (com `_arquivo/` e `.obsidian/`) e o `jarvis-bevel/` foram juntados num repositório git (histórico em `~/.bevel-github`, cobre só essas duas pastas da Mesa) para https://github.com/jeflucas199-debug/Jarvis-bevel. Ficam de fora: `.env` (acesso ao CRM), `node_modules/`, `data/` e os `workspace.json` do Obsidian. Conferido antes: nenhuma senha/chave nas notas. Enviar: dois cliques em `jarvis-bevel/Enviar para o GitHub.command` (1ª vez pede usuário + token do GitHub; passo a passo no LEIA-ME). **Vercel para o time ter contexto:** em avaliação — o cofre tem dados de clientes e contratos, então um site na Vercel precisa de senha/login antes de ir ao ar; o caminho imediato é convidar os sócios e o Gui como colaboradores no GitHub privado.
- **Visual novo e cancelar gravação (pedido do Lucas, 2026-10-29):** a bola com o quadrado virou uma **esfera de partículas** ligadas por filamentos (referência mandada pelo Lucas), desenhada em `public/esfera.js`: gira devagar parada, treme ouvindo, gira rápido pensando e **pulsa como um coração (tum-tum) enquanto fala**, com batida extra a cada palavra nas vozes do Chrome. Leve (~0,5 ms por quadro). Botão **✕ Cancelar gravação** (ou **Esc**) enquanto ouve: descarta o que foi falado e não envia. Testado no navegador. **Mesmo dia:** o Lucas não gostou da esfera → o padrão virou um **rosto** (cabeça redonda no degradê da marca, olhos e boca em luz azul): pisca parado, olhos arregalados e boca em "o" ouvindo, olhos semicerrados olhando para os lados pensando, olhos sorrindo e boca mexendo falando, com a cabeça **batendo como coração (tum-tum)**; o olhar segue o mouse. A esfera ficou como opção no painel da direita (**Visual: 🙂 Rosto / 🌐 Esfera**). **Ainda em 2026-10-29:** o rosto virou um **crânio holográfico** (referência do Lucas: cabeça em linhas azuis dentro de anéis de HUD), menos sério: contorno do crânio com fones nas laterais e linhas de circuito, **sobrancelhas neutras**, leve sorriso e **íris que seguem o mouse**; anéis giram devagar (rápido ouvindo/pensando), pisca parado, olha para os lados pensando, boca abre e fecha e o holograma bate como coração falando. **Versão final do dia (o Lucas achou o crânio "horrível" e pediu mais realista, sério, juntando a ideia das teias):** **holograma 3D de uma cabeça humana** feito de ~3.000 partículas ligadas por teias (`public/holograma.js`, gerado por código, sem modelo baixado), com luz de relevo (nariz, lábios, queixo, orelhas), olhos de luz, linha de varredura descendo, HUD com marcações e arcos girando, rótulos "JARVIS · BEVEL SYSTEMS" e o estado (SISTEMA ONLINE / OUVINDO / PROCESSANDO / RESPONDENDO), base projetora com feixe e grade técnica no fundo. A **cabeça vira para o mouse**; pensando, olha para os lados; falando, a **boca mexe** e tudo **pulsa como coração**, com ondas saindo a cada batida; ouvindo, uma onda em volta reage ao volume da voz. Opções em "Visual": 🧠 Holograma (padrão) / 🌐 Esfera. **Ajuste (Lucas: "muita teia, deixe mais natural"):** ~4.600 partículas mais finas, só 2 ligações por ponto e teias bem mais fracas, sem os aglomerados no nariz e na boca; o rosto se forma pela luz de relevo. **Versão atual (2026-10-29, referências do Lucas: holograma azul que se desfaz em partículas + malha de reconhecimento facial + esfera de energia):** rosto humano em **superfície azul sombreada com malha fina** (luz que acompanha o giro), o **lado direito se desfaz em partículas** que voam, **triangulação do reconhecimento facial** (olhos, sobrancelhas, nariz, boca, queixo) com nós acesos, **esfera de energia** de arcos de luz em volta, e no fundo **rede de pontos** e **números de dados** subindo. Mantidos: cabeça seguindo o mouse, olhos de luz, boca mexendo e pulso de coração falando, onda da voz ouvindo, arco de processamento pensando. ~4 ms por quadro. Versões anteriores (partículas; meio humano/meio máquina) guardadas fora do projeto, só como rascunho.
- **Google Drive, só leitura (2026-10-29):** o Lucas instalou o **Google Drive para computador** (conta jeflucas199). O Jarvis procura, a cada pergunta, a pasta compartilhada **"Bevel"** (dona: bevelsystems; tem `Clientes/`, `Marketing & IDV/`…) em `~/Library/CloudStorage/GoogleDrive-…/Meu Drive/Bevel` e pode **ler, buscar e listar** lá dentro; escrever é bloqueado (o que importar vira resumo numa nota do cofre). Arquivos `.gdoc/.gsheet` são só atalhos sem conteúdo (precisa exportar em PDF). Testado o bloqueio (ler ✅, escrever ⛔). **Atalho criado pelo Lucas em 2026-10-29** e **testado** (Jarvis de teste): "entra na pasta da Ortech no Drive e vê se o Zé colocou os documentos do Guto" → achou `Clientes/Ortech - Gutão` com 2 PDFs (briefing e relatório) e listou o que o Guto ainda não mandou, ~1 min, sem salvar nada. O Jarvis do dia a dia passa a ler o Drive depois de ser reaberto uma vez.
- **CRM ao vivo, só leitura (2026-10-28):** o Gui mandou um **acesso direto ao banco do CRM com usuário só leitura** (Postgres/Neon), em vez do token. O Jarvis ganhou a ferramenta `consultar_crm`: só aceita SELECT/WITH, roda em transação READ ONLY com limite de 15 s e 200 linhas. O endereço fica **só no `.env` do Jarvis** (`JARVIS_CRM_BANCO`), nunca no cofre. **Ligado e testado em 2026-10-28:** "CRM, quantos leads por etapa?" → 6 leads (Promessa 3 · R$ 13.500; Agendado 1 · R$ 3.500; Follow-up pós-reunião 1 · R$ 10.000; Novo 1), ~18 s, e ainda comparou com a nota de 25/10. Como o endereço passou pelo chat, recomendado pedir ao Gui para **trocar a senha** do usuário de leitura e colar a nova direto no `.env`.
 com as notas que o Write/Edit realmente alterou (link abre no Obsidian) + painel "Agora" com o que ele está lendo/salvando ao vivo.
- **Conta:** sem chave da API, usa o **login do Claude Code do Mac (plano do Lucas)** — sem cobrança extra, gasta o limite de uso do plano. Com chave no `.env`, passa a cobrar por uso e mostra o custo de cada resposta (teto de US$ 1,50 por pergunta).

### Testes feitos (2026-10-28, pelo Claude, com o login do Claude Code no lugar da chave)
- Pergunta "Equivete, em que pé está a proposta e qual o valor?" → tema EQUIVET certo, leu a nota, respondeu com valores e prazos; **32 s, US$ 0,14**.
- Pergunta seguinte no mesmo tema ("e qual foi a diferença de valor que você comentou?") → lembrou da conversa.
- Escrita: criou uma nota de teste e ela apareceu no "Salvo em" (nota apagada depois).
- Guardião: negou `/etc/hosts`, `../fora-do-cofre.txt`, `.obsidian/`, `_arquivo/`, busca em `/Users` e terminal; liberou notas do cofre.
- Tela: tema, progresso ao vivo, resposta, voz e "Salvo em" funcionando no navegador.
- **Não testado:** o microfone (o Claude não tem microfone) — é o primeiro teste do Lucas.
- Custo estimado se fosse pela API: US$ 0,08 a 0,14 por pergunta (Opus 5.5). **Não se aplica no modo plano** (o Lucas não paga a mais).
- Teste sem chave nenhuma (2026-10-28): "Gabe, até quando vão as parcelas?" → respondeu certo pelo plano do Claude.
- **Primeiro uso real do Lucas por voz: deu certo** (2026-10-28).

## Como rodar
1. Nada a configurar: o app do Claude do Mac só precisa estar logado na conta do Lucas. Guia no `LEIA-ME.md`.
2. Clicar duas vezes em **`Abrir Jarvis.command`** (pasta `jarvis-bevel` na Mesa) → abre o Chrome em http://localhost:4321. Permitir o microfone.
3. Segurar espaço, falar, soltar. Para desligar: fechar a janela do Terminal.

## Limitações conhecidas da v0.1
- **Memória:** não "decora" o cofre. A cada pergunta lê o `CLAUDE.md` e abre as notas que precisa (sempre a versão atual). Lembra a conversa de cada tema; **não vê as conversas do app do Claude** — só o que elas salvaram nas notas.
- Mesmo cérebro do app (Opus 5.5, mesmas regras), mas só mexe no cofre: sem ClickUp, Gmail, internet ou terminal.
- Respostas: voz em ~3–7 s nas perguntas diretas; 15–20 s quando precisa consultar CRM/várias notas ou quando o tema muda sem pista.
- Não roda o `gerar_mapa.py` (sem terminal): quando criar nota nova, o mapa do canvas fica para uma sessão do app.
- Se o Lucas e outra sessão editarem a mesma nota ao mesmo tempo, vale a última gravação.
- Usa o mesmo limite de uso do plano que as sessões do app: dia de muito uso no app → menos perguntas no Jarvis. Trocar para Sonnet 5.5 (`JARVIS_MODELO` no `.env`) gasta menos do limite.
- Modo plano é **só para uso pessoal do Lucas**. Até onde sei, a Anthropic não permite oferecer o login de assinatura do Claude num produto para outras pessoas: a versão para vender a clientes teria que usar a API (paga) `[confirmar nos termos antes de vender]`.

## O que falta para a v0.2
- **Voz natural** (OpenAI TTS ou ElevenLabs) e falar enquanto ainda escreve (streaming), para cortar a espera.
- **Whisper** na transcrição (erra menos EQUIVET, Tafarel, Donato).
- **Sócios usando o Jarvis** (pergunta do Lucas, 2026-10-28): **não dá para só subir na Vercel** — o Jarvis precisa do cofre (arquivos no Mac do Lucas) e do login do Claude do Lucas, que não pode ser dividido com outras pessoas. Caminhos futuros: (a) cada sócio roda no próprio Mac com o próprio plano do Claude + cofre sincronizado (ex.: Git ou Obsidian Sync); (b) versão hospedada com login por sócio, cofre na nuvem e API paga. Decidir junto com a fase 3.
- **Ver o CRM do Gui ao vivo** (pedido do Lucas, 2026-10-28): hoje o Jarvis não tem internet e o CRM (prospeccao-two.vercel.app) só mostra os dados num navegador, então ele responde pela nota [[CRM-Bevel]] (última conferência). **Estudo (2026-10-28):** o CRM tem login (e-mail + senha, com opção de 2FA) e puxa tudo de uma API própria (`/api/leads`, `/api/sales`, `/api/contracts`, `/api/events`, `/api/sellers`…); sem login todas respondem 401.
  - **Resolvido em 2026-10-28:** o Gui mandou um usuário só leitura do banco (ver "CRM ao vivo" acima). Limite que continua: "o que o Gui falta arrumar" é sobre funções do site → checklist em [[CRM-Bevel]].
- Histórico por tema mais completo na tela (busca, abrir conversas antigas).
- Medir na 1ª semana se o limite do plano aguenta o uso; se não, decidir Opus 5.5 × Sonnet 5.5.
- Fase 3 continua igual: celular, "Ei, Bevel", ações com botão de aprovar.

## Próximos passos
- [x] ~~Chave da API~~ — dispensada: roda pelo plano do Claude (decisão do Lucas, 2026-10-28)
- [x] Construir a v0.1 (2026-10-28)
- [x] Lucas: primeiro teste com a voz — deu certo (2026-10-28)
- [ ] Testar uma semana e medir uso do limite do plano e erros de transcrição

## Como o Jarvis, o app do Claude e o Obsidian se entendem (2026-10-28)
- Os três usam a **mesma pasta** (`~/Desktop/bevel`) e as **mesmas regras** (`CLAUDE.md`). Não conversam entre si diretamente: **o cofre é a memória comum**. O que um salva numa nota, os outros veem na próxima vez que leem.
- **O que não passa de um para o outro:** a conversa em si. Só passa o que foi **escrito nas notas**, por isso a regra 3 (tudo que é novo vira registro).
- Ninguém "vê" mudança em tempo real: cada um lê as notas no momento em que vai responder (regra 5: procurar arquivos novos).
- Exemplo (28/10): o Lucas mandou a proposta da Escolinha pelo Jarvis → ele salvou o PDF em `_arquivo/` e o resumo + revisão em [[Escolinha-de-Futebol]] → a Geral 2 leu de lá.
- Cuidado: dois editando a **mesma nota ao mesmo tempo** pode sobrescrever um ao outro (raro). Se acontecer, o Obsidian tem histórico de versões do arquivo.

## Próximas ideias do Lucas (2026-10-29) — a priorizar
Pedido: "futuramente todos os sócios usarem" e "infinitas possibilidades" (mandar doc no WhatsApp, colocar coisas no CRM). Análise da Geral 2:
| Ideia | Dá? | Como | Cuidado |
|---|---|---|---|
| **Escrever no CRM** ("cria o lead X", "marca a tarefa como feita") | Sim | Pedir ao Gui **rotas de API** do CRM para criar/editar (melhor que escrever direto no banco) | Botão **Aprovar** antes de gravar; registrar na nota |
| **Mandar doc/mensagem no WhatsApp** (ex.: resumo para o Guto) | Sim | Pela **Evolution API** num número da Bevel (a mesma tecnologia dos bots dos clientes) | Sempre com **prévia + Aprovar** (destinatário, texto, anexo); risco de bloqueio do número (Evolution não é oficial) → usar número próprio da Bevel, nunca o pessoal |
| **Falar com o Jarvis pelo WhatsApp** (áudio no celular) | Sim | Mesmo número: o Jarvis recebe o áudio, transcreve, responde em texto/áudio | Resolve o uso no celular (v0.3) sem abrir o Mac de fora; só números autorizados |
| **Os 4 sócios usarem** | Sim, com mudanças | Jarvis num **servidor** (não no Mac do Lucas), cofre sincronizado (ex.: Git), login por sócio e cada ação assinada ("Du pediu…") | Hoje usa o **login do plano do Lucas**, que é pessoal: para 4 pessoas, usar **chave da API** (custo por uso, sai do caixa) ou cada um no seu plano; edição simultânea do mesmo arquivo |
Ordem sugerida: CRM (interno, baixo risco) → WhatsApp com aprovação → Jarvis pelo WhatsApp → servidor para os 4 sócios.

### Hospedagem para os 4 sócios (análise da Geral 2, 2026-10-29) — só ideia, nada aplicado
- **O que o servidor precisa rodar:** o servidor Node do Jarvis + o Claude Code (o Agent SDK abre um processo do Claude por pergunta, ~0,3–0,5 GB de RAM cada) + uma cópia do cofre. Voz (microfone e fala) roda no navegador de cada um, e o CRM está no Neon (fora) → o servidor não precisa de GPU nem de muito disco.
- **Tamanho sugerido:** 2 vCPU e 4 GB de RAM no mínimo; **8 GB** com folga para 4 pessoas ao mesmo tempo + n8n/Evolution, se forem juntos.
- **2026-10-29 (Lucas):** o **Vitor já paga uma Hostinger VPS** `[confirmar plano e se cabe o Jarvis]`. Domínio da Bevel já existe: **bevelsystems.com.br** → o Jarvis pode ficar em `jarvis.bevelsystems.com.br`.
- **Sugestão:** **Hostinger VPS (plano KVM 2: 2 vCPU / 8 GB)** com servidor no Brasil — a proposta da Escolinha já cita Hostinger, então provavelmente é onde o VT roda o n8n/Evolution `[confirmar com o VT]`. Um painel só, mesma conta. Alternativas: DigitalOcean ou AWS Lightsail (região São Paulo, mais caros) · Hetzner (barata, mas sem servidor no Brasil). Preços `[conferir na hora de contratar]`.
- **O que muda para hospedar:**
  1. **Cérebro:** sai o login do plano do Lucas (pessoal) → **chave da API da Anthropic** da Bevel, paga por uso, com limite mensal no console.
  2. **Cofre sincronizado:** o cofre vira um repositório Git privado; o servidor e o Obsidian de cada sócio sincronizam por ele (plugin Obsidian Git).
  3. **Acesso seguro:** domínio com HTTPS (ex.: jarvis.bevelsystems.com.br) e login por sócio; cada pedido fica assinado ("Du pediu…").
  4. **Chaves** (API, CRM) só no `.env` do servidor.

### Como sincronizar o cofre e juntar com o do Zé (análise da Geral 2, 2026-10-29) — só ideia
- **Sincronizar (recomendado): Git privado no GitHub.** Cofre vira um repositório privado da Bevel → cada sócio instala o plugin **Obsidian Git** (salva e puxa sozinho a cada poucos minutos) → o servidor do Jarvis faz o mesmo. Grátis, guarda histórico de tudo (dá para voltar qualquer versão) e avisa quando dois mexem na mesma nota.
- Alternativas: **Obsidian Sync** (pago, mais simples para quem não é técnico, mas o servidor do Jarvis não se liga nele com facilidade) · Google Drive/iCloud (não recomendado: conflitos e arquivos "precisam ser baixados").
- **Juntar com o segundo cérebro do Zé: dá, e é o ideal** — um cofre da Bevel só, para os 4. Passo a passo: (1) o Zé manda uma cópia do cofre dele (zip) → (2) o Claude compara nota por nota: o que já existe aqui é cruzado, o que é novo entra na pasta certa, o que conflita vai para [[Divergencias-a-Resolver]] → (3) notas pessoais do Zé ficam fora → (4) a partir daí todo mundo usa só o cofre da Bevel. Parte do cofre do Zé já entrou em 07/10 (`_arquivo/contexto-arthur-2026-10-07.md`).
- Ordem: juntar o cofre do Zé **antes** de ligar o Git, para começar já com uma base única.

### Custo estimado para os 4 sócios (Geral 2, 2026-10-29) — estimativa, conferir antes de contratar
| Item | Custo/mês | Base |
|---|---|---|
| VPS | **R$ 0 extra** se couber na Hostinger que o Vitor já paga · senão KVM 2 (2 vCPU/8 GB) ~R$ 35–39 em promoção com contrato longo, ~R$ 70 na renovação | blogs/agregadores out/2026, não é a página oficial `[conferir no checkout]` |
| Git (GitHub privado) | **R$ 0** | plano Free: repositórios privados com colaboradores ilimitados |
| Domínio | **R$ 0 extra** | bevelsystems.com.br já existe |
| Voz (navegador) | **R$ 0** | voz natural paga fica para depois |
| **API do Claude** | **o maior custo — depende do uso** | medido no Jarvis: US$ 0,08–0,14 por pergunta no Opus 5.5; Sonnet 5.5 ~metade |
Cenários da API (22 dias úteis): **leve** 4 sócios × 10 perguntas/dia ≈ 880/mês → Opus ~US$ 70–125 · Sonnet ~US$ 35–60. **Intenso** 4 × 20/dia ≈ 1.760/mês → Opus ~US$ 140–245 · Sonnet ~US$ 70–125. Em reais: × cotação do dólar + IOF do cartão `[conferir]`. Medidas para baixar: modo rápido (Sonnet) como padrão e Opus só sob pedido; limite mensal no console da Anthropic.

### Como baixar o custo (Geral 2, 2026-10-29) — ideias, nada aplicado
1. **Cada sócio roda o Jarvis no próprio Mac, com o próprio plano do Claude** (como o Lucas faz hoje): API sai de cena e o servidor deixa de ser necessário; o cofre sincroniza pelo Git. Custo extra ≈ R$ 0 para quem já tem plano `[confirmar quem dos sócios tem plano do Claude]`. Contra: não funciona pelo celular/WhatsApp sem o Mac ligado.
2. **Modelo certo para cada pergunta:** Haiku 5.5 para consultas simples ("qual o valor da EQUIVET?"), Sonnet 5.5 como padrão, Opus 5.5 só quando pedir. É a maior economia se ficar na API.
3. **Cache do que se repete:** `CLAUDE.md`, painel e notas do tema vão em toda pergunta → com cache de prompt, a parte repetida custa bem menos.
4. **Ler menos:** um resumo curto por tema (ficha do cliente) para ele abrir 1 nota em vez de várias; um `CLAUDE.md` enxuto só para o Jarvis.
5. **Conversas mais curtas:** baixar o limite de 200 mil tokens por tema (cada pergunta reenvia o histórico) e respostas mais curtas.
6. **Limite mensal** no console da Anthropic para nunca passar do combinado.
Recomendação: começar pela opção 1 (custo ~zero) e só ir para servidor + API quando precisarem do celular/WhatsApp — já com 2 a 5 aplicados. Medir o custo real antes de decidir.

### Plano: todos rodando o mesmo Jarvis com o cofre no Git (Geral 2, 2026-10-29) — viável, nada aplicado
Ideia do Lucas: juntar o cofre dele com o do Zé e os 4 sócios usarem o Jarvis do mesmo jeito que ele.
1. **Juntar os cofres** (Lucas + Zé) num cofre único da Bevel (passo a passo na seção de sincronização acima).
2. **Dois repositórios privados no GitHub da Bevel:** `bevel-cofre` (as notas) e `jarvis-bevel` (o código do app; atualização chega a todos com um "puxar").
3. **Em cada Mac:** Obsidian + plugin Obsidian Git apontando para o `bevel-cofre` · Claude Code instalado e logado no **plano de cada sócio** · cópia do `jarvis-bevel` + `.env` próprio · atalho "Abrir Jarvis".
4. **Ajustes no Jarvis:** puxar o cofre antes de responder e enviar logo depois de salvar (evita conflito) · registrar quem pediu ("Zé registrou…") · cada um com seu tema fixado e suas conversas.
5. **Ajustes no `CLAUDE.md`:** hoje fala "o Lucas" → passar a valer para qualquer sócio.
6. **Credenciais:** o acesso de leitura do CRM vai para o `.env` de cada um por um canal seguro (nunca pelo chat nem no cofre).
Pré-requisitos a confirmar: cada sócio tem Mac? (o atalho é de Mac; Windows precisa de adaptação) · cada um tem plano do Claude?
