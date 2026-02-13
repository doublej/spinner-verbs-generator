import { describe, expect, it } from 'vitest'
import { findSet, loadSets } from './sets.js'

describe('loadSets', () => {
  it('loads all sets from flat directory', async () => {
    const sets = await loadSets()
    expect(sets.length).toBeGreaterThan(0)
    expect(sets[0]).toHaveProperty('name')
    expect(sets[0]).toHaveProperty('language')
    expect(sets[0]).toHaveProperty('config.spinnerVerbs.verbs')
  })

  it('reads language from JSON files', async () => {
    const sets = await loadSets()
    const nlSets = sets.filter((s) => s.language === 'nl_NL')
    expect(nlSets.length).toBe(4)
  })

  it('strips leading first-person prefixes from loaded verbs', async () => {
    const set = await findSet('idiot')
    expect(set).toBeDefined()
    const verbs = set?.config.spinnerVerbs.verbs ?? []
    expect(verbs.length).toBeGreaterThan(0)
    for (const verb of verbs) {
      expect(verb).not.toMatch(/^\s*I(?:['\u2019]m| am)\s+/i)
    }
  })
})

describe('findSet', () => {
  it('finds a set by name', async () => {
    const set = await findSet('jiskefet')
    expect(set).toBeDefined()
    expect(set?.name).toBe('jiskefet')
    expect(set?.language).toBe('nl_NL')
    expect(set?.config.spinnerVerbs.verbs.length).toBeGreaterThan(0)
  })

  it('returns undefined for unknown set', async () => {
    const set = await findSet('nonexistent')
    expect(set).toBeUndefined()
  })
})
