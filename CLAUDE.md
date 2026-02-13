# claude-verbs-cli

> Themed spinner verb sets for Claude Code

## Stack

- TypeScript, bun, Biome, Vitest

## Commands

Use `just` as the task runner:

- `just check` — run all checks (loc-check + validate-sets + lint + typecheck + test)
- `just loc-check` — check file lengths (warn >300, error >400 lines)
- `just validate-sets` — validate all verb set JSON files
- `just cli <command>` — run the CLI
- `just test` — run tests
- `just lint-fix` — auto-fix lint issues
- `just link` — link binary globally via bun

## Project Structure

```
src/
├── cli.ts              # entry point, arg parsing, command dispatch
├── commands.ts         # list, install, current, reset, show implementations
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

```
bunx github:doublej/claude-verbs-cli list [--language <code>]              Show available verb sets
bunx github:doublej/claude-verbs-cli show <name>                           Show contents of a verb set
bunx github:doublej/claude-verbs-cli install <name>                        Apply a verb set to Claude Code
bunx github:doublej/claude-verbs-cli current                               Show currently installed spinner verbs
bunx github:doublej/claude-verbs-cli reset                                 Remove spinner verbs (restore defaults)
bunx github:doublej/claude-verbs-cli prompt <subject> [--language <locale>] Generate a prompt for creating a new verb set
```

Supported languages: `en_GB`, `nl_NL`, `de_DE`, `fr_FR`, `es_ES`, `it_IT`, `pt_PT`, `ja_JP`.

Browse more sets at https://claudeverbs.com

## Conventions

- ES modules (`"type": "module"`)
- Strict TypeScript config
- Biome for linting and formatting (not ESLint/Prettier)
- Keep functions small (5–10 lines target, 20 max)
- Prefer explicit, readable code over cleverness
- Handle errors at boundaries; let unexpected errors surface
