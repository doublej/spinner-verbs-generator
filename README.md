# claude-verbs-cli

Themed spinner verb sets for Claude Code.

Browse all sets at [claudeverbs.com](https://claudeverbs.com).

## Usage

```bash
bunx github:doublej/claude-verbs-cli list              # Show available verb sets
bunx github:doublej/claude-verbs-cli list --language nl # Filter by language
bunx github:doublej/claude-verbs-cli install freddy    # Apply a verb set
bunx github:doublej/claude-verbs-cli current           # Show installed verbs
bunx github:doublej/claude-verbs-cli reset             # Restore defaults
bunx github:doublej/claude-verbs-cli prompt "topic" --language nl_NL  # Generate prompt in Dutch
```

### For development

```bash
git clone https://github.com/doublej/claude-verbs-cli
cd claude-verbs-cli
bun install
bun link   # makes `claude-verbs` available globally
```

## Adding a verb set

Create a JSON file in `sets/<lang>/`:

```json
{
  "name": "my-set",
  "description": "My custom spinner verbs",
  "author": "You",
  "github": "your-github-username",
  "language": "en_GB",
  "config": {
    "showTurnDuration": false,
    "spinnerVerbs": {
      "mode": "replace",
      "verbs": ["Doing thing one", "Doing thing two"]
    }
  }
}
```

Supported languages: `en_GB`, `nl_NL`, `de_DE`, `fr_FR`, `es_ES`, `it_IT`, `pt_PT`, `ja_JP`.

For more sets, visit [claudeverbs.com](https://claudeverbs.com).

## Development

```bash
just cli list       # Run CLI in dev mode
just check          # Run all quality checks
just test           # Run tests
```
