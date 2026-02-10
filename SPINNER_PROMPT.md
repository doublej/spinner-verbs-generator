SUBJECT: <write the subject here>

You are generating a Claude Code spinnerVerbs configuration inspired by the SUBJECT.

Goal:
Create a funny, high-quality set of short spinner "actions" that feel recognizably inspired by the SUBJECT's style, characters, recurring bits, or vibe.

Hard rules:
- Output MUST be valid JSON only (no commentary, no markdown).
- JSON shape MUST be exactly:
  {
    "$schema": "./schema.json",
    "name": "<lowercase-kebab-case-name>",
    "description": "<short description of the theme>",
    "author": "JJ",
    "config": {
      "showTurnDuration": false,
      "spinnerVerbs": {
        "mode": "replace",
        "verbs": [ ... ]
      }
    }
  }
- Generate 40–60 items in "verbs".
- Language: write every spinner verb in English.
- Every item MUST be an action phrase (something someone can do), not a bare noun or standalone quote.
  - Action-form examples: "Whisper the password", "Check the receipts", "Order another coffee", "Argue about rules", "Pretend it's fine".
- Keep each item short: 2–6 words max.
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
- Count is 40–60.
- Every line is an action.
- No line exceeds 6 words.
- No duplicates.
- JSON parses cleanly.
- Includes all required fields: $schema, name, description, author, config.
- name is lowercase-kebab-case.
- description is a short phrase describing the theme.

Now output the JSON only.
