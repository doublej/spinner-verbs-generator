import { readFile, readdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import type { VerbSet } from './types.js'

const setsDir = resolve(import.meta.dirname, '..', 'sets')

function normalizeVerbLine(line: string): string {
  return line.replace(/^\s*I(?:[\u2019']m| am)\s+/i, '')
}

export async function loadSets(): Promise<VerbSet[]> {
  const entries = await readdir(setsDir, { withFileTypes: true })
  const langDirs = entries.filter((e) => e.isDirectory() && !e.name.startsWith('_'))
  const sets = await Promise.all(langDirs.map((d) => loadLangSets(d.name)))
  return sets.flat()
}

async function loadLangSets(language: string): Promise<VerbSet[]> {
  const dir = join(setsDir, language)
  const jsonFiles = await listJsonFilesRecursive(dir)
  return Promise.all(jsonFiles.map((f) => loadSet(f, language)))
}

async function loadSet(path: string, language: string): Promise<VerbSet> {
  const raw = await readFile(path, 'utf-8')
  const data = JSON.parse(raw) as Omit<VerbSet, 'language'>
  data.config.spinnerVerbs.verbs = data.config.spinnerVerbs.verbs.map(normalizeVerbLine)
  return { ...data, language }
}

async function listJsonFilesRecursive(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const files: string[] = []
  for (const entry of entries) {
    if (entry.name.startsWith('_')) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await listJsonFilesRecursive(full)))
      continue
    }
    if (entry.isFile() && entry.name.endsWith('.json')) files.push(full)
  }
  return files
}

export async function findSet(name: string): Promise<VerbSet | undefined> {
  const sets = await loadSets()
  return sets.find((s) => s.name === name)
}
