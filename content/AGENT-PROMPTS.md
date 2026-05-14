# Agent Prompting Guide

Prompts for working with AI agents to develop Memento Morning quote content. Read [CONTENT-GUIDE.md](CONTENT-GUIDE.md) first for schema, quality standards, and goals.

## Critical: Authenticity and Deduplication

Every prompt below includes these non-negotiable rules. When customizing prompts, always keep them:

1. **No fabricated quotes.** Every quote must be a real, verifiable passage from a real stoic text. Do not paraphrase, combine, or invent quotes. Do not attribute a quote to a philosopher unless you can cite the specific work and passage. If you cannot find a real quote that fits a theme, say so — do not fill the gap with a made-up one.

2. **No duplicates across the year.** Before generating, review all existing CSV files in this folder to ensure no quote_text is repeated. Each day of the year must have a unique quote. If you are provided existing content, check against it.

3. **Modern, recitable translations.** Prefer reputable modern translations listed in [CONTENT-GUIDE.md](CONTENT-GUIDE.md). Avoid archaic public-domain diction and fragmentary phrasing. If a passage sounds awkward aloud, choose another real passage or another modern translation.

4. **Poetic without paraphrase.** The quote should be vivid, clear, and inspiring, but it must remain verbatim from the chosen translation. Do not "improve" a clumsy quote by rewriting it.

## Modern Translation Preferences

Use these source editions first when producing or replacing quote text:

- Marcus Aurelius: Gregory Hays, *Meditations* (Modern Library, 2002); Robin Waterfield, *Meditations: The Annotated Edition* (Basic Books, 2021/2022); Robin Hard, *Meditations with Selected Correspondence* (Oxford World's Classics, 2011)
- Epictetus: Robin Hard, *Discourses, Fragments, Handbook* (Oxford World's Classics, 2014); Robert Dobbin, *Discourses and Selected Writings* (Penguin, 2008); Anthony A. Long, *How to Be Free* (Princeton, 2018) for the *Enchiridion*
- Seneca, *Letters*: Margaret Graver and A. A. Long, *Letters on Ethics: To Lucilius* (University of Chicago Press, 2015)
- Seneca, essays: University of Chicago Press's Complete Works series, especially Robert A. Kaster and Martha C. Nussbaum, *Anger, Mercy, Revenge* (2010); Gareth D. Williams, *Selected Moral Dialogues* (2014); Elaine Fantham, Harry M. Hine, James Ker, and Gareth D. Williams, *Hardship and Happiness* (2014)
- Musonius Rufus: Cynthia King, *Musonius Rufus: Lectures and Sayings* (2011); Cora Lutz, *Musonius Rufus: "The Roman Socrates"* (1947/2020 reprint) only when King is unavailable
- Cleanthes, Zeno, Chrysippus, Hierocles, Posidonius, and other fragments: A. A. Long and D. N. Sedley, *The Hellenistic Philosophers* (1987); Brad Inwood and Lloyd P. Gerson, *The Stoics Reader* (Hackett, 2008)
- Cato the Younger: modern translations of Plutarch's *Life of Cato the Younger* and Lucan's *Civil War*, with the ancient witness named in the attribution

Avoid George Long, Meric Casaubon, Elizabeth Carter, Thomas Wentworth Higginson, and other old public-domain translations as defaults. They may be useful for passage discovery, but the final `quote_text` should come from a modern, readable translation whenever possible.

## Poetic Quality Screen

Before accepting a quote, read it aloud. Keep it only if the line is clear on the first reading and has some force, music, or image.

Prefer:

- complete thoughts rather than fragments
- concrete imagery and strong verbs
- humane, direct, memorable lines
- concise passages, usually 8-35 words
- punctuation that tells the reader how to breathe

Reject:

- orphaned fragments like "If law, then are we fellow-citizens"
- archaic diction: `thou`, `thee`, `thy`, `doth`, `hast`, `soever`, `whensoever`, `whereof`, `nought`, `straightway`, `yea`
- inverted syntax that sounds like homework
- parenthetical translation glosses inside the quote
- lines that require a reflection question to explain what the quote itself means

## Generating a Month of Quotes

```
Generate a CSV of daily stoic quotes for [MONTH YEAR].

Format — header row then one row per day:
date,quote_text,attribution,reflection,virtue

Rules:
- date: YYYY-MM-DD
- virtue: exactly one of wisdom, courage, justice, temperance (see classification rules below)
- attribution: include the specific work and passage number (e.g., "Seneca, Letters 77.6")
- reflection: a question connecting the quote to daily life, ends with ?
- Wrap fields containing commas in double quotes
- Do NOT include id or created_at columns

Authenticity (MANDATORY):
- Every quote must be a real, verifiable passage from a real stoic text
- Do NOT paraphrase, combine, or invent quotes
- Do NOT attribute a quote to a philosopher unless you can cite the specific work and passage
- If you cannot find a real quote for a date, leave that row out and say which dates need manual attention

Translation quality (MANDATORY):
- Use reputable modern translations wherever possible; follow the source preferences in CONTENT-GUIDE.md
- Avoid archaic public-domain wording unless no modern translation exists for that source
- Do NOT include archaic diction such as thou, thee, thy, doth, hast, soever, whensoever, whereof, nought, straightway, or yea
- Do NOT use fragmentary lines that are grammatically awkward or unclear out of context
- Each quote should pass a read-aloud test: clear, recitable, inspiring, and naturally punctuated
- Do NOT paraphrase to make a quote prettier; choose a better real passage or better modern translation

Deduplication (MANDATORY):
- Do NOT repeat any quote_text already used in other months
- Here are the quotes already used in other CSV files in this project:
[PASTE EXISTING QUOTE TEXTS HERE, or say "No existing content yet"]

Virtue classification — assign based on the PRIMARY thrust of the quote:
- wisdom: quote is mainly about how to THINK (judgment, discernment, perspective, what's in our control)
- courage: quote is mainly about ACTING DESPITE DIFFICULTY (enduring hardship, facing fear, accepting mortality)
- justice: quote is mainly about DUTY TO OTHERS (fairness, kindness, community, forgiveness, common good)
- temperance: quote is mainly about MASTERY OVER ONESELF (restraint, moderation, discipline, controlling desires)
Tiebreaker when virtues overlap: understanding→wisdom, enduring→courage, about others→justice, restraining self→temperance. If still ambiguous, pick whichever virtue is underrepresented in the month.

Content goals:
- Draw from at least 4 different philosophers across the month
- Distribute virtues roughly evenly (≈25% each)
- Reflections should be personal and actionable, not abstract
- Quotes should feel poetic through selection, not invention: vivid images, strong verbs, memorable cadence, and complete thoughts

Output the raw CSV with no commentary.
```

## Holiday-Themed Quotes

```
Generate stoic quotes for these specific dates, themed to the occasion:

[LIST DATES AND HOLIDAYS, e.g.:]
- 2027-01-01 (New Year's Day) — fresh starts, intention
- 2027-01-20 (MLK Day) — justice, moral courage
- 2027-07-04 (Independence Day) — freedom, self-governance
- 2027-11-27 (Thanksgiving) — gratitude, temperance

Format — CSV with header:
date,quote_text,attribution,reflection,virtue

Rules:
- Match the virtue to the holiday theme
- Attribution must include specific work and passage
- Reflection should connect the stoic idea to the holiday's meaning
- Wrap fields containing commas in double quotes

Authenticity (MANDATORY):
- Every quote must be a real, verifiable passage — no fabrications or paraphrases
- If no real stoic quote fits a holiday theme, say so rather than inventing one

Translation quality (MANDATORY):
- Use reputable modern translations wherever possible; follow the source preferences in CONTENT-GUIDE.md
- Avoid archaic diction, awkward fragments, and punctuation that makes the line hard to recite
- Do NOT paraphrase to improve style; select a better real passage

Deduplication (MANDATORY):
- Do NOT reuse any quote_text from existing content:
[PASTE EXISTING QUOTE TEXTS HERE, or say "No existing content yet"]

Output the raw CSV with no commentary.
```

## Filling Gaps in Philosopher Coverage

```
I have existing quotes that lean heavily on [Marcus Aurelius / Seneca / Epictetus].
Generate [N] quotes from these underrepresented stoic philosophers:

- Musonius Rufus (Lectures)
- Cleanthes (Hymn to Zeus, Fragments)
- Chrysippus (Fragments)
- Zeno of Citium (Fragments)
- Hierocles (Elements of Ethics)
- Cato the Younger (as quoted by Plutarch)

Format — CSV with header:
date,quote_text,attribution,reflection,virtue

Leave the date column empty — I will assign dates later.
Distribute across all four virtues.

Authenticity (MANDATORY):
- Every quote must be a real, verifiable passage from the cited work
- For lesser-known philosophers with limited surviving texts, it is better to provide fewer genuine quotes than to fill gaps with fabrications
- If a philosopher's surviving fragments are exhausted, say so

Translation quality (MANDATORY):
- Use reputable modern translations wherever possible; follow the source preferences in CONTENT-GUIDE.md
- Avoid archaic diction, awkward fragments, and punctuation that makes the line hard to recite
- Do NOT paraphrase to improve style; select a better real passage

Deduplication (MANDATORY):
- Do NOT reuse any quote_text from existing content:
[PASTE EXISTING QUOTE TEXTS HERE, or say "No existing content yet"]

Output the raw CSV with no commentary.
```

## Rebalancing Virtue Distribution

```
Review this CSV and tell me the virtue distribution:

[PASTE CSV OR REFERENCE FILE]

Then generate replacement quotes to rebalance. For example, if justice is
underrepresented, suggest new justice-themed quotes that could replace some
of the overrepresented virtue.

Format replacements as CSV rows with the same header:
date,quote_text,attribution,reflection,virtue
```

## Quality Review

```
Review this CSV of stoic quotes for Memento Morning:

[PASTE CSV OR REFERENCE FILE]

Also review against all existing content to catch cross-file duplicates:
[PASTE OTHER CSV FILES OR THEIR QUOTE TEXTS]

Check for:
1. Are all dates unique and in YYYY-MM-DD format?
2. Are all virtues exactly one of: wisdom, courage, justice, temperance?
3. Are attributions specific (work + passage, not just philosopher name)?
4. Are reflections phrased as questions?
5. Are any quotes duplicated within this file?
6. Are any quotes duplicated across existing files?
7. Is the philosopher mix varied?
8. Is the virtue distribution roughly balanced?
9. Do holiday-adjacent dates have thematically appropriate quotes?
10. For each quote, does it appear to be a real, verifiable passage? Flag any that look paraphrased, combined from multiple sources, or potentially fabricated.
11. Does each quote appear to come from a modern, readable translation rather than an archaic public-domain source?
12. Does each quote pass the read-aloud test: clear, poetic, complete, and naturally punctuated?
13. Flag any quote containing archaic diction such as thou, thee, thy, doth, hast, soever, whensoever, whereof, nought, straightway, or yea.
14. Flag any quote that is too fragmentary or obscure to be inspiring without explanation.

Report issues as a numbered list with the affected date and what needs fixing.
```

## Verifying Quote Accuracy

Run this on every batch before importing. This is not optional.

```
Verify these stoic quotes are real and accurately attributed.
This is for a daily quote app — accuracy is critical. We would rather remove
a quote than publish a fake one.

[PASTE QUOTES WITH ATTRIBUTIONS]

For each quote, answer:
1. Is this a real, verbatim quote from this philosopher? (not paraphrased, not combined from multiple passages, not a modern invention commonly misattributed to stoics)
2. Is the source citation correct — right work, right book/letter/chapter number?
3. Can this quote be found in a standard modern translation of the cited work?
4. Which translation/source edition does the wording appear to come from?
5. Does the quote pass the Memento Morning voice standard: modern, poetic, recitable, and clear without explanation?

Classify each quote as:
- VERIFIED — you are confident this is real and correctly cited
- CORRECTED — the quote is real but the citation needs fixing (provide the fix)
- SUSPECT — you are not confident this is a real quote (explain why)
- FABRICATED — this does not appear in the cited work
- REAL BUT REWRITE SOURCE — the passage is real, but this wording is archaic, awkward, fragmentary, or not suitable for the app; recommend a modern translation or a different passage

Be aggressive about flagging suspects. Common red flags:
- Quotes that sound too modern or self-help-y
- Vague attributions like "Stoic proverb" or just a philosopher name with no work cited
- Quotes that appear only on internet quote sites but not in actual translations
- Passages that combine ideas from multiple places into one "quote"
- Archaic public-domain diction used as final quote text
- Lines whose meaning depends on surrounding context that has been omitted

Output a summary table: how many verified, corrected, suspect, fabricated, and real-but-rewrite-source.
Then list every non-VERIFIED quote with its classification and your reasoning.
```

## Deduplication Check

Run this when adding a new batch to catch duplicates across the full year.

```
Check this new CSV for duplicates against the existing content:

NEW CONTENT:
[PASTE NEW CSV]

EXISTING CONTENT:
[PASTE ALL EXISTING CSV FILES]

Check for:
1. Exact duplicate quote_text across new and existing content
2. Near-duplicates — same quote with minor wording differences (different translations of the same passage)
3. Same passage cited differently (e.g., "Meditations 5.16" vs "Meditations V.16") that would result in the same quote appearing twice

For each match found, report both rows (dates, quote text, attribution) and recommend which to keep or whether both are different enough to use.
```
