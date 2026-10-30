# Tráfego pago
#marketing #ads

## Decisões
- 14/09: **orgânico antes de pago**.
- 24/09: exceção de **R$ 300–400/mês** de impulsionamento no Instagram, só para o nicho.
- Cowork: só começa **depois** do perfil repaginado e do vídeo de demonstração pronto.

## Funil desenhado (Cowork)
1. **Topo:** visualização de vídeo e alcance (não seguidores). Curitiba, região e litoral; interesses construção civil / engenharia / incorporação. **R$ 10–15/dia**, 2 criativos, 4–6 semanas.
2. **Meio:** mensagens no WhatsApp + isca **planilha gratuita de controle de obra**, para quem viu 50% dos vídeos, seguidores e visitantes.
3. **Remarketing:** quem clicou e não falou.

Campanha direta para WhatsApp (conversão): **R$ 20–25/dia (R$ 600–750/mês)**, 2 criativos, 30 dias, sem mexer nos primeiros 7. Expectativa: **R$ 40–100 por conversa**.

⚠️ O desenho do Cowork (topo + conversão) passa do orçamento aprovado em ata (R$ 300–400/mês) → [[Divergencias-a-Resolver]].

## Checklist antes de anunciar (Claude, 2026-10-24)
Cruzado com [[Site]], [[Conteudo]], [[Canais-e-Perfis]], [[Nicho]] e [[Processo-de-Vendas-e-Entrega]].

**Bloqueia qualquer anúncio**
- [ ] Nicho/público confirmado na reunião de sócios de 24/10 ([[2026-10-24-Socios-pauta]]) — define público e criativo.
- [ ] Orçamento: resolver a divergência #9 (R$ 300–400/mês aprovado × R$ 600–750+ do Cowork) → [[Divergencias-a-Resolver]].
- [ ] **Vídeo do bot/assistente funcionando** (VT) — decisão do Cowork e principal criativo ([[Conteudo]]).
- [ ] Perfil do Instagram repaginado para o nicho (decisão do Cowork).
- [ ] Conta de anúncios Meta (Business Manager ligado ao @bevelsystems e ao WhatsApp) e **forma de pagamento** — sem CNPJ, cartão de quem? `[a confirmar]`
- [ ] Quem opera e acompanha os anúncios `[a confirmar — Du é marketing/vendas]`.
- [ ] Quem responde o WhatsApp **em minutos** e com qual roteiro (Lucas é o contato do cliente no WhatsApp).

**Bloqueia anúncio que leva para o site/formulário**
- [ ] Formulário salvando lead (bevel-contato em modo de teste; `/api/contato` do site com destino desconhecido) → [[Site]].
- [ ] Um formulário só, com os campos certos (divergência #21: 3 perguntas do Cowork × campos atuais).
- [ ] Pixel do Meta + analytics; aviso de privacidade (LGPD); og:image; título do topo visível no celular.
- [ ] Domínio próprio (desejável, não obrigatório para o 1º teste).

**Para o meio de funil:** isca "planilha gratuita de controle de obra" — existe? `[a confirmar]`.

## 1º teste sugerido (Claude, 2026-10-24) — aguardando decisão
- **Tipo:** Meta (Instagram), anúncio de **clique para o WhatsApp** — não depende do formulário nem do pixel; é o caminho mais curto até a conversa.
- **Orçamento:** ~R$ 12/dia × 30 dias ≈ **R$ 360** (dentro do aprovado em 24/09). Sem mexer nos primeiros 7 dias.
- **Público:** donos de construtora/incorporadora pequena (nicho 1) — Curitiba, região e litoral; interesses construção civil/engenharia/incorporação; 28–60 anos `[faixa a validar]`.
- **Criativos (2):** vídeo do produto (40–50s, gancho nos 3s) + carrossel "o dinheiro que some na obra" (já existe).
- **Mensagem pronta no WhatsApp:** "Vi o anúncio da Bevel…" — para saber que veio do anúncio.
- **Medir:** custo por conversa (referência Cowork R$ 40–100), % de conversas com perfil do nicho, reuniões de auditoria marcadas.
- **Leitura esperada:** com R$ 360, ~4–9 conversas. Sucesso = custo por conversa ≤ R$ 60 e ≥ 1 reunião marcada `[critério a aprovar]`.
- **Google Ads:** fica para depois (orçamento pequeno e site/formulário ainda não prontos).

## Integração Meta Ads × Claude × CRM (ideia do Lucas, 2026-10-24)
Pesquisado em 24/10/2026 (fontes públicas; conferir na hora de montar).
- **Claude × Meta Ads:** a Meta lançou em 29/04/2026 um **conector oficial** (beta aberto), servidor MCP em `mcp.facebook.com/ads`, com ~29 tools da Marketing API: relatórios de desempenho, gestão de campanhas (criadas **pausadas** por padrão), catálogo e diagnóstico de sinais. Conecta em Configurações > Conectores do Claude, com login no Facebook. Existem também servidores da comunidade (precisam de app e token próprios).
- **Meta × CRM do Gui:** anúncio de **formulário instantâneo (Lead Ads)** → webhook `leadgen` da Meta → endpoint do CRM cria o lead na aba Leads. Alternativa: anúncio que leva ao formulário do site/CRM, com pixel + API de Conversões.
- **CRM → Meta (volta):** mandar o resultado (reunião, venda) para a Meta otimizar por lead qualificado (Conversions API for CRM / "Conversion Leads"). Só funciona com Lead Ads nativos; a Meta estima semanas de desenvolvimento — fica para depois do 1º teste.
- ⚠️ O 1º teste sugerido (clique para WhatsApp) **não entrega o lead com dados ao CRM**: a conversa cai no WhatsApp e o cadastro seria manual. Decidir: manter WhatsApp (mais simples) ou testar Lead Ads (já alimenta o CRM).
- Pendente: o CRM do Gui precisa de um endpoint público para receber leads; hoje o formulário está em modo de teste. Quem configura: Gui `[a confirmar]`.

## Direção da reunião de sócios de 24/10 (relato do Lucas; ata do Arthur pendente)
Registro provisório. **A ata (Du, 25/10) não fala de tráfego** ([[2026-10-24-Socios]]), então isto continua só como relato do Lucas.
- Os sócios conversaram sobre **de fato fazer um tráfego, rodar e medir**.
- **Falta antes de rodar:** criativos (Du está fazendo) · reestruturar o Instagram.
- **Em aberto:** o que funciona melhor — **impulsionar no Instagram e/ou no TikTok** ou outro caminho.
- **Pesquisa em andamento (Lucas + Du):** o que é melhor fazer com o que a Bevel tem hoje e **quanto custaria rodar até janeiro/2027**.
- **Integração (preferência do Lucas, 24/10):** começar **só com o Claude integrado ao Meta Ads** (conector oficial, ver acima); integração Meta ↔ CRM do Gui fica para uma segunda etapa.
- Entregável esperado da pesquisa: comparativo de canais (Instagram × TikTok) + orçamento mensal de nov/2026 a jan/2027 → comparar com o aprovado (R$ 300–400/mês, divergência #9).

## Proposta orgânico + pago, nov/2026–jan/2027 (Claude, 2026-10-24) — em discussão com o Lucas
- **Princípio:** o orgânico é o laboratório e o pago amplifica. Postar no orgânico, ver o que performa (retenção, salvamentos, mensagens) e **impulsionar só o que já funcionou**. Não criar peça só para anúncio.
- **Canal pago:** começar **só no Meta (Instagram)**: tem clique para o WhatsApp, o conector oficial com o Claude e o público de dono de construtora. **TikTok fica só no orgânico** (bastidores do Vitor), até haver dado. `[validar na pesquisa Lucas + Du]`
- **Fases:**
  0. **Preparar** (até ~07/11 `[data a definir]`): repaginar o perfil (bio, destaques, 3 fixados, link para o WhatsApp) · 6–9 posts-base do nicho no feed · vídeo de demonstração · Business Manager, pagamento e conector Claude × Meta Ads.
  1. **Novembro:** orgânico 2 Reels + 1 carrossel/semana · impulsionar os 1–2 melhores posts com objetivo de mensagens no WhatsApp.
  2. **Dezembro:** manter o vencedor, trocar o criativo que perdeu · remarketing para quem viu 50% dos vídeos.
  3. **Janeiro:** ler os números (custo por conversa, reuniões, fechamentos) e decidir se escala, troca de canal ou para.
- **Orçamento até jan/2027 (3 meses):** cenário A (aprovado) R$ 300–400/mês = **R$ 900–1.200**; cenário B (Cowork, topo + conversão) ~R$ 900–1.200/mês = **R$ 2.700–3.600**. Recomendação: começar no A e só subir se o custo por conversa ficar dentro da meta.
- **Fonte de pauta do orgânico:** os 11 textos de LinkedIn do Zé já escritos viram carrosséis; os 7 roteiros do nicho (01/10) viram Reels ([[Conteudo]]).

## Impulsionar × campanha no Gerenciador de Anúncios (Claude, 2026-10-24)
- **Impulsionar (no app do Instagram):** rápido e simples; curtidas e comentários ficam no post. Mas tem poucos objetivos (perfil, site, mensagens), público básico, quase nenhum remarketing, sem teste A/B e sem formulário instantâneo (Lead Ads).
- **Campanha (Gerenciador de Anúncios / Business Manager):** todos os objetivos (mensagens no WhatsApp, Lead Ads que podem cair no CRM, conversão com pixel) · remarketing (quem viu 50% do vídeo, quem interagiu com o perfil) · exclusões · teste A/B · vários criativos competindo · relatórios completos. Contra: dá trabalho de configurar, tem curva de aprendizado e é mais fácil gastar errado.
- **Ponto-chave:** o Gerenciador permite **usar um post que já existe** como anúncio, e assim o engajamento continua no post.
- **Sugestão:** o funil do Cowork (topo → meio → remarketing) e a integração com o CRM só funcionam com **campanha**. Começar no Gerenciador com **1 campanha e 1 conjunto**, usando posts orgânicos que já existem. Impulsionar fica para post pontual. `[decidir com os sócios]`

## Funil agora? (Claude, 2026-10-24) — em discussão
- **Funil completo em 3 etapas pagas, ainda não.** Com R$ 300–400/mês e público pequeno (dono de construtora em Curitiba e região), dividir a verba em 3 campanhas faz nenhuma aprender. Também ainda não existe público de remarketing (pouca gente viu/interagiu).
- **Funil mínimo sugerido:**
  1. **Topo = orgânico** (de graça): 2 Reels + 1 carrossel/semana para o nicho. É ele que gera o público quente.
  2. **Pago, 1 campanha de mensagens no WhatsApp** usando os posts que mais performaram (mês 1: 100% da verba).
  3. **A partir do mês 2:** 1 conjunto pequeno de remarketing (~R$ 3–5/dia `[a validar]`) para quem interagiu com o perfil ou viu 50% dos vídeos nos últimos 30–60 dias, **só se o público já tiver tamanho**.
  4. **Depois do WhatsApp** (a parte que fecha venda): resposta em minutos → 3 perguntas de qualificação (obras em andamento, cidade, papel) → reunião de auditoria → proposta ([[Processo-de-Vendas-e-Entrega]]).
- **Funil "ideal" quando a verba crescer** (desenho do Cowork): topo de visualização de vídeo barato → remarketing com isca (planilha de controle de obra) ou mensagem → conversa → reunião.
- **Medir por etapa:** alcance e retenção do vídeo · custo por conversa · % de conversas com perfil do nicho · reuniões marcadas · propostas · fechamentos.

## Impulsionar "vicia" o algoritmo? (Claude, 2026-10-24)
- **Não diretamente:** a entrega paga e a orgânica são sistemas separados; a Meta (Adam Mosseri, Instagram) já negou publicamente que anunciar derrube o alcance orgânico.
- **O que dá a sensação de queda:** o post impulsionado teve alcance extra, então o seguinte parece fraco em comparação.
- **Risco real (indireto):** impulsionar para "visitas ao perfil/seguidores" com público amplo traz seguidor que não engaja. A taxa de engajamento cai, e isso sim pode reduzir o alcance orgânico.
- **Como evitar:** objetivo de mensagens, público do nicho, nunca comprar seguidor e seguir postando com constância mesmo sem anúncio.

## Plano para R$ 300/mês (Claude, 2026-10-24) — sugestão
- **Objetivo do mês:** aprender (custo por conversa e qual mensagem chama o dono de construtora), não gerar volume. Esperado: R$ 300 ÷ R$ 40–100 = **3–7 conversas**, 1–2 com perfil do nicho, 0–1 reunião `[estimativa]`.
- **Estrutura:** 1 campanha de Engajamento → Mensagens → WhatsApp · 1 conjunto · **R$ 10/dia** · 30 dias.
- **Público:** Curitiba, região metropolitana e litoral `[área a definir]` · 30–60 anos `[a validar]` · interesses construção civil, engenharia civil, incorporação imobiliária. Posicionamentos automáticos (Instagram **e Facebook**: dono de construtora de 40–55 anos também está no Facebook).
- **Criativos (2, de posts que já existem):** vídeo de demonstração (dor → solução → "Chama a gente") + Reel ou carrossel de dor ("o dinheiro que some na obra").
- **WhatsApp:** mensagem pronta "Vi o anúncio da Bevel…" · saudação automática fora do horário · resposta humana em até 15 min `[meta a definir]` · 3 perguntas de qualificação.
- **Ideia:** o anúncio cair no WhatsApp atendido pelo **próprio bot da Bevel** (qualifica e marca reunião), para o lead ver o produto funcionando. Depende do VT `[avaliar]`.
- **Ritual:** dias 1–7 sem mexer · dia 7–10 pausar o criativo com custo por conversa ≥ 2× o do outro · dia 15 entrar um criativo novo do orgânico · dia 30 relatório (conversas, custo, perfil, reuniões) e decisão do mês seguinte. Relatório semanal pelo conector Claude × Meta Ads.

## Análise de métricas pelo Claude (combinado em 2026-10-24)
- Depois de conectar o Meta Ads (Configurações > Conectores, login do Facebook feito pelo Lucas/Du), o Claude puxa os dados das campanhas e faz um **resumo semanal e um no fim do mês**, salvo nesta nota ou em `06-Marketing/Relatorios-Trafego/` `[a criar]`.
- **O que o Meta mostra:** alcance, frequência, custo por conversa, cliques, retenção do vídeo (25/50/75/100%), por criativo, idade, posicionamento e dia.
- **O que o Meta não sabe:** se a conversa virou reunião ou venda. Precisa registrar no CRM do Gui (ou numa planilha) a origem "anúncio" e o desfecho de cada conversa; o Claude cruza os dois.
- **Regras:** o Claude não mexe em verba nem liga campanha sem o OK do Lucas/Du (campanhas criadas pausadas) · com R$ 300/mês os números são pequenos: tratar como sinal, não conclusão.
- Opcional: tarefa agendada para gerar o resumo toda segunda `[decidir]`.
