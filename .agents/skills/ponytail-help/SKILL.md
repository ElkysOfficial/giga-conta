---
name: ponytail-help
description: >
  Quick reference for ponytail levels, skills and commands. One-shot display.
  Use for /ponytail-help, "ponytail help", "how do I use ponytail".
---

# Ponytail Help

Display this reference card when invoked. One-shot, do NOT change mode,
write flag files, or persist anything.

## Levels

| Level | Trigger | What change |
|-------|---------|-------------|
| **Lite** | `/ponytail lite` | Build what was asked, name the smaller option in one line. |
| **Full** | `/ponytail` | The smallest complete change, a check where the logic needs one, and a reply that names what was skipped and any risk. Default. |
| **Ultra** | `/ponytail ultra` | Also questions the request and pushes back before building. |

Level sticks until changed or session end.

## Skills

| Skill | Trigger | What it does |
|-------|---------|--------------|
| **ponytail** | `/ponytail` | Lazy mode itself: least new code, clear replies that name skipped work and risks. |
| **ponytail-review** | `/ponytail-review` | Quality review of a diff: bugs, security, load, missing tests, speed, what to cut. Each finding says what goes wrong and how to fix it. |
| **ponytail-audit** | `/ponytail-audit` | The same quality review for the whole repo, ranked. |
| **ponytail-debt** | `/ponytail-debt` | Harvest `shortcut:` comments into a tracked ledger. |
| **ponytail-gain** | `/ponytail-gain` | Measured-impact scoreboard: less code, less cost, more speed. |
| **ponytail-help** | `/ponytail-help` | This card. |

In Codex CLI and the IDE extension, invoke skills with `$ponytail:ponytail`,
`$ponytail:ponytail-review`, or `$ponytail:ponytail-help`. Claude Code and OpenCode use the
slash-command forms above (OpenCode ships all six as slash commands).

## Deactivate

Say "stop ponytail" or "normal mode". Resume anytime with `/ponytail`.
`/ponytail off` also works.

## Band (Claude Code)

`/ponytail band` hides the band above the prompt, the same command brings it back.
`/ponytail band on` and `/ponytail band off` set it directly. The level stays.
`/ponytail band import` adds your past Claude Code sessions (cost, agent time, tokens) to the board.

## Configure Default Mode

Default mode = `full`, auto-active every session. Change it:

**Environment variable** (highest priority):
```bash
export PONYTAIL_DEFAULT_MODE=ultra
```

**Config file** (`~/.config/ponytail/config.json`, Windows: `%APPDATA%\ponytail\config.json`):
```json
{ "defaultMode": "lite" }
```

Set `"off"` to disable auto-activation on session start, activate manually
with `/ponytail` when wanted.

Resolution: env var > config file > `full`.

## Update

Enable auto-update once: open `/plugin`, go to Marketplaces, pick ponytail, Enable auto-update. Claude Code then pulls new versions at startup (run `/reload-plugins` when it prompts). Manual refresh: `/plugin marketplace update ponytail` then `/reload-plugins`.

If `/plugin` is not recognized, your Claude Code is out of date. Update it (`npm install -g @anthropic-ai/claude-code@latest`, or `brew upgrade claude-code`) and restart. Other hosts use their own update flow.

## More

Full docs + examples: https://github.com/DietrichGebert/ponytail

## Na Elkys

Acréscimo da Elkys, fora do texto original (o resto deste arquivo é o `DietrichGebert/ponytail` v5.3.2, MIT, sem alteração, ver `LICENSE`):

- Responda e escreva os relatórios em **português**, no mesmo estilo simples que o texto pede.
- A `ccma` e a `boas-praticas` (com o `REGRAS.md`) vencem em conflito: menor diff nunca passa por cima de preservar 100% das regras de negócio, condição que parece sobrando só sai com prova de que não é regra, e alteração de lógica sempre leva o teste que a prova, mesmo quando o texto acima a chamaria de trivial.
- Na Elkys o plugin vem fixado pelo `.claude/settings.json` de cada repositório (robô da governança e `sdk-elkys`). **Band** e **Configure Default Mode** valem como escrito. **Update** não: o plugin vem do fork arquivado `ElkysOfficial/ponytail`, na tag fixada, com auto-update desligado, e a versão só muda por PR em `padrao-agentes/settings-plugins.json` do ci-templates. Esta cópia em `.agents/skills/` serve ao Codex e a outros agentes.
