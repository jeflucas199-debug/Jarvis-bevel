# Site oficial
#marketing #site

- **Domínio oficial: https://www.bevelsystems.com.br/** — no ar (conferido em 2026-10-29, mesmo site/título do lp-steel-pi). Endereço antigo: https://lp-steel-pi.vercel.app/ — feito pelo **Gui** (novo, out/2026). Site oficial da Bevel por enquanto.
- Título: "bevel, tecnologia para otimizar processos e gargalos". Hero: "Processos sem gargalos. Mais controle do que acontece na sua operação."
- Seções: Sobre (seis áreas olhando o mesmo cliente; ~1 mês + 1 semana) · Serviços ("Problemas que já resolvemos", 6 itens) · Processo (6 etapas) · Ferramentas (IA, automação, integrações, desenvolvimento) · Contato (formulário → `/api/contato` + WhatsApp com texto pronto).
- Segue o brandkit: Plus Jakarta + Inter, degradê, logo completa no hero.

## Revisão do Claude (23/10/2026)
**Urgente**
- No celular (375px), o título do topo ficou **invisível (opacidade 0) mesmo depois de 4s** — conferir num celular de verdade.
- Formulário envia para `/api/contato`: confirmar **para onde vai o lead** e testar o envio.
- Sem **imagem de compartilhamento (og:image)**: o link no WhatsApp/Instagram sai sem prévia.
**Conteúdo**
- "Problemas que **já** resolvemos" cita estoque, funil e leads ainda não entregues → trocar por "Com o que podemos ajudar" (como na carta).
- Seção Ferramentas lista Make, Zapier, Notion, ElevenLabs, Whisper — conferir se usam; considerar resumir.
- Falta prova: cases da equipe (Moss, Modus, Unit, ECG+, como na carta) e depoimento quando houver.
- Falta "atendemos todo o Brasil" e "para quem" (ligado à decisão de nicho).
**Para o tráfego**
- ~~Domínio próprio~~ ✅ bevelsystems.com.br (29/10). Falta: e-mail no domínio (ex.: contato@bevelsystems.com.br) `[a confirmar se já existe]`.
- Analytics/pixel antes de anunciar; aviso de privacidade no formulário (LGPD).

## Checagem e lista priorizada (Claude, 24/10/2026)
O que foi visto ao vivo hoje:
- **Formulário bevel-contato continua em modo de teste**: `CONFIG.ENDPOINT` vazio → nenhum lead é gravado.
- **O site tem um formulário próprio, diferente do bevel-contato**: campos nome, número, e-mail, empresa, dificuldade, site → `/api/contato` (a rota existe e só aceita POST; **destino do lead desconhecido** — perguntar ao Gui). Dois formulários com campos diferentes = leads em dois lugares.
- Sem og:image (nem og:title/og:description); sem analytics/pixel; sem aviso de privacidade no formulário do site; não diz "todo o Brasil"; título "Problemas que já resolvemos" segue igual.
- O bevel-contato já tem aviso curto de uso dos dados e campo anti-spam.

**Prioridade**
1. 🔴 Ligar o bevel-contato a uma planilha (sem isso nenhum lead é salvo).
2. 🔴 Descobrir com o Gui para onde vai o `/api/contato` e fazer os dois formulários caírem no mesmo lugar (ou o site usar o bevel-contato).
3. 🔴 Título do topo invisível no celular — testar num aparelho de verdade.
4. 🟠 Prévia de link: og:image + og:title/og:description no site e no formulário (no padrão do brandkit).
5. 🟠 Texto: "Problemas que já resolvemos" → "Com o que podemos ajudar"; incluir "atendemos todo o Brasil"; deixar claro que não é só WhatsApp.
6. 🟠 Prova: cases da equipe (Moss, Modus, Unit, ECG+), sem citar cliente fechado pelo nome.
7. 🟡 Ferramentas: enxugar para o que usamos (n8n, WhatsApp, LLMs, Google, React Native, Node, PostgreSQL), como na carta.
8. 🟡 Formulário: alinhar campos (e-mail? faturamento/tamanho da equipe — decisão do sábado), aviso de privacidade no do site.
9. 🟡 Antes de tráfego: domínio próprio, e-mail no domínio, analytics/pixel.
10. ⚪ "Para quem" depende da decisão de nicho (reunião de 24/10).

## Site novo (ata da reunião de sócios, 24/10/2026)
- **Site novo montado até 27/10/2026:** o **Du monta** e o **Arthur (Brolo)** ajuda com as frases. → [[2026-10-24-Socios]]
- `[a confirmar]`: substitui o lp-steel-pi (feito pelo Gui) ou é outra página? Aproveitar a lista priorizada acima (título invisível no celular, "Problemas que já resolvemos", og:image, cases, "atendemos todo o Brasil").
