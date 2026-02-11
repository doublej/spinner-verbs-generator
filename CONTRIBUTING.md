# Contributing a Verb Set

Claude verbs are the animated status messages shown in Claude Code's spinner while it thinks. This project lets you create themed sets of these verbs.

## What makes a good verb set?

- **30–50 verbs** — enough variety to stay fresh
- **Thematically consistent** — pick a theme and stick to it
- **Short phrases** — 2–4 words work best as spinner text
- **Fun and creative** — these are meant to make waiting enjoyable

## How to contribute

### 1. Fork and clone

```sh
gh repo fork doublej/claude-verbs-cli --clone
cd claude-verbs-cli
bun install
```

### 2. Create your set file

Copy the template into the right language directory:

```sh
cp sets/_template.json sets/<lang>/your-set-name.json
```

Use [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) language codes (`nl`, `en`, `de`, `fr`, etc.). Create the directory if it doesn't exist.

### 3. Fill in your verbs

Edit the file — the filename (without `.json`) must match the `name` field:

```json
{
  "$schema": "../schema.json",
  "name": "your-set-name",
  "description": "A short description of your theme",
  "author": "Your Name",
  "github": "your-github-username",
  "language": "en_GB",
  "config": {
    "spinnerVerbs": {
      "mode": "replace",
      "verbs": [
        "First verb phrase",
        "Second verb phrase"
      ]
    }
  }
}
```

Set `language` to a locale code matching the directory (e.g. `en_GB` for `en/`, `nl_NL` for `nl/`, `de_DE` for `de/`).

Supported languages: `en_GB`, `nl_NL`, `de_DE`, `fr_FR`, `es_ES`, `it_IT`, `pt_PT`, `ja_JP`.

Note: set `$schema` to `"../schema.json"` (relative to your language subdirectory).

### 4. Validate locally

```sh
bun src/validate-sets.ts
bun run test
```

### 5. Open a PR

```sh
git checkout -b add-your-set-name
git add sets/<lang>/your-set-name.json
git commit -m "add: your-set-name verb set"
git push -u origin add-your-set-name
gh pr create
```

CI will validate your set automatically.

## Rules

- Filename must match the `name` field (kebab-case, lowercase)
- `github` must be your GitHub username (used for attribution)
- `language` must be a valid locale code (e.g. `en_GB`, `nl_NL`) matching the directory
- No duplicate verbs within a set
- Must pass `sets/schema.json` validation
- Keep it respectful — sets with offensive content will be rejected
- `mode` should be `"replace"` (replaces default verbs) or `"append"` (adds to defaults)

Browse existing sets at [claudeverbs.com](https://claudeverbs.com) for inspiration.
