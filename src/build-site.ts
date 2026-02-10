import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fetchAllAuthors } from './github.js'
import { loadSets } from './sets.js'

interface SetDisplay {
  name: string
  description: string
  author: string
  github: string
  language: string
  verbCount: number
  verbs: string[]
}

async function build(): Promise<void> {
  const sets = await loadSets()
  const displays = sets.map(toDisplay)
  const grouped = groupByLanguage(displays)

  const usernames = [...new Set(displays.map((s) => s.github))]
  console.log(`Fetching GitHub data for ${usernames.length} author(s)...`)
  const authors = await fetchAllAuthors(usernames)

  const templatePath = resolve(import.meta.dirname, '..', 'templates', 'marketplace.html')
  const template = await readFile(templatePath, 'utf-8')

  const setsInjection = `<script>const SETS = ${JSON.stringify(grouped)}; const AUTHORS = ${JSON.stringify(authors)}</script>`

  const outDir = resolve(import.meta.dirname, '..', 'site')
  await mkdir(outDir, { recursive: true })

  const pages = ['marketplace', 'pixi-preview'] as const
  for (const page of pages) {
    const tplPath = resolve(import.meta.dirname, '..', 'templates', `${page}.html`)
    const tpl = await readFile(tplPath, 'utf-8')
    const outName = page === 'marketplace' ? 'index.html' : `${page}.html`
    await writeFile(resolve(outDir, outName), tpl.replace('<!--SETS_DATA-->', setsInjection))
  }

  console.log(
    `Built site/ (${Object.keys(grouped).length} languages, ${sets.length} sets, ${pages.length} pages)`,
  )
}

function toDisplay(set: {
  name: string
  description: string
  author: string
  github: string
  language: string
  config: { spinnerVerbs: { verbs: string[] } }
}): SetDisplay {
  return {
    name: set.name,
    description: set.description,
    author: set.author,
    github: set.github,
    language: set.language,
    verbCount: set.config.spinnerVerbs.verbs.length,
    verbs: set.config.spinnerVerbs.verbs,
  }
}

function groupByLanguage(sets: SetDisplay[]): Record<string, SetDisplay[]> {
  const grouped: Record<string, SetDisplay[]> = {}
  for (const set of sets) {
    const lang = set.language
    if (!grouped[lang]) grouped[lang] = []
    grouped[lang].push(set)
  }
  return grouped
}

build()
