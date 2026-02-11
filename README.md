# spinner-verbs

Themed spinner verb sets for Claude Code.

## Install

### From GitHub (recommended)

```bash
# Install globally
bun install -g github:doublej/spinner-verbs-generator

# Or run without installing
bunx github:doublej/spinner-verbs-generator list
```

### For development

```bash
git clone https://github.com/doublej/spinner-verbs-generator
cd spinner-verbs-generator
bun install
bun link   # makes `spinner-verbs` available globally
```

## Usage

```bash
spinner-verbs list              # Show available verb sets
spinner-verbs install freddy    # Apply a verb set
spinner-verbs current           # Show installed verbs
spinner-verbs reset             # Restore defaults
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
