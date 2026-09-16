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

## Antes de começar: `boas-praticas`

Carregue a skill `boas-praticas` antes de qualquer código, em todos os níveis com lógica. Se o projeto tiver documento próprio (`docs/boas-praticas.md` ou equivalente) ou skills `<projeto>-*`, eles mandam no detalhe do stack.

## Escolha o nível

Classifique **antes** de começar e diga o nível ao usuário em uma linha. Na dúvida entre dois níveis, use o mais alto.

| Nível | Quando | Quem faz |
| --- | --- | --- |
| **0 · direto** | Sem lógica: texto, comentário, docs, estilo sem condição, config sem efeito em segurança, resolver conflito, merge, publicação, rodar verificação | A sessão principal, sem subagente |
| **1 · pequeno** | Até 3 arquivos de código, sem superfície sensível, sem mudar regra de negócio | A sessão principal planeja, codifica e testa. Depois um `reviewer` **só do diff** |
| **2 · médio** | Mais de 3 arquivos, ou mexe em regra de negócio, ou refatoração, sem superfície sensível | A sessão principal planeja, codifica e testa. Depois um `reviewer` completo (diff, arquivos tocados e quem os chama) |
| **3 · sensível** | Toca qualquer superfície sensível (lista abaixo) ou é funcionalidade nova com dado de cliente | `planner`, depois a sessão principal codifica e testa, depois `reviewer` e `security-auditor` |

**Superfície sensível** (qualquer uma leva ao nível 3): autenticação, sessão, autorização, permissão, RLS, migration ou schema, dinheiro (cobrança, pagamento, saldo), dado pessoal, upload ou arquivo, rede externa ou webhook, segredo, HTML renderizado de entrada do usuário, dependência nova ou atualizada, infra, CI e deploy.

**O usuário manda no nível.** "CCMA completo" ou "nível 3" roda o nível 3 mesmo em mudança pequena. "Sem agente" ou "direto" vale só para nível 0 e 1; em superfície sensível, diga em uma frase o que se perde e siga o que o usuário decidir.

## O que a sessão principal faz em cada papel

Nos níveis 1, 2 e 3 a sessão principal assume o Coder e o Tester, e nos níveis 1 e 2 também o Planner. Assumir o papel é cumprir o que o agente cumpriria, não pular:

- **Plano (níveis 1 e 2):** antes do código, em poucas linhas: comportamento atual, arquivos tocados, quem chama o que muda (buscado, não suposto), mudança de comportamento declarada ou "nenhuma".
- **Código:** menor alteração possível, dentro de `boas-praticas`.
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

`boas-praticas` é obrigatória e vem antes (ver topo). As demais, conforme o risco, não por protocolo:

- `ponytail`: antes de escrever, isto precisa existir?
- `code-security`: durante a escrita, em código que toque entrada, banco, arquivo, rede, saída ou identidade.
- `owasp-security`: autenticação, autorização, sessão, API ou agente/IA.
- `security-review`: revisão de segurança do diff, antes do PR (pode substituir o `security-auditor` no nível 2 quando o diff encostar em algo sensível de leve).
- `audit-codebase`: auditoria do projeto inteiro, periódica; não é etapa de PR.
- `navegacao-web`, `performance-web`, `web-3d`: rota e navegação, build e performance, 3D.
- Modelagem de banco (`relational-database-design`, `postgresql-table-design`, `database-schema-designer` e afins): ao desenhar tabela nova; a skill de banco do projeto, se houver, manda sobre elas.

## Ferramenta externa

Não rode ferramenta só para constar. Use análise estática adicional (Semgrep/OpenGrep, scanner de dependência, scanner de segredo) quando o risco justificar, e leia o resultado com ceticismo: scanner produz falso positivo.

Antes de adotar skill ou plugin de terceiro, verifique origem, manutenção recente, licença e principalmente **o que ele executa**: scripts, hooks, downloads, permissões e envio de dado para fora.
