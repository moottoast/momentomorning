# Content Development Guide

This folder is the working space for building daily stoic quotes for Memento Morning. Use it to draft, review, and finalize CSV files before importing them into Supabase.

For import instructions, see the [Importing Quotes Guide](../docs/importing-quotes.md).

## Schema

Each quote has these fields:

| Field | Rules |
|-------|-------|
| `date` | `YYYY-MM-DD`, one quote per date |
| `quote_text` | The stoic quote, properly attributed text |
| `attribution` | Philosopher and source (e.g., `Marcus Aurelius, Meditations V.16`) |
| `reflection` | A question connecting the quote to daily life |
| `virtue` | One of: `wisdom`, `courage`, `justice`, `temperance` |

## File Conventions

- CSV files go in this folder, named by date range: `2026-06-01_to_2026-06-30.csv`
- Use the header row: `date,quote_text,attribution,reflection,virtue`
- Wrap any field containing commas in double quotes
- Do **not** include `id` or `created_at` columns

## Content Goals

### Philosopher Coverage

Draw from the full breadth of stoic philosophy, not just the "big three." Aim for a mix across the year:

- **Marcus Aurelius** — Meditations
- **Seneca** — Letters, On the Shortness of Life, On Anger, On Providence, On Tranquility of Mind
- **Epictetus** — Discourses, Enchiridion, Fragments
- **Musonius Rufus** — Lectures
- **Cleanthes** — Hymn to Zeus, Fragments
- **Chrysippus** — Fragments
- **Zeno of Citium** — Fragments
- **Hierocles** — Elements of Ethics
- **Posidonius** — Fragments
- **Cato the Younger** — as quoted by Plutarch, Lucan, etc.

### Virtue Classification

Distribute the four virtues roughly evenly across any given month (~25% each). Many stoic quotes touch multiple virtues — use the **primary thrust** of the quote to classify it. Ask: "What is this quote most directly asking the reader to do?"

**Wisdom** (sophia/prudentia) — seeing things clearly

Assign when the quote is primarily about how to *think*: judgment, discernment, perspective, distinguishing what is and isn't in our control, understanding the nature of things, learning from experience, seeing past illusion.

Keywords/themes: perception, judgment, knowledge, understanding, truth, opinion, reason, nature of things, what is vs. what appears, learning, attention, awareness.

Examples: examining your assumptions, recognizing what you can't control, choosing where to direct attention, understanding impermanence.

**Courage** (andreia/fortitudo) — acting despite difficulty

Assign when the quote is primarily about the will to *act rightly under pressure*: enduring hardship, facing fear, speaking uncomfortable truth, persisting through adversity, accepting mortality, taking risks for what matters.

Keywords/themes: fear, death, adversity, endurance, persistence, hardship, boldness, pain, loss, risk, standing firm, difficulty, struggle, resolve.

Examples: confronting fear of death, enduring suffering without complaint, doing what's right when it's hard, not shrinking from difficulty.

**Justice** (dikaiosyne/iustitia) — duty to others

Assign when the quote is primarily about how we *relate to other people*: fairness, kindness, community, forgiveness, generosity, social responsibility, treating others well, fulfilling obligations, contributing to the common good.

Keywords/themes: others, community, humanity, kindness, forgiveness, duty, service, fairness, harm, anger toward others, relationships, common good, citizenship.

Examples: forgiving someone who wronged you, acting for the common good, treating others as rational beings, fulfilling your role in community.

**Temperance** (sophrosyne/temperantia) — mastery over oneself

Assign when the quote is primarily about *self-governance*: restraint, moderation, discipline, controlling desires and impulses, simplicity, not being enslaved by pleasure or emotion, maintaining composure.

Keywords/themes: desire, pleasure, restraint, moderation, excess, discipline, self-control, impulse, appetite, simplicity, composure, emotion management, habit.

Examples: resisting temptation, living simply, not being ruled by anger or desire, practicing daily discipline, moderating consumption.

**When virtues overlap** — and they often will — use this tiebreaker:

1. If the quote is about *understanding* something → **wisdom**
2. If the quote is about *enduring or facing* something hard → **courage**
3. If the quote is about *other people* → **justice**
4. If the quote is about *restraining yourself* → **temperance**

When still ambiguous, prefer the virtue that is currently underrepresented in the month.

### Holidays and Significant Dates

Align quotes with meaningful dates when possible:

- **New Year's Day** (Jan 1) — fresh starts, intention
- **Martin Luther King Jr. Day** (3rd Mon in Jan) — justice, moral courage
- **Presidents' Day** (3rd Mon in Feb) — leadership, duty
- **Memorial Day** (last Mon in May) — sacrifice, courage
- **Juneteenth** (Jun 19) — justice, freedom
- **Independence Day** (Jul 4) — freedom, self-governance
- **Labor Day** (1st Mon in Sep) — discipline, craft
- **Veterans Day** (Nov 11) — courage, duty
- **Thanksgiving** (4th Thu in Nov) — gratitude, temperance
- **Winter Solstice** (Dec 21) — endurance, reflection
- **Christmas** (Dec 25) — generosity, community
- **Stoic Week** (typically October) — themed daily content

Also consider seasonal themes — renewal in spring, endurance in winter, gratitude in autumn.

## Quality Checklist

Before finalizing a CSV batch:

- [ ] Every `date` is unique and in `YYYY-MM-DD` format
- [ ] Every `virtue` is exactly one of: `wisdom`, `courage`, `justice`, `temperance`
- [ ] Attributions include the specific work and passage when known
- [ ] Reflections are questions (end with `?`), not statements
- [ ] No duplicate quotes across batches
- [ ] Philosopher mix is varied (not 90% Marcus Aurelius)
- [ ] Virtue distribution is roughly balanced across the month
- [ ] Holiday-adjacent dates have thematically appropriate quotes

## Workflow

1. **Draft** a CSV for a month or date range in this folder
2. **Review** against the quality checklist above
3. **Test** by importing a few rows via the Supabase dashboard
4. **Import** the full batch per the [Importing Quotes Guide](../docs/importing-quotes.md)
