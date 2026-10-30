# Jarvis da Bevel — v0.1

Você fala, o Jarvis responde em voz e registra no segundo cérebro (`~/Desktop/bevel`).
Desenho e decisões: nota `12-Projetos/Jarvis-Bevel.md` no cofre.

## Quanto custa

**Nada além do seu plano do Claude.** Sem chave da API, o Jarvis usa o login do app do Claude deste Mac.
Cada pergunta gasta um pouco do limite de uso do plano (o mesmo das conversas no app). Se bater no limite, ele avisa e volta a funcionar quando o limite renova.
O app do Claude precisa estar logado na sua conta.

(Opcional, só se um dia quiser pagar por uso: chave da API em `.env` — veja o `.env.example`.)

## Para usar (todo dia)

1. Clique duas vezes em **`Abrir Jarvis.command`**. Abre uma janela do Terminal (deixe aberta) e o Chrome em http://localhost:4321.
   - Se o Mac disser que o arquivo é de "desenvolvedor não identificado": clique com o botão direito → **Abrir** → **Abrir**.
2. Na primeira vez, o Chrome pede o microfone: clique em **Permitir**.
3. **Segure a barra de espaço** (ou a esfera), fale e solte. Também dá para digitar.
   - Errou ou precisou parar? Aperte **Esc** ou clique em **✕ Cancelar gravação** (embaixo da esfera): nada é enviado.
   - O holograma da cabeça vira para o mouse, reage à sua voz ouvindo, olha para os lados pensando e, falando, mexe a boca e **pulsa como um coração**. No painel da direita, "Visual" troca para a esfera de partículas.
4. Para desligar: feche a janela do Terminal.

## Ver o que ele está fazendo

- Embaixo do círculo aparece o passo de agora: o que ele está abrindo ou procurando e em qual pasta (📁 Clientes › 📁 Em Negociacao › Ortech).
- À direita, "Caminho desta resposta" mostra todos os passos; clique numa nota para abrir no Obsidian.
- A tela se atualiza sozinha (abas novas, respostas): não precisa dar F5.

## Mandar documentos (PDF, foto, texto)

1. **Arraste o arquivo para a tela do Jarvis** (ou clique no 📎 ao lado do campo de texto).
2. Ele sobe na hora para a pasta `_arquivo/` do cofre, com a data na frente do nome.
3. Fale ou digite o que quer: "**Geral**, esse é o resumo da mentoria de ontem. Registra e me dá dicas."
   Se não disser nada e só apertar **Enviar**, ele lê, registra e diz o que achou.
4. Ele lê o documento, cria a nota da reunião, coloca decisões e pendências nos lugares certos e responde.

Aceita PDF, JPG, PNG, WEBP, GIF, TXT, MD e CSV (até 30 MB). Word (.docx) ainda não: salve como PDF antes.

## Pedir documentos em PDF (no visual da Bevel)

1. Peça: "**Geral**, me faz um resumo em PDF de todos os leads com status e próximo passo."
2. Quando ele terminar, aparece o botão **📄 Abrir / Salvar em PDF** na resposta (e na lista da direita).
3. Clique: abre o documento no visual da Bevel. Clique em **Salvar em PDF** no topo e, em "Destino", escolha **Salvar como PDF**.
Os documentos ficam na pasta `jarvis-bevel/documentos` (o PDF fica onde você salvar).

## Ligar o CRM (só leitura)

1. Abra a pasta `jarvis-bevel` e, se não existir, crie o arquivo `.env` (copie o `.env.example` e renomeie).
   Arquivos com ponto ficam escondidos: no Finder, aperte **Cmd + Shift + .**
2. Abra o `.env` no TextEdit e adicione uma linha: `JARVIS_CRM_BANCO=` seguido do endereço que o Gui mandou (começa com `postgresql://`), sem espaços. Salve.
3. Feche a janela do Terminal e abra o Jarvis de novo. Na janela do Terminal deve aparecer "CRM: ligado (só leitura)".
4. Pergunte: "**CRM**, quantos leads entraram essa semana?"

## Ler o Google Drive (só leitura)
1. Instale o **Google Drive para computador** (já feito em 29/10).
2. No drive.google.com: **Compartilhados comigo** → botão direito na pasta **Bevel** → **Organizar → Adicionar atalho → Meu Drive**.
3. Feche e abra o Jarvis uma vez. No Terminal aparece "Drive: … (só leitura)".
4. Pergunte: "vê na pasta da Ortech no Drive se o Zé colocou os documentos do Guto".
Ele só lê: o que for importante vira resumo numa nota do cofre. Google Docs/Planilhas aparecem só como atalho (peça em PDF).

## Temas

**Não precisa dizer o tema:** fale normalmente ("a Gabriele respondeu", "o Gui terminou a coluna Atrasado") e o Jarvis escolhe sozinho.
A tela mostra "Indo para EQUIVET" e ele começa a fala com "Em EQUIVET." Errou? Diga "**não, é CRM**" e ele refaz no tema certo.
Ainda vale dizer o tema no começo ("**EQUIVET**, …") ou clicar num tema para fixá-lo; "**muda para** Escolinha" também fixa.
Os temas são os mesmos grupos e sessões da barra do app do Claude: Geral · Comercial · Clientes (EQUIVET, Escolinha, Digitron, Júnior, Gabe) ·
Marketing (Visão geral, Posicionamento e nicho, Tráfego pago, Materiais de venda, Site e formulário, Conteúdo e redes) · Financeiro e Jurídico ·
Operação e Processos (Operação, CRM). O tema em uso fica destacado na barra da esquerda, com um ponto azul pulsando enquanto ele trabalha.
Cada tema lembra a própria conversa. Quando ela fica longa, o Jarvis confere se tudo está nas notas e começa uma nova sozinho.
O ↺ ao lado do tema ativo, na barra da esquerda, começa uma conversa nova na hora (as notas não mudam).

## Criar uma aba (tema) nova

Peça por voz: "cria uma aba para a Ortech em Clientes" ou "abre um tema novo em Comercial para as construtoras".
O Jarvis cria a nota (se ainda não existir) e a aba já aparece na barra da esquerda, com conversa própria.

O Jarvis e o app do Claude usam a mesma lista: `07-Operacao/Sessoes-e-Temas.md` no cofre.
- Aba criada no Jarvis → fica "⏳ pendente" na lista. O app cria a sessão na próxima conversa lá,
  ou quando você disser no app: "**cria as sessões pendentes do Jarvis**".
- Sessão criada no app → entra na lista e vira aba no Jarvis sozinha (aparece ao recarregar a página).

## Modo rápido

Ao lado do campo de texto há o botão **🧠 Calmo / ⚡ Rápido**. Calmo (padrão) usa o Opus, que pensa com mais cuidado.
Rápido usa o Sonnet: começa a falar em ~2 s, bom para perguntas simples. A escolha fica salva.

## O que ele pode e não pode fazer

- Lê, busca, cria e edita notas **só dentro do cofre**. Não escreve em `.obsidian/`, `_arquivo/` nem `.claude/`.
- Não roda comandos, não acessa a internet e não manda mensagens.

## Se algo der errado

- "Não está logado": abra o app do Claude e entre na sua conta.
- "Limite de uso do plano": espere o limite renovar ou use menos perguntas longas.
- "Este navegador não transcreve voz": use o Google Chrome.
- O Chrome bloqueou o microfone: clique no cadeado ao lado do endereço → Microfone → Permitir.

## Para quem for mexer no código (VT, Gui)

Node 20+ · `npm install` · `npm start` · `npm run check` (tipos).
`src/server.ts` (rotas e histórico por tema em `data/estado.json`) · `src/cerebro.ts` (Claude Agent SDK, guardião de permissões) ·
`src/temas.ts` (temas e palavras-chave) · `public/` (página).
Modelo padrão `claude-opus-5-5` (`JARVIS_MODELO` no `.env` troca).
Sem `ANTHROPIC_API_KEY`, o Agent SDK usa o login do Claude Code do Mac (plano do Lucas). Com a chave, cobra por uso na API e mostra o custo.
