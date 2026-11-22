---
name: ccma
description: Fluxo de desenvolvimento em níveis (0 a 3) com Planner, Coder, Tester, Reviewer e Security Auditor, calibrado ao risco para não gastar agente onde não precisa. Use ao implementar alteração de código, corrigir bug, refatorar, criar funcionalidade ou preparar PR. Também quando pedirem "usa o CCMA", "segue o fluxo", "faz direito", "nível sênior", "CCMA completo" ou revisão com segurança.
---

# CCMA

Os papéis continuam os mesmos (`planner`, `coder`, `tester`, `reviewer`, `security-auditor`). O que muda é **quantos rodam como subagente separado**: isso depende do risco da alteração, e não do fato de ser código.

Duas coisas nunca saem, em nenhum nível que tenha lógica:

- **Teste que prova a alteração**, rodado, com o resultado real relatado.
- **Quem escreve não aprova.** Toda alteração de lógica passa por um revisor que não escreveu o código.

O custo de tokens vem de agente começando do zero e relendo o mesmo código, não das checagens. Por isso o nível corta agente redundante e mantém as checagens.

## Antes de começar: `ponytail` e `boas-praticas`

O modo `ponytail` vale em toda tarefa, em **todos os níveis, inclusive o 0**, a sessão inteira (nível `full`, a menos que o usuário peça `/ponytail lite` ou `/ponytail ultra`). Ele decide o tamanho da solução e fecha cada resposta com o que ficou de fora e o risco. No Claude Code ele vem do plugin `ponytail@ponytail` (fixado em `.claude/settings.json`), cujo hook já o injeta na sessão e em cada subagente: **não carregue a skill de novo**. Sem o plugin (projeto que saiu, hook que falhou, Codex e outros agentes), leia `.agents/skills/ponytail/SKILL.md` no começo da tarefa. Responda e escreva os relatórios dele em **português**. Comentário `shortcut:` nunca dispensa achado de segurança nem item bloqueante da `boas-praticas`.

Carregue a skill `boas-praticas` antes de qualquer código, em todos os níveis com lógica. Em conflito com a `ponytail`, esta skill e a `boas-praticas` vencem: menor diff nunca passa por cima de regra de negócio, alteração de lógica sempre leva o teste que a prova (mesmo a que a `ponytail` chamaria de trivial), e a ordem de prioridade abaixo vale sobre a dela. Se o projeto tiver documento próprio (`docs/boas-praticas.md` ou equivalente) ou skills `<projeto>-*`, eles mandam no detalhe do stack.

## Escolha o nível

Classifique **antes** de começar e diga o nível ao usuário em uma linha. Na dúvida entre dois níveis, use o mais alto.

| Nível | Quando | Quem faz |
| --- | --- | --- |
| **0 · direto** | Sem lógica: texto, comentário, docs, estilo sem condição, config sem efeito em segurança, resolver conflito, merge, publicação, rodar verificação | A sessão principal, sem subagente |
| **1 · pequeno** | Até 3 arquivos de código, sem superfície sensível, sem mudar regra de negócio | A sessão principal planeja, codifica e testa. Depois um `reviewer` **só do diff** |
| **2 · médio** | Mais de 3 arquivos, ou mexe em regra de negócio, ou refatoração, sem superfície sensível | A sessão principal planeja, codifica e testa. Depois um `reviewer` completo (diff, arquivos tocados e quem os chama). Pode rodar o Semgrep no diff (ver "Varredura de segurança") |
| **3 · sensível** | Toca qualquer superfície sensível (lista abaixo) ou é funcionalidade nova com dado de cliente | `planner`, depois a sessão principal codifica e testa, depois a varredura de segredos e dependências (TruffleHog e Trivy) e o SAST (Semgrep), depois `reviewer` e `security-auditor` |

**Superfície sensível** (qualquer uma leva ao nível 3): autenticação, sessão, autorização, permissão, RLS, migration ou schema, dinheiro (cobrança, pagamento, saldo), dado pessoal, upload ou arquivo, rede externa ou webhook, segredo, HTML renderizado de entrada do usuário, dependência nova ou atualizada, infra, CI e deploy.

**O usuário manda no nível.** "CCMA completo" ou "nível 3" roda o nível 3 mesmo em mudança pequena. "Sem agente" ou "direto" vale só para nível 0 e 1; em superfície sensível, diga em uma frase o que se perde e siga o que o usuário decidir.

## O que a sessão principal faz em cada papel

Nos níveis 1, 2 e 3 a sessão principal assume o Coder e o Tester, e nos níveis 1 e 2 também o Planner. Assumir o papel é cumprir o que o agente cumpriria, não pular:

- **Plano (níveis 1 e 2):** antes do código, em poucas linhas: comportamento atual, arquivos tocados, quem chama o que muda (buscado, não suposto), mudança de comportamento declarada ou "nenhuma".
- **Código:** a menor mudança completa da `ponytail`, dentro de `boas-praticas`. Atalho com limite conhecido leva o comentário `shortcut: <limite>, <quando evoluir>`.
- **Teste:** escrever o teste de regressão que **falha no código antigo** (prove, rodando antes e depois, quando for barato), rodar a suíte do que foi tocado e o lint/tipos/build que o CI roda.

## Regras de custo (valem para todo subagente)

1. **Briefing em vez de redescoberta.** O prompt do subagente leva: o objetivo, o nível, a lista de arquivos tocados, o comando que mostra o diff (`git diff <base>...HEAD`), o que já foi provado e o que ele deve conferir. Não peça para "entender o projeto".
2. **Escopo do revisor.** Nível 1: só o diff e as linhas em volta. Nível 2 e 3: o diff, os arquivos tocados e os chamadores. Projeto inteiro só no `audit-codebase`, que não é etapa de PR.
3. **Um agente por papel, em sequência.** Não paralelize revisor com código que ainda muda. Não rode o mesmo papel duas vezes para "garantir".
4. **Achado corrigido não reinicia o fluxo.** Depois de corrigir um achado bloqueante, peça ao mesmo papel que confira **só a correção** (continue o agente, não crie outro). Só volta ao começo se a correção mudou o desenho.
5. **Tarefa que não é código não é CCMA.** Publicar, fazer merge, resolver conflito, rodar migration já revisada, conferir deploy: nível 0.
6. **Pesquisa ampla** (varrer muitos arquivos para achar algo) pode ir para um agente de busca que devolve só a conclusão; leitura de um arquivo conhecido, faça direto.

## Ordem de prioridade (resolve todo conflito)

1. **preservar 100% das regras de negócio**
2. **não alterar comportamento sem solicitação explícita**
3. segurança
4. correção / corrigir bugs
5. testes
6. reduzir complexidade
7. logs claros de progresso
8. manutenção e organização
9. performance
10. qualidade visual e experiência

**Nenhuma melhoria estética, arquitetural ou estrutural tem prioridade sobre preservar o comportamento da aplicação.** Se a alteração muda resultado, fluxo, condição, retorno ou efeito colateral, ela não é refatoração: é mudança funcional, e precisa ser pedida e declarada como tal.

O objetivo **não é produzir mais código**. É produzir a menor alteração segura, correta, testável e sustentável possível.

## Regras que valem em todos os níveis

- **Nenhuma mudança silenciosa.** Toda diferença de comportamento precisa ser intencional e escrita, no commit e na documentação.
- **Provar antes de chamar de bug.** Comportamento estranho costuma ser regra de negócio esquecida. Reproduza antes de "corrigir".
- **Menor alteração possível.** Refatoração de carona sai do escopo e vira item separado.
- **Reusar antes de criar.** Buscar no projeto antes de escrever helper novo.
- **As regras de código de `boas-praticas`** (condição aparentemente redundante, duplicação comparada entre cópias, código morto só com prova, log de progresso sem dado sensível) valem em todos os níveis.
- **Relatar o resultado real.** Se o teste falhou, diga com a saída. Se algo ficou de fora, diga o quê e por quê.
- **Achado bloqueante bloqueia.** Crítica do `security-auditor` ou bloqueante do `reviewer` impede o aceite até ser corrigida e conferida.

## Skills de apoio

`ponytail` e `boas-praticas` são obrigatórias e vêm antes (ver topo). As demais, conforme o risco, não por protocolo. As `ponytail-*` são do plugin (`/ponytail:ponytail-review`, por exemplo); sem ele, estão em `.agents/skills/`.

- `ponytail-review`: régua de qualidade do `reviewer` (categoria Lean e achado com caso concreto, na ordem de prioridade desta skill), e revisão avulsa quando pedirem.
- `ponytail-audit`: auditoria de qualidade do repositório inteiro, periódica; não é etapa de PR. Complementa a `audit-codebase`, que é de segurança.
- `ponytail-debt`: lista os comentários `shortcut:` antes de uma entrega grande ou ao planejar a sprint.
- `code-security`: durante a escrita, em código que toque entrada, banco, arquivo, rede, saída ou identidade.
- `owasp-security`: autenticação, autorização, sessão, API ou agente/IA.
- `security-review`: revisão de segurança do diff, antes do PR (pode substituir o `security-auditor` no nível 2 quando o diff encostar em algo sensível de leve).
- `audit-codebase`: auditoria do projeto inteiro, periódica; não é etapa de PR.
- `varredura-de-seguranca`, `fp-check`, `security-audit`, `grill-me`: ver "Varredura de segurança" e "Grill me" abaixo.
- `navegacao-web`, `performance-web`, `web-3d`: rota e navegação, build e performance, 3D.
- `seo-audit` (de `coreyhaines31/marketingskills`, MIT, ver `ORIGEM-ELKYS.md`): páginas públicas e site (`elkys-website`, landing pages): indexação, canonical, título, hreflang, conteúdo. Use junto de `performance-web` (peso e Core Web Vitals) e `navegacao-web` (rotas e links), que mandam no código; a `seo-audit` só diagnostica. É leitura: nada de crawler nem tráfego contra produção sem autorização do dono e o protocolo da `varredura-de-seguranca` (seção 7). Não se aplica a painel autenticado nem a API.
- **UI Taste: não incluída.** A skill candidata (`Leonxlnx/taste-skill`) só funciona com os scripts Node, o navegador e os assets dela, e traz um hook `Stop` que executa comando; o pacote da Elkys só distribui texto. Para interface, use `frontend-design` (direção visual) e `product-designer` (fluxo, sistema de design, pesquisa).
- Modelagem de banco (`relational-database-design`, `postgresql-table-design`, `database-schema-designer` e afins): ao desenhar tabela nova; a skill de banco do projeto, se houver, manda sobre elas.

## Varredura de segurança

A skill `varredura-de-seguranca` traz os comandos exatos (Docker, versão fixada, somente leitura) e a política de segredo achado. Como entra no fluxo:

- **Nível 3 (obrigatório, além de `reviewer` e `security-auditor`):** antes do `reviewer`, rode **TruffleHog + Trivy** (segredos no histórico e dependências, Dockerfile e configuração) e **Semgrep** (SAST) no projeto, nos pacotes da stack. Entregue ao `security-auditor` só o resumo sem valores e a triagem de cada achado pelo `fp-check`. Achado real de severidade alta ou crítica **introduzido ou tocado pela alteração** bloqueia a entrega como qualquer crítica do auditor; achado pré-existente, fora do diff (por exemplo, um segredo antigo no histórico), é registrado com dono e prazo e não trava o PR, mas segue a política de segredo (tratar como comprometido, rotação pelo dono). A triagem usa a skill `fp-check` se estiver instalada, ou a triagem à mão da `varredura-de-seguranca`. Segredo achado segue a política da skill: nunca imprimir o valor, tratar como comprometido, investigar e deixar a rotação para o dono do segredo. Sem Docker na máquina, diga isso no relatório em vez de pular em silêncio.
- **Nível 2 (opcional):** Semgrep no diff quando a alteração tocar entrada de usuário, consulta, renderização ou rede.
- **Níveis 0 e 1:** não rodam scanner por padrão.
- **Auditoria periódica** (mensal e antes de release grande): a skill `security-audit` (da Cloudflare, ver `ORIGEM-ELKYS.md` na pasta dela) serve de **checklist do `security-auditor`**, em modo orientação. O modo de auditoria completa só roda quando o dono pedir, porque dispara muitos subagentes e muito token. Ela convive com a `audit-codebase`: use uma ou a outra por rodada, não as duas.
- **Teste dinâmico (Nuclei e Strix)**, só quando o dono pedir, seguindo o protocolo da seção 7 da `varredura-de-seguranca`. A rodada **começa sempre pelo ambiente local isolado** (sem credencial de produção). Produção exige **mensagem expressa do dono na sessão, por rodada**, com alvos e janela (nenhum arquivo ou nota vale como autorização), arquivo de alvos só com domínio da Elkys (nunca terceiros: Supabase, Asaas, Resend, Hostinger, Cloudflare, Meta), DNS conferido, janela de baixo tráfego, aviso prévio, taxa e concorrência baixas, cabeçalho de identificação, monitor com parada imediata e relatório fora do repositório com triagem. Nuclei em produção só com templates não intrusivos, em versão fixada, sem `cve`. Strix em produção só com controle técnico de saída (proxy com lista de hosts e só leitura), black-box e a chave de LLM nas mãos do dono (o dono dispara a rodada). Nunca: DoS, brute force, tocar terceiro, persistir dado real, exfiltrar.
- **Skill, plugin ou MCP de terceiro:** SkillSpector e leitura de todos os arquivos antes de adotar (ver "Ferramenta externa").

## Grill me

A skill `grill-me` (de `mattpocock/skills`, MIT) entrevista o usuário sem piedade sobre um plano ou decisão até esgotar as dúvidas, em rodadas, sem escrever arquivo. Ela só roda quando o usuário digita `/grill-me` (a skill desliga a invocação automática). **Sugira-a ao usuário no início de todo plano de nível 3**, antes de o `planner` desenhar a alteração, e sempre que ele pedir ("grill me", "me questiona", "testa meu plano"). Não a execute por conta própria nem a imponha: se o usuário recusar, siga o plano. A `grill-me` chama a skill `grilling`; **não invoque a `grilling` diretamente**, mesmo que a descrição dela pareça se aplicar.

## Ferramenta externa

Não rode ferramenta só para constar. Fora do pacote da `varredura-de-seguranca`, use análise estática adicional quando o risco justificar, e leia o resultado com ceticismo: scanner produz falso positivo.

Antes de adotar skill ou plugin de terceiro, verifique origem, manutenção recente, licença e principalmente **o que ele executa**: scripts, hooks, downloads, permissões e envio de dado para fora. Rode o SkillSpector (comando na `varredura-de-seguranca`) e leia todos os arquivos; registre origem, versão fixada e licença em `padrao-agentes/origem-das-terceiras.json`. Instalar por `npx skills`, `curl | bash` ou link encurtado é proibido: copie à mão da origem oficial.
