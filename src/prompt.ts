import { hint } from './display.js'

const LOCALE_TO_LANG: Record<string, string> = {
  en_GB: 'English',
  en_US: 'English',
  nl_NL: 'Dutch',
  de_DE: 'German',
  fr_FR: 'French',
  es_ES: 'Spanish',
  it_IT: 'Italian',
  pt_PT: 'Portuguese',
  ja_JP: 'Japanese',
}

function resolveLocale(language?: string): string {
  if (!language) return 'en_GB'
  if (LOCALE_TO_LANG[language]) return language
  const match = Object.keys(LOCALE_TO_LANG).find((k) => k.startsWith(language))
  return match ?? 'en_GB'
}

export function buildPrompt(subject: string, language?: string): string {
  const locale = resolveLocale(language)
  const langName = LOCALE_TO_LANG[locale] ?? 'English'

  return `SUBJECT: ${subject}

You are generating a Claude Code spinnerVerbs configuration inspired by the SUBJECT.

Goal:
Create a funny, high-quality set of short spinner "actions" that feel recognizably inspired by the SUBJECT's style, characters, recurring bits, or vibe.

Hard rules:
- Output MUST be valid JSON only (no commentary, no markdown).
- JSON shape MUST be exactly:
  {
    "$schema": "./schema.json",
    "name": "<lowercase-kebab-case-name>",
    "displayName": "<Human-Readable Title>",
    "category": "<entertainment|music|gaming|literature|science|tech|sport|culture|original>",
    "description": "<short description of the theme>",
    "author": "<your-name>",
    "github": "<github-username>",
    "language": "${locale}",
    "config": {
      "spinnerVerbs": {
        "mode": "replace",
        "verbs": [ ... ]
      }
    }
  }
- Generate 15–100 items in "verbs" (aim for 50).
- Language: write every spinner verb in ${langName}.
- Every item MUST be an action phrase (something someone can do), not a bare noun or standalone quote.
  - Action-form examples: "Whisper the password", "Check the receipts", "Order another coffee", "Argue about rules", "Pretend it's fine".
- Keep each item short: 2–6 words max.
- Do not prepend items with "I'm", "I am", or similar subject prefixes.
- No ending punctuation. No emojis.
- No duplicates or near-duplicates (including trivial rewordings).
- Copyright/accuracy guardrail:
  - Do NOT reproduce long verbatim lines.
  - If you reference a recognizable catchphrase, keep it extremely short (1–3 words) and convert it into an action (e.g., "Say <catchphrase>").
  - Prefer paraphrases and "inspired-by" wording over exact quotes.

Quality requirements:
- Make the set varied: mix "say/do/order/check/complain/interrupt/panic/pretend…" style actions.
- Keep it punchy and rhythmic so it reads well as a spinner.
- Aim for "recognizable vibe" without requiring deep lore.

Final self-check before output:
- Count is 15–100.
- Every line is an action.
- No line exceeds 6 words.
- No duplicates.
- JSON parses cleanly.
- Includes all required fields: $schema, name, displayName, category, description, author, github, language, config.
- name is lowercase-kebab-case.
- displayName is a human-readable title.
- category is one of: entertainment, music, gaming, literature, science, tech, sport, culture, original.
- description is a short phrase describing the theme.
- language is "${locale}".

Browse more verb sets at https://claudeverbs.com

Now output the JSON only.
`
}

export function generatePrompt(subject: string, language?: string): void {
  const content = buildPrompt(subject, language)
  console.log(hint(`Subject: ${subject}`))
  console.log(hint(`Language: ${resolveLocale(language)}\n`))
  console.log(content)
}
