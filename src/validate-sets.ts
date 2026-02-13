import { readFile, readdir } from 'node:fs/promises'
import { basename, join, resolve } from 'node:path'

const setsDir = resolve(import.meta.dirname, '..', 'sets')

interface Issue {
  file: string
  message: string
}

type Result = { errors: Issue[]; warnings: Issue[] }

const LOCALE_RE = /^[a-z]{2}_[A-Z]{2}$/
const NAME_RE = /^[a-z0-9-]+$/
const GITHUB_RE = /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38}$/

function validateMeta(file: string, data: Record<string, unknown>): Issue[] {
  const errors: Issue[] = []
  for (const field of ['name', 'description', 'author', 'github', 'language', 'config']) {
    if (!(field in data)) errors.push({ file, message: `Missing required field: ${field}` })
  }
  if (errors.length > 0) return errors

  const name = data.name as string
  if (!NAME_RE.test(name)) {
    errors.push({ file, message: `Invalid name "${name}" — must match ${NAME_RE}` })
  }
  const expectedName = basename(file, '.json')
  if (name !== expectedName) {
    errors.push({ file, message: `Name "${name}" does not match filename "${expectedName}"` })
  }
  const github = data.github as string
  if (!GITHUB_RE.test(github)) {
    errors.push({ file, message: `Invalid github "${github}" — must be a valid GitHub username` })
  }
  const locale = data.language as string
  if (!LOCALE_RE.test(locale)) {
    errors.push({ file, message: `Invalid language "${locale}" — must match xx_XX (e.g. en_GB)` })
  }
  return errors
}

function extractSpinnerVerbs(
  file: string,
  data: Record<string, unknown>,
): { sv: Record<string, unknown>; error?: Issue } {
  const config = data.config as Record<string, unknown> | undefined
  if (!config || typeof config !== 'object')
    return { sv: {}, error: { file, message: 'config must be an object' } }

  const sv = config.spinnerVerbs as Record<string, unknown> | undefined
  if (!sv || typeof sv !== 'object')
    return { sv: {}, error: { file, message: 'config.spinnerVerbs is required' } }

  return { sv }
}

function checkVerbArray(file: string, verbs: unknown[]): Issue[] {
  const errors: Issue[] = []
  for (const [i, v] of verbs.entries()) {
    if (typeof v !== 'string' || v.length === 0)
      errors.push({ file, message: `verbs[${i}] must be a non-empty string` })
  }
  const unique = new Set(verbs)
  if (unique.size !== verbs.length) {
    const dupes = verbs.filter((v, i) => verbs.indexOf(v) !== i)
    errors.push({ file, message: `Duplicate verbs: ${dupes.join(', ')}` })
  }
  return errors
}

function validateVerbs(file: string, data: Record<string, unknown>): Result {
  const { sv, error } = extractSpinnerVerbs(file, data)
  if (error) return { errors: [error], warnings: [] }

  const errors: Issue[] = []
  if (sv.mode !== 'replace' && sv.mode !== 'append') {
    errors.push({ file, message: `Invalid mode "${sv.mode}" — must be "replace" or "append"` })
  }

  const verbs = sv.verbs
  if (!Array.isArray(verbs) || verbs.length === 0) {
    return { errors: [{ file, message: 'verbs must be a non-empty array' }], warnings: [] }
  }

  errors.push(...checkVerbArray(file, verbs))

  const warnings: Issue[] = []
  if (verbs.length < 15) warnings.push({ file, message: `Only ${verbs.length} verbs (minimum 15)` })
  if (verbs.length > 100) warnings.push({ file, message: `${verbs.length} verbs (maximum 100)` })

  return { errors, warnings }
}

async function validateSet(filePath: string): Promise<Result> {
  const file = basename(filePath)
  let data: Record<string, unknown>
  try {
    const raw = await readFile(filePath, 'utf-8')
    data = JSON.parse(raw)
  } catch {
    return { errors: [{ file, message: 'Invalid JSON' }], warnings: [] }
  }

  const metaErrors = validateMeta(file, data)
  if (metaErrors.length > 0) return { errors: metaErrors, warnings: [] }

  return validateVerbs(file, data)
}

async function main(): Promise<void> {
  const entries = await readdir(setsDir, { withFileTypes: true })
  const jsonFiles = entries.filter(
    (e) =>
      e.isFile() && e.name.endsWith('.json') && !e.name.startsWith('_') && e.name !== 'schema.json',
  )

  let totalErrors = 0
  let totalWarnings = 0

  for (const entry of jsonFiles) {
    const filePath = join(setsDir, entry.name)
    const { errors, warnings } = await validateSet(filePath)
    for (const e of errors) {
      console.error(`error: ${e.file}: ${e.message}`)
      totalErrors++
    }
    for (const w of warnings) {
      console.warn(`warn: ${w.file}: ${w.message}`)
      totalWarnings++
    }
  }

  console.log(`\nValidation complete: ${totalErrors} error(s), ${totalWarnings} warning(s)`)
  if (totalErrors > 0) process.exit(1)
}

main()
