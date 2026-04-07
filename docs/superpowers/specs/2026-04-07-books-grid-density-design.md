# Books Grid Density Design

Date: 2026-04-07
Project: `jasper-bo-github-io`
Status: Drafted from approved brainstorming direction, awaiting written-spec review

## 1. Context

The current books page is visually too heavy. Each book card behaves like a long showcase card: the cover is tall, the body text is long, and the card height makes the page feel sparse even when several books are present.

The desired outcome is a denser bookshelf-style archive. Instead of asking the user to stop on one large card at a time, the page should let them scan many books quickly.

The latest direction chosen in conversation is:

> The books page should move toward a `3 x 3` browsing feel.

This does not mean a mathematically exact `3 x 3` on every viewport. It means the page should feel much denser, with desktop layouts trending toward a visible 3-column bookshelf and much shorter cards than today.

## 2. Goals

1. Make the books page feel like a dense archive rather than a set of oversized feature cards.
2. Reduce the vertical footprint of each book card significantly.
3. Make `3 columns` the default desktop reading pattern.
4. Preserve the core book information instead of turning cards into empty shells.
5. Improve scan-ability on laptop and tablet-width layouts.

## 3. Non-Goals

1. This redesign is not trying to preserve the current “large showcase card” presentation.
2. This redesign is not trying to add new book-detail pages or new interactions.
3. This redesign is not trying to make every screen show exactly nine books above the fold.
4. This redesign is not trying to remove the existing filters or rewrite the whole books information architecture.

## 4. Final Direction

The books page should shift from a tall presentation card to a compact archive card.

### High-level decision

- The page remains a books archive with filters at the top.
- The book grid becomes denser and enters `3 columns` earlier.
- Each card becomes substantially shorter.
- The cover remains important, but no longer dominates the card height.
- Text content is preserved in principle, but compressed in presentation and capped where necessary.

## 5. Page Layout

### Top section

The title and description remain, but the overall page should feel tighter:

- keep the existing heading block
- keep the existing filter section
- reduce the visual weight of the filter area if needed, but do not remove it

The important change is not the header. The important change is the card grid below it.

### Grid strategy

The grid should move to a denser bookshelf pattern:

- mobile: `1 column`
- tablet portrait: `2 columns`
- tablet landscape and most laptop widths: `3 columns`
- desktop: `3 columns` remains the main pattern, with card height reduced enough that the page reads like a compact archive

This is intentionally different from the current `md 2 / xl 3` pattern, which delays the dense layout too long.

### Spacing

The grid gap should be tighter than the current books layout. Cards should still breathe, but the page should no longer feel like each book is isolated in its own large block of empty space.

## 6. Book Card Design

### Core shift

The book card should move from “showcase card” to “scan card”.

That means:

- faster to scan
- shorter vertically
- less dominated by cover height
- still informative enough to understand the book quickly

### Recommended card structure

On tablet and desktop widths, the recommended structure is a compact split card:

- left: smaller book cover area
- right: condensed text content

This is the most reliable way to reduce height while preserving information density.

On narrow mobile widths, the card may remain stacked if needed for layout stability, but it should still use tighter spacing and shorter text blocks than the current version.

### Information to keep

Each card should still include:

1. cover
2. title
3. author
4. status tag
5. category tag
6. recommendation tag when present
7. a short summary
8. a compact takeaway area
9. rating or notes link/footer state

### Information compression rules

To achieve the denser layout, the presentation must change:

1. Cover
   - reduce rendered cover footprint
   - keep a book-like vertical ratio, but much smaller than the current hero-style block

2. Summary
   - keep it visible
   - cap it to a short preview instead of allowing it to expand freely

3. Takeaways
   - keep them, but do not render the current long vertical list in full
   - show at most `2` compact items by default

4. Footer metadata
   - keep rating and notes link
   - compress spacing so the footer reads as utility information, not a major content block

### Visual tone

The card should feel closer to:

- a curated bookshelf tile
- an archive entry
- a compact content object

It should feel less like:

- a featured article card
- a product marketing block
- a long reading module

## 7. Responsive Behavior

### Mobile

- keep one column
- maintain readability
- prioritize stability over extreme density

### Tablet portrait

- move into two columns
- cards should already feel meaningfully more compact than today

### Tablet landscape and laptops

- move into three columns
- this is the key transition point for the new design

### Desktop

- keep three columns as the main archive rhythm
- tune card height and spacing so the page feels closer to a `3 x 3` shelf than a sparse editorial page

## 8. Content Hierarchy Rules

The first thing a user should notice is:

1. there are many books here
2. each book is easy to identify
3. the page can be scanned quickly

The first thing they should not feel is:

1. each card is too tall
2. I have to read a lot before moving on
3. the page wastes too much vertical space

## 9. Implementation Scope for the Next Phase

The implementation plan should cover:

1. refactoring the books page grid classes in both fallback and client views
2. redesigning `BookCard` into a compact archive-oriented layout
3. shortening the rendered summary and takeaway footprint
4. tuning cover sizing and card spacing for `3-column` browsing
5. verifying the layout at mobile, tablet, laptop, and desktop widths

## 10. Success Criteria

This redesign succeeds if:

1. the books page immediately feels denser than the current version
2. desktop and laptop layouts naturally read as a `3-column` archive
3. a user can scan materially more books without scrolling as much
4. each card still communicates the identity of the book clearly
5. the page feels like a bookshelf, not a set of oversized feature panels

## 11. Scope Check

This is focused enough for a single implementation plan. It changes only the books archive layout and the book card presentation, without requiring new routes, new content types, or new page architecture.
