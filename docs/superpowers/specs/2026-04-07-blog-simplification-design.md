# Blog Simplification Design

Date: 2026-04-07
Project: `jasper-bo-github-io`
Status: Approved in conversation, awaiting written-spec review

## 1. Context

The current blog has too many top-level surfaces and too much repeated explanation. The homepage behaves like a summary of the entire site, while `About`, `Skills`, `Projects`, and `Books` all compete to explain who Junbo is and what matters most right now.

The desired outcome is a much clearer personal positioning site: a visitor should understand the main story within about one minute.

The core positioning selected during brainstorming is:

> Junbo He is an AIPM / AI-native product explorer.

The site should primarily reinforce that statement.

## 2. Goals

1. Make the site understandable within one minute.
2. Center the entire site around the identity `AIPM / AI-native product explorer`.
3. Remove repeated explanation across homepage and secondary pages.
4. Shorten the homepage while increasing clarity.
5. Make the current `Fitness App` the main proof of direction.

## 3. Non-Goals

1. This redesign is not trying to preserve every existing content category at equal weight.
2. This redesign is not trying to showcase a broad skill inventory.
3. This redesign is not trying to make the blog feel like a traditional portfolio with many equally important destinations.
4. This phase does not require adding new product pages or new content categories.

## 4. Final Structure Decision

The chosen direction is a single-page primary site.

### Top-level structure

- `Home` becomes the only primary narrative page.
- `Books` is removed from primary navigation and downgraded to a secondary/supporting role.
- `About` is removed as a page.
- `Skills` is removed as a page.
- `Projects` is removed from primary navigation.

### Secondary content behavior

- `Fitness App` should no longer depend on a separate top-level page for understanding.
- Its key narrative moves into the homepage.
- Detailed project pages may remain in the codebase, but they are strictly secondary and should not be part of the main navigation path or homepage core reading flow.
- `Books` remains as a low-priority standalone archive, discoverable only from the homepage closing section and/or footer, never from primary navigation.

## 5. Information Architecture

The homepage should carry nearly all of the understanding burden. It should answer four questions, in order:

1. Who am I?
2. What am I building now?
3. How do I work?
4. What signals shape my judgement?

### Homepage sections

#### Section 1: Hero

Purpose:
- Make the identity legible within 5-10 seconds.

Must communicate:
- Name
- Core positioning
- Current highest-priority work

Recommended content shape:
- `Junbo He / 贺俊博`
- `AIPM / AI-native product explorer`
- A short supporting line about building a gym-focused fitness product with an AI-native workflow

Constraints:
- No dense supporting cards
- No long summary paragraphs
- No competing content categories

#### Section 2: What I’m Building

Purpose:
- Replace the need for a primary `Projects` entry.

Must communicate:
- Who the Fitness App is for
- Why broad market fitness apps feel wrong for the target user
- Why subtraction is the key product choice
- Current stage of progress

Constraints:
- Focus on the single main product
- Avoid feature-list overload
- Frame the product as proof of direction, not as a case-study archive

#### Section 3: How I Work

Purpose:
- Replace both `Skills` and part of `About`.

Must communicate:
- A clear AI-native product method

Selected framing:
1. AI captures user demand
2. AI helps define product and documentation
3. AI helps move design intent into code

Constraints:
- Present as method, not as a skill inventory
- Keep it short and easy to scan
- Avoid long 6-step workflow cards on the homepage

#### Section 4: Signals

Purpose:
- End the page with supporting evidence that Junbo’s thinking is active and evolving.

Selected content:
- `Three questions I’m thinking about lately`
- Contact links

Explicitly not selected:
- `Currently reading books` as the main homepage closing module

Reason:
- The “three questions” module better reinforces the AIPM identity and feels more alive than a reading snapshot.

## 6. Content Deletion, Merge, and Downgrade Rules

### Delete

1. `About` page
2. `Skills` page
3. Homepage sections that mainly preview other pages instead of supporting the main narrative

### Merge into homepage

1. Personal identity and current direction from `About`
2. Main Fitness App narrative from `Projects`
3. Method/process material from `Skills`

### Downgrade

1. `Books`
   - Keep as a secondary supporting asset
   - Keep as a standalone archive
   - Remove from primary navigation
2. Non-core projects
   - Do not compete with the Fitness App narrative
3. Detailed personal profile materials
   - Keep only what supports the main positioning

## 7. Navigation Design

Primary navigation should be extremely minimal.

Recommended primary nav:
- `Home`
- Language switcher

Optional supporting access:
- Contact links in footer or hero
- A low-priority link to books in footer and/or the homepage closing section

Not recommended in primary nav:
- `About`
- `Skills`
- `Projects`
- `Books`

## 8. Tone and Writing Direction

The redesigned site should feel like:
- one person
- one direction
- one active line of exploration

It should not feel like:
- a portfolio hub
- a category index
- a self-description archive

Writing should stay:
- short
- declarative
- directional
- focused on present work

## 9. Success Criteria

The redesign succeeds if:

1. A new visitor can understand within 10 seconds that Junbo is an `AIPM / AI-native product explorer`.
2. A new visitor can understand within 30-60 seconds that Junbo is currently building a gym-focused `Fitness App`.
3. The homepage no longer feels like a preview of multiple other sections.
4. `About` and `Skills` are no longer needed to explain the main identity.
5. The site feels like a positioning page rather than a collection of profile materials.

## 10. Implementation Scope for the Next Phase

The next planning phase should cover:

1. Remove or retire `About` and `Skills` routes from primary site flow.
2. Simplify site navigation to a minimal structure.
3. Refactor homepage into four sections only.
4. Re-home the Fitness App narrative onto the homepage.
5. Replace the homepage reading module with a `Three questions I’m thinking about lately` module.
6. Keep `Books` as a low-priority standalone archive linked only from secondary surfaces.

## 11. Scope Check

This design is intentionally focused enough for one implementation plan. It changes content architecture, navigation, and homepage structure, but it does not require a broader redesign of every content type in the repository.
