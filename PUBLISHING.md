# Publishing to npm

## Note on GitHub vs npm

This package is optimized for **GitHub installation with bun**:
- `bin` points to `src/cli.ts` (TypeScript source)
- Uses `#!/usr/bin/env bun` shebang

For npm publishing, you'd need to:
1. Build to `dist/`
2. Update `bin` to point to `dist/cli.js`
3. Change shebang to `#!/usr/bin/env node`

**Recommendation**: Stick with GitHub installation for now.

## Prerequisites (if publishing to npm)

1. npm account (create at https://www.npmjs.com/signup)
2. Login via CLI: `npm login`

## Pre-publish checklist

- [ ] All tests pass: `bun test`
- [ ] No lint errors: `bun run lint`
- [ ] Version bumped in package.json (follow semver)
- [ ] CHANGELOG updated (if you maintain one)

## Publishing

The `prepublishOnly` script will automatically:
- Build TypeScript to JavaScript
- Run tests
- Run linter

```bash
# Dry run (see what would be published)
npm publish --dry-run

# Publish to npm
npm publish
```

## Post-publish

- Tag the release in git: `git tag v0.1.0 && git push --tags`
- Test installation: `npm install -g claude-verbs-cli`

## Package name availability

Before first publish, check if the name is available:
```bash
npm view claude-verbs-cli
```

If taken, you can:
- Choose a different name (update package.json)
- Use a scoped package: `@yourname/claude-verbs-cli`
