set shell := ["bash", "-euo", "pipefail", "-c"]

default:
	@just --list
	@echo ''
	@echo "branch: $(git branch --show-current 2>/dev/null || echo 'n/a')"

[group('setup')]
install:
	bun install

[group('setup')]
link:
	bun link

[group('develop')]
cli *args:
	bun src/cli.ts {{args}}

[group('quality')]
lint:
	bun run lint

[group('quality')]
lint-fix:
	bun run lint:fix

[group('quality')]
typecheck:
	bunx tsc --noEmit

[group('quality')]
test:
	bun run test

[group('quality')]
validate-sets:
	bun src/validate-sets.ts

[group('quality')]
loc-check:
	#!/usr/bin/env bash
	shopt -s globstar nullglob
	err=0
	for f in src/**/*.ts; do
	    lines=$(wc -l < "$f")
	    if (( lines > 400 )); then echo "error: $f ($lines lines, max 400)"; err=1
	    elif (( lines > 300 )); then echo "warn: $f ($lines lines, target ≤300)"; fi
	done
	exit $err

[group('quality')]
check:
	@echo '→ Checking file lengths...'
	just loc-check
	@echo '→ Validating sets...'
	just validate-sets
	@echo '→ Running lint...'
	just lint
	@echo '→ Running typecheck...'
	just typecheck
	@echo '→ Running tests...'
	just test
