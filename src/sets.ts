import { readFile, readdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import type { VerbSet } from './types.js'

const setsDir = resolve(import.meta.dirname, '..', 'sets')

function normalizeVerbLine(line: string): string {
  return line.replace(/^\s*I(?:[\u2019']m| am)\s+/i, '')
}

export async function loadSets(): Promise<VerbSet[]> {
  const entries = await readdir(setsDir, { withFileTypes: true })
  const jsonFiles = entries.filter(
    (e) =>
      e.isFile() && e.name.endsWith('.json') && !e.name.startsWith('_') && e.name !== 'schema.json',
  )
  return Promise.all(jsonFiles.map((f) => loadSet(join(setsDir, f.name))))
}

async function loadSet(path: string): Promise<VerbSet> {
  const raw = await readFile(path, 'utf-8')
  const data = JSON.parse(raw) as VerbSet
  data.config.spinnerVerbs.verbs = data.config.spinnerVerbs.verbs.map(normalizeVerbLine)
  return data
}

export async function findSet(name: string): Promise<VerbSet | undefined> {
  const sets = await loadSets()
  return sets.find((s) => s.name === name)
}
