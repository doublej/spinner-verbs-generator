# claude-verbs-cli

> Themed spinner verb sets for Claude Code

## Stack

- TypeScript, bun, Biome, Vitest

## Commands

Use `just` as the task runner:

- `just check` — run all checks (loc-check + lint + typecheck + test)
- `just loc-check` — check file lengths (warn >300, error >400 lines)
- `just cli <command>` — run the CLI
- `just test` — run tests
- `just lint-fix` — auto-fix lint issues
- `just link` — link binary globally via bun

## Project Structure

```
src/
├── cli.ts          # entry point, arg parsing, command dispatch
├── commands.ts     # list, install, current, reset implementations
├── settings.ts     # read/write ~/.claude/settings.json
├── sets.ts         # load verb sets from sets/ directory
└── types.ts        # VerbSet, ClaudeSettings interfaces
sets/
└── freddy.json     # Freddy-themed Dutch verbs
```

## CLI Usage

```
claude-verbs list              Show available verb sets
claude-verbs install <name>    Apply a verb set to Claude Code
claude-verbs current           Show currently installed spinner verbs
claude-verbs reset             Remove spinner verbs (restore defaults)
```

## Conventions

- ES modules (`"type": "module"`)
- Strict TypeScript config
- Biome for linting and formatting (not ESLint/Prettier)
- Keep functions small (5–10 lines target, 20 max)
- Prefer explicit, readable code over cleverness
- Handle errors at boundaries; let unexpected errors surface
