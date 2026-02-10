import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const promptPath = resolve(import.meta.dirname, '..', 'SPINNER_PROMPT.md')

export function buildPrompt(subject: string): string {
  return `# Generate a spinner verb set

Create a themed spinner verb set for Claude Code based on the following subject:

**Subject:** ${subject}

## Requirements

- Generate 30–50 verbs in Dutch
- Each verb should be a short phrase (2–4 words) in infinitive or imperative form
- Verbs should be humorous, creative, and thematically consistent
- Think of activities, actions, catchphrases, and inside jokes related to the subject
- Mix mundane actions with absurd ones for comedic effect

## Output format

Output ONLY valid JSON matching this exact structure:

\`\`\`json
{
  "$schema": "./schema.json",
  "name": "<lowercase-kebab-case-name>",
  "description": "<short description of the theme>",
  "author": "JJ",
  "github": "<github-username>",
  "config": {
    "showTurnDuration": false,
    "spinnerVerbs": {
      "mode": "replace",
      "verbs": [
        "Verb one",
        "Verb two"
      ]
    }
  }
}
\`\`\`

## Examples of good verbs

From the "freddy" set (Freddy-themed Dutch verbs):
- "Petor roepen"
- "Ham & eggs bestellen"
- "Toedeledoki zeggen"
- "Scheepskamelen noemen"
- "Een Wiedergutmachungsschnitzel bestellen"

From the "rundfunk" set (radio/TV studio chaos):
- "Jingle inzetten"
- "Regie de schuld geven"
- "Een soundboard afvuren"
- "Passief agressief zeggen"
- "Nog één take eisen"

## Notes

- The verbs appear as spinner text in Claude Code while it's thinking
- Keep them short enough to display well in a terminal
- Have fun with it — the weirder the better
`
}

export async function generatePrompt(subject: string): Promise<void> {
  const content = buildPrompt(subject)
  await writeFile(promptPath, content)
  console.log('Prompt written to SPINNER_PROMPT.md')
  console.log(`Subject: ${subject}`)
}
