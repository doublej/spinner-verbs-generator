import { findSet, loadSets } from './sets.js'
import { installVerbs, readSettings, resetVerbs } from './settings.js'
import type { VerbSet } from './types.js'

async function requireSet(name: string): Promise<VerbSet> {
  const set = await findSet(name)
  if (!set) {
    console.error(`Unknown verb set: "${name}"`)
    console.error('Run "claude-verbs list" to see available sets.')
    process.exit(1)
  }
  return set
}

export async function list(): Promise<void> {
  const sets = await loadSets()
  if (sets.length === 0) {
    console.log('No verb sets found.')
    return
  }
  console.log('Available verb sets:\n')
  for (const set of sets) {
    console.log(
      `  ${set.name} — ${set.description} (@${set.github}, ${set.config.spinnerVerbs.verbs.length} verbs)`,
    )
  }
}

export async function show(name: string): Promise<void> {
  const set = await requireSet(name)
  console.log(`${set.name} — ${set.description} (by ${set.author} @${set.github})`)
  console.log(`Mode: ${set.config.spinnerVerbs.mode}`)
  console.log(`Verbs (${set.config.spinnerVerbs.verbs.length}):\n`)
  for (const verb of set.config.spinnerVerbs.verbs) {
    console.log(`  ${verb}`)
  }
}

export async function install(name: string): Promise<void> {
  const set = await requireSet(name)
  await installVerbs(set)
  console.log(`Installed "${set.name}" (${set.config.spinnerVerbs.verbs.length} verbs).`)
}

export async function current(): Promise<void> {
  const settings = await readSettings()
  if (!settings.spinnerVerbs?.verbs?.length) {
    console.log('No custom spinner verbs installed (using defaults).')
    return
  }
  const { mode, verbs } = settings.spinnerVerbs
  console.log(`Mode: ${mode}`)
  console.log(`Verbs (${verbs.length}):\n`)
  for (const verb of verbs) {
    console.log(`  ${verb}`)
  }
}

export async function reset(): Promise<void> {
  await resetVerbs()
  console.log('Spinner verbs reset to defaults.')
}
