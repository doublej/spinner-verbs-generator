# claude-verbs-cli

CLI tool for installing and managing themed spinner verb sets for Claude Code.

Browse available sets at [claudeverbs.com](https://claudeverbs.com).

## Quick Start

Run directly without installing (always fetches the latest version):

```bash
bunx github:doublej/claude-verbs-cli#main list
bunx github:doublej/claude-verbs-cli#main install <name>
```

## Install Globally

For a shorter command, install once and update any time by re-running:

```bash
bun install -g github:doublej/claude-verbs-cli#main
```

Then use `claude-verbs` directly:

```bash
claude-verbs list                              # Show available verb sets
claude-verbs list --language nl                # Filter by language
claude-verbs show <name>                       # Show one set
claude-verbs install <name>                    # Apply a verb set
claude-verbs current                           # Show installed verbs
claude-verbs reset                             # Restore defaults
claude-verbs prompt "topic" --language nl_NL   # Generate a set prompt
```

## Contributing

This repository does not accept pull requests. For bug reports, [open an issue](https://github.com/doublej/claude-verbs-cli/issues).

Submit verb sets via PR in the community repository: [doublej/claude-verbs](https://github.com/doublej/claude-verbs)

- Guide: [doublej/claude-verbs/CONTRIBUTING.md](https://github.com/doublej/claude-verbs/blob/main/CONTRIBUTING.md)
