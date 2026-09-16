<!-- padrao-elkys:gerado -->

# `.claude/` e `.agents/`: padrão de desenvolvimento

Padrão genérico, o mesmo em todos os repositórios. O fluxo **CCMA** escolhe quanto rigor a alteração
merece, em quatro níveis, e a skill `ccma` é a porta de entrada: comece por ela.

| Nível          | Quando                                                             | Quem faz                                                           |
| -------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| 0 · direto     | Sem lógica: texto, docs, estilo, config, conflito, merge, publicação | A sessão principal, sem subagente                                  |
| 1 · pequeno    | Até 3 arquivos, sem superfície sensível                             | Sessão principal planeja, codifica e testa; `reviewer` só do diff  |
| 2 · médio      | Mais arquivos, regra de negócio ou refatoração                      | Sessão principal planeja, codifica e testa; `reviewer` completo    |
| 3 · sensível   | Auth, permissão, RLS, migration, dinheiro, dado pessoal, dependência, infra, segredo | `planner`, código e teste na sessão principal, `reviewer` e `security-auditor` |

Duas coisas nunca saem: teste que prova a alteração, e revisão por quem não escreveu o código.
Na dúvida entre dois níveis, vale o mais alto. Pedir "CCMA completo" força o nível 3.

## Onde mora

- **Fonte da verdade: `~/.claude/` (global).** Mudança no padrão se faz lá.
- **Cópia neste repositório**, para quem clonar sem ter o padrão no perfil. Não edite a cópia: ela é
  sobrescrita pelo sincronizador.
- **`.agents/skills/` tem as mesmas skills**, para os agentes que leem essa pasta em vez de `.claude/`.
- **Skill específica deste projeto** segue o padrão `<projeto>-*`, mora só aqui e manda no detalhe: a
  genérica diz como pensar, a do projeto diz quais arquivos, números e decisões valem neste repositório.

## O que tem aqui

```
.claude/
├── agents/
│   ├── planner.md             plano da menor alteração, no nível 3        (sem escrita)
│   ├── coder.md               implementação, quando delegada de propósito
│   ├── tester.md              validação, quando delegada de propósito
│   ├── reviewer.md            revisão adversarial independente            (sem escrita)
│   ├── security-auditor.md    segurança, crítica bloqueia                 (sem escrita)
│   └── auditor-de-padroes.md  fora do PR: distância até o padrão em ondas (sem escrita)
└── skills/
    ├── ccma/                  escolhe o nível e orquestra
    ├── boas-praticas/         diretrizes de código, obrigatória antes do primeiro código
    ├── ponytail/              menos código, mesma qualidade
    ├── code-security/         escrever seguro por construção
    ├── owasp-security/        OWASP Top 10, ASVS e riscos de Agentic AI
    ├── security-review/       revisão de segurança do diff, antes do PR
    ├── audit-codebase/        auditoria do projeto inteiro, periódica
    ├── navegacao-web/         rotas, menus e arquitetura de informação
    ├── performance-web/       LCP, Core Web Vitals, bundle e build
    ├── web-3d/                3D e WebGL
    ├── (modelagem de banco e design, de terceiros: ver abaixo)
    └── (específicas do projeto, quando houver)
```

Os agentes sem escrita não têm Edit nem Write de propósito: quem escreve não aprova, e quem revisa
não conserta no meio da revisão.

## Sincronizar depois de mudar o global

```bash
node ~/.claude/padrao/sincronizar.mjs            # este repositório
node ~/.claude/padrao/sincronizar.mjs --conferir # só mostra o que mudaria
node ~/.claude/padrao/sincronizar.mjs --todos    # todos os repositórios das raízes
```

O hook de início de sessão já faz isso sozinho nos repositórios das raízes configuradas em
`~/.claude/padrao/config.json`. O sincronizador apaga o que sobrou dentro das pastas do padrão, troca
atalho por cópia real e não toca em `settings.json`, `settings.local.json` nem em skill de projeto.

## Skills de terceiros

Vêm copiadas de verdade, não por atalho, para funcionar em quem clona o repositório. Origem e licença
ficam em `~/.claude/padrao/config.json`, e o manifesto do instalador em `~/.claude/skills-lock.json`.
Antes de adotar mais uma, verifique origem, manutenção recente, licença e principalmente **o que ela
executa**: scripts, hooks instalados, downloads e envio de dado para fora.

- **Trail of Bits** (`trailofbits/skills`): bem mantido, mas licença CC-BY-SA-4.0 (copyleft), que
  contamina o repositório se o conteúdo for copiado. Use pelo marketplace:
  `/plugin marketplace add trailofbits/skills`.
- **Security Phoenix** (`Security-Phoenix-demo/security-skills-claude-code`): MIT, mas o `install.sh`
  instala hooks que interceptam todo comando Bash e integra APIs externas. Leia antes de considerar.
