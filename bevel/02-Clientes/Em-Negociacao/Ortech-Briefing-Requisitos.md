# Ortech — Briefing de Requisitos (documento do cliente)
#cliente #documento

> Documento **da Ortech** (não da Bevel), apresentado pelo Augusto na reunião de diagnóstico de 27/10/2026. "Plataforma Ortech: um só ambiente para a equipe, os clientes e a IA" · versão 1.1 · 24/10/2026 · **confidencial** · 14 páginas.
> Original no Drive (pasta "Ortech - Gutão", subido pelo Zé em 29/10): https://drive.google.com/file/d/1QFgMiTRRAgrVR0SfyF7hmKnYk0Zq790j/view · cliente: [[Ortech]] · reunião: [[2026-10-27-Ortech-Diagnostico]]
> Lido e resumido pelo Claude em 2026-10-29.

## O que pedem para a Bevel ("equipe de TI")
Uma **proposta** com: arquitetura (componentes, onde cada dado fica, como a permissão é aplicada em cada camada) · **custos de implantação e mensais por item** (VPS, armazenamento, banco, backups, APIs de IA, licenças, suporte) · **plano de migração** sem parar o escritório · **plano de contingência** (tempos de recuperação, cópias, quem aciona, teste) · segurança e LGPD (incluindo o que a Ortech faz do lado dela) · **cronograma por fase** com critérios de aceite · **sustentação** (suporte, atualizações, monitoramento).
O documento diz o "o quê"; o "como" fica com a TI, que deve apontar riscos e alternativas quando discordar.

## Quem é a Ortech
- Ortech Assessoria Contábil e Consultoria · **Curitiba (PR)** · **mais de 40 anos** · foco em **comércio varejista e prestadores de serviço**.
- Equipe com **pouca intimidade com tecnologia**: "se a tela precisar de explicação, ela está errada".

## A visão: uma plataforma com três funções
1. **Ambiente de trabalho interno** dos funcionários, com **CRM integrado**.
2. **Portal dos clientes**: documentos da própria empresa, notícias contábeis e canal de dúvidas atendido pelo agente.
3. **Base de conhecimento** consultada por um **agente de IA (RAG)** que responde, gera relatórios e automatiza tarefas.
Ganho por público: funcionários num lugar só + assistente pessoal · clientes com histórico de documentos · sócios com indicadores e NPS por funcionário · operação em nuvem com plano B (hoje, se o servidor do escritório para, o trabalho para).

## Como trabalham hoje (nada pode parar na migração)
| Componente | Hoje | O que querem |
|---|---|---|
| Servidor local | Acesso ao sistema contábil + documentos dos clientes em pastas por empresa/departamento/mês | Migrar para a nuvem preservando as pastas |
| VPS Hostinger | Já contratada; preferem centralizar nela | TI avaliar se atende a disponibilidade |
| Acessórias | Tarefas contábeis; API aberta para eventos | Integrar como fonte dos indicadores |
| Robô de envio (Acessórias) | Salva na pasta do cliente e envia por e-mail e WhatsApp | Manter; avaliar absorver |
| **Automação e IA já em uso** | **n8n (Easypanel), Supabase com pgvector, Evolution API no WhatsApp e um "Agente Fiscal" parcialmente construído**, com aprovação pelo WhatsApp | Reaproveitar o que fizer sentido; TI valida ou propõe substituto |
| E-mail e agenda | Google Workspace (Gmail e Calendar) | Integrar aos assistentes |
⚠️ **Primeira pergunta para a TI:** o **sistema contábil** (acessado pelo servidor local) pode ir para a nuvem? Licença, sistema operacional, desempenho remoto, suporte do fornecedor. "A resposta muda o desenho da migração inteira." Pelos links que o Augusto mandou, o sistema contábil deve ser o **SCI** `[confirmar]`.

## Quatro princípios inegociáveis
1. **A operação não pode parar** — redundância e plano B documentado e testado, não só backup.
2. **Segurança acima de conveniência** — dados fiscais, trabalhistas e financeiros; LGPD desde o 1º dia.
3. **Simples para quem usa** — telas limpas, poucos cliques, tudo funcionando no celular.
4. **Informação completa e verídica** — tudo que a IA entrega é rastreável até a fonte; na dúvida, a IA diz que não sabe; tudo no design system da Ortech.

## Quem usa e o que vê (matriz inicial, a fechar com a TI)
| Recurso | Sócios | Funcionários | Clientes |
|---|---|---|---|
| Documentos | Todos | Só da carteira | Só da própria empresa |
| CRM | Completo | Conforme a função | Sem acesso |
| Notícias contábeis | Sim | Sim | Sim |
| Agente de IA | Base interna completa | Base interna filtrada pelo perfil | Dados da própria empresa + conteúdo público |
| Assistente pessoal | Sim | Um por funcionário | — |
| Indicadores e NPS | Toda a equipe | Só os próprios | Sem acesso |
| Administração | Sim | Não | Não |
Regra de arquitetura: **o agente nunca acessa o repositório direto; toda busca passa pela camada de permissões** (login com 2 fatores, perfis, auditoria de cada consulta e download).

## Requisitos funcionais (30) — por módulo
Prioridade: **E** = essencial (sem isso não entra em produção) · **I** = importante (1º ciclo após estabilizar) · **Ev** = evolução.
1. **Infraestrutura e base centralizada:** migrar servidor local para nuvem sem parar (E) · repositório único preservando as pastas (E) · agente consulta o repositório respeitando permissões (E) · preferir a VPS Hostinger se cumprir os requisitos (I).
2. **Portal:** área do cliente com documentos pesquisáveis (E) · notícias contábeis por segmento (I) · área interna com o mesmo login e visual (E) · tudo no celular (E).
3. **CRM integrado:** dentro da plataforma (E) · ficha do cliente com contatos, documentos, tarefas do Acessórias e histórico de atendimento (I) · CRM alimenta o agente e os indicadores (I).
4. **Agente RAG:** base sobre funcionários, clientes, sócios e rotinas, atualizada sozinha (E) · uso interno por carteira (E) · **uso externo com filtro na busca, antes de chegar ao modelo — não só por instrução no prompt** (E) · sugerir respostas que o atendente revisa (I) · dashboards e planilhas no visual da Ortech (I) · **toda resposta com fonte; sem fonte, "não sei"** (E).
5. **Assistente pessoal por funcionário:** chat de IA próprio (I) · aprende com a carteira, rotinas e preferências (I) · Gmail e Calendar (I) · memória privada e confirmação antes de qualquer ação externa (E).
6. **Indicadores e NPS:** API do Acessórias para indicadores por funcionário e cliente (I) · painel de desempenho (prazos, entregas, atrasos) (I) · NPS ligado ao funcionário responsável (I).
7. **Automações:** envio automático de documentos por e-mail e WhatsApp, no mínimo igual ao robô atual (E) · emissão de NFS-e (I) · análise de SPED (I) · planejamento tributário (Ev) · e-mails recorrentes (I) · triagem da caixa de e-mail por cliente/assunto/urgência (I). **Regra: tudo que a IA gera para o cliente passa por aprovação humana** até a Ortech liberar aquele fluxo.

## Requisitos não funcionais (20) — os pontos duros
- **Disponibilidade (maior preocupação deles):** meta proposta pela TI (referência 99,9% ≈ 8h45 parado/ano) · backups criptografados com cópia **fora da Hostinger** · plano de contingência escrito com tempos de recuperação e perda de dados · **teste real do plano antes de entrar em produção** e depois periódico · monitoramento com alerta imediato. "Uma única VPS é ponto único de falha."
- **Segurança e LGPD:** 2 fatores para todos (inclusive clientes) · criptografia em trânsito e em repouso · **isolamento por cliente no banco e no índice da IA** · auditoria imutável (inclusive consultas da IA) · acesso mínimo e revisado · nada de porta de banco aberta na internet (VPN) · **provedores de IA que não treinam nem retêm os dados, em contrato** · LGPD completa (mapa de dados, retenção, direitos dos titulares, resposta a incidente) · teste de invasão independente antes de abrir o portal (I).
- **Usabilidade:** linguagem simples · validar telas com funcionários reais (I) · treinamento e guias curtos (I).
- **Visual e qualidade:** **design system da Ortech** (ouro em relevo sobre verde muito escuro; Figtree nos títulos, Albert Sans no texto; tokens serão entregues) · todo número rastreável · custo de operação mensal visível para os sócios (I).

## Ordem de construção que eles sugerem
1. **Fundação:** nuvem, migração do servidor, repositório, acessos, backups, plano B testado → sai quando o escritório trabalha 100% na nuvem e a contingência passou em teste real.
2. **Operação:** área interna, portal, CRM, envio de documentos, Acessórias → sai quando clientes usam o portal e a equipe usa o CRM.
3. **Inteligência:** agente RAG interno → aberto aos clientes só depois do teste de isolamento → assistentes com Gmail/Calendar → sai com zero vazamento em testes deliberados.
4. **Gestão e automação:** indicadores, NPS, notas, SPED, e-mails, dashboards, planejamento tributário.
"Nenhuma funcionalidade de IA vai ao ar antes de a infraestrutura, a segurança e a base de dados estarem sólidas." A TI pode propor outra ordem, justificando.

## Perguntas que eles querem respondidas
1. O sistema contábil pode rodar na nuvem? 2. A Hostinger atende à meta de disponibilidade (e onde fica o plano B)? 3. Volume atual e crescimento de documentos? 4. O que a API do Acessórias entrega de verdade? 5. **Construir ou adotar** (CRM e portal) — com prós e contras? 6. Onde a IA processa os dados (provedor, região, contrato)? 7. Dá para reaproveitar n8n, Supabase, Evolution e o Agente Fiscal?

## Leitura da Bevel (Claude) — o que muda para a proposta
- ⚠️ **Escopo bem maior que a "Fase 1" do relatório.** O relatório do Zé põe como foco "atendimento no WhatsApp + CRM com triagem por IA"; o briefing pede **primeiro infraestrutura, migração do servidor e plano B**, e só depois portal/CRM e IA. Precisa decidir qual Fase 1 a Bevel vai propor e explicar ao Augusto → [[Divergencias-a-Resolver]].
- **Eles já têm peças técnicas** (n8n, Supabase/pgvector, Evolution API, Agente Fiscal parcial): a pergunta 7 pede para avaliar reaproveitamento — pode baratear e acelerar.
- **Exigências que pesam no preço e no contrato:** plano B fora da Hostinger com teste real, 2FA para clientes, isolamento no índice da IA, auditoria imutável, LGPD, pentest, provedores de IA sem retenção. Isso confirma o alerta dos certificados digitais.
- **Entregáveis esperados são de consultoria de TI** (arquitetura, migração, contingência, sustentação) — maior que o formato de proposta de chatbot da Bevel; o roadmap do Du precisa cobrir os 7 itens pedidos.
- Pedem trabalho no **design system deles**, não no da Bevel.
