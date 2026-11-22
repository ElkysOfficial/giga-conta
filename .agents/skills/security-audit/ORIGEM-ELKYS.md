# Origem desta cópia (nota da Elkys, não faz parte da skill original)

- Origem: https://github.com/cloudflare/security-audit-skill, pasta `skills/security-audit`.
- Versão fixada: commit `c1c8a8c1471069fb0e188eeaff69b8e8db6564a8` (14/09/2026, "Clarify guidance and full audit modes").
- Licença: MIT, Copyright (c) 2025-2026 Cloudflare, Inc. (arquivo `LICENSE` desta pasta).
- Cópia feita à mão: os `.md` e o `report-schema.json` são idênticos aos do commit acima. Nada de `npx skills`, nada de fork.
- Os arquivos `.md` foram lidos por inteiro antes da inclusão: só instrução em texto. Não há hook, download, envio de dado nem script neles.

## O que ficou de fora

Os quatro arquivos `.cjs` (`validate-findings.cjs`, `validate-coverage-ledger.cjs` e os dois `.test.cjs`) não foram incluídos: o pacote da Elkys só distribui texto e dados. O `SKILL.md` manda rodá-los nas fases 4 e 5. Sem eles, valide o `findings.json` e o `coverage-ledger.json` à mão contra o `report-schema.json` e declare no relatório que os validadores automáticos não rodaram. Para adotá-los, o dono aprova a inclusão dos `.cjs` do mesmo commit, depois de revisão.

## Como a Elkys usa

- Modo orientação (padrão da skill): checklist do `security-auditor` e leitura de classes de ataque. Vale para qualquer revisão.
- Modo auditoria completa: só em auditoria periódica pedida pelo dono (ver `varredura-de-seguranca`). Ele dispara muitos subagentes e consome muito token.
- Este ambiente não tem sandbox de SO sem rede. Sem o sandbox, a própria skill proíbe executar código do alvo: tudo fica em leitura e o que dependeria de execução vira `needs_validation`. Não contorne.
- O relatório vai para fora do repositório auditado (padrão `~/security-audit-skill/<repo>/run-<N>`). Nunca grave dentro do projeto, e nunca copie valor de segredo para o relatório.
