# claude-verbs-cli

Themed spinner verb sets for Claude Code.

## Install

### From GitHub (recommended)

```bash
# Install globally
bun install -g github:doublej/claude-verbs-cli

# Then use it
claude-verbs list
```

### For development

```bash
git clone https://github.com/doublej/claude-verbs-cli
cd claude-verbs-cli
bun install
bun link   # makes `claude-verbs` available globally
```

## Usage

```bash
claude-verbs list              # Show available verb sets
claude-verbs install freddy    # Apply a verb set
claude-verbs current           # Show installed verbs
claude-verbs reset             # Restore defaults
```

## Adding a verb set

Create a JSON file in `sets/`:

```json
{
  "name": "my-set",
  "description": "My custom spinner verbs",
  "author": "You",
  "config": {
    "showTurnDuration": false,
    "spinnerVerbs": {
      "mode": "replace",
      "verbs": ["Doing thing one", "Doing thing two"]
    }
  }
}
```

## Development

```bash
just cli list       # Run CLI in dev mode
just check          # Run all quality checks
just test           # Run tests
```
