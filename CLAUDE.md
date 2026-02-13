# claude-verbs-cli

> Themed spinner verb sets for Claude Code

## Stack

- TypeScript, bun, Biome, Vitest

## Commands

Use `just` as the task runner:

- `just install` — install deps
- `just check` — run all checks (loc-check + validate-sets + lint + typecheck + test)
- `just loc-check` — check file lengths (warn >300, error >400 lines)
- `just validate-sets` — validate all verb set JSON files
- `just cli <command>` — run the CLI
- `just test` — run tests
- `just typecheck` — run TypeScript type checking
- `just lint-fix` — auto-fix lint issues
- `just link` — link binary globally via bun
- `just sync-sets` — sync sets from community repo

## Project Structure

```
src/
├── cli.ts              # entry point, arg parsing, command dispatch
├── commands.ts         # list, install, current, reset, show implementations
├── display.ts          # banner, heading, footer, formatting helpers
├── prompt.ts           # generate verb set creation prompts
├── settings.ts         # read/write ~/.claude/settings.json
├── sets.ts             # load verb sets from sets/ directory
├── types.ts            # VerbSet, ClaudeSettings interfaces
├── validate-sets.ts    # validate all sets against schema
├── *.test.ts           # co-located tests
sets/
├── schema.json         # JSON Schema for verb sets
├── _template.json      # template for new sets
└── *.json              # verb sets (flat, language in JSON field)
```

## CLI Usage

Run directly: `bunx github:doublej/claude-verbs-cli#main <command>`
Or install globally: `bun install -g github:doublej/claude-verbs-cli#main`

```
claude-verbs list [--language <code>]              Show available verb sets
claude-verbs show <name>                           Show contents of a verb set
claude-verbs install <name>                        Apply a verb set to Claude Code
claude-verbs current                               Show currently installed spinner verbs
claude-verbs reset                                 Remove spinner verbs (restore defaults)
claude-verbs prompt <subject> [--language <locale>] Generate a prompt for creating a new verb set
```

Supported languages: `en_GB`, `en_US`, `nl_NL`, `de_DE`, `fr_FR`, `es_ES`, `it_IT`, `pt_PT`, `ja_JP`.

Browse more sets at https://claudeverbs.com

## Conventions

- ES modules (`"type": "module"`)
- Strict TypeScript config
- Biome for linting and formatting (not ESLint/Prettier)
- Keep functions small (5–10 lines target, 20 max)
- Prefer explicit, readable code over cleverness
- Handle errors at boundaries; let unexpected errors surface
