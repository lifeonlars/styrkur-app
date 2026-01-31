# UI_PATTERNS.md

> Authoritative UI components and interaction rules for Styrkur Saga (v1)

This document defines **reusable UI patterns and non-negotiable interaction rules**.

It deliberately **does NOT describe screens, routes, or user flows**. Those live in `SCREENS.md`.

If a screen requires behavior not covered here, either:
- a new pattern must be added, or
- the screen is doing too much for v1.

---

## 0. Scope & Intent

UI_PATTERNS answers only one question:

> **How do things behave everywhere in the app?**

Not:
- what screens exist
- where navigation goes
- which route does what

Think of this as **interaction law**, not a screen spec.

---

## 1. Global Interaction Laws

These rules apply everywhere, without exception.

### 1.1 Touch-first

- Minimum tap target ≈ 44px
- No icon-only primary actions
- No precision interactions (tiny drag handles, small checkboxes)

If it requires a stylus or perfect aim, it is invalid.

---

### 1.2 One Commit Action

Any UI state that mutates data must expose **exactly one commit action**:
- Save
- Start
- Finish
- Confirm

Secondary actions live behind overflow menus.

If two actions compete for attention, the design is wrong.

---

### 1.3 Explicit Editing Context

The UI must always make it unambiguous whether the user is editing:
- a **Template** (Workout, Block structure)
- an **Instance** (Cycle, Session)

This distinction must be visible without reading documentation.

---

## 2. Layout & Containment Patterns

### Pattern: App Shell

- Persistent bottom navigation (3–5 items max)
- Lightweight top bar with title + overflow
- Main content scrolls

Primary actions never live in the top-right corner.

---

### Pattern: Sticky Bottom Action Bar

Used whenever a user is expected to *commit* a change.

Rules:
- One primary action only
- Optional secondary action via overflow
- Must remain visible above keyboard

Floating buttons and sticky bars must never coexist.

---

### Pattern: Page States

All data-backed views must support:
- **Loading** → skeletons (never spinners)
- **Empty** → explanation + single CTA
- **Error** → retry + optional details

---

## 3. Navigation Containers (Not Flows)

These describe **containers**, not destinations.

### Pattern: Full-screen Editor

Use when:
- More than ~6 inputs
- Ordered structures are edited
- Data integrity matters

Rules:
- Explicit Cancel + Save
- Unsaved changes confirmation

---

### Pattern: Bottom Sheet

Use for:
- Selection
- Pickers
- Add flows

Rules:
- Single task only
- Dismissible
- No deep nesting

---

### Pattern: Modal Dialog

Use only for:
- Destructive confirmation
- Irreversible decisions

Never for data entry.

---

## 4. List & Collection Patterns

### Pattern: Standard List Row

- Primary label
- Secondary meta
- Single affordance (chevron or one quick action)

No multi-icon toolbars inside rows.

---

### Pattern: Card

Used to group related information.

Card anatomy:
- Header: title + overflow
- Body: primary information
- Footer: metadata

Cards are informational, not mini-screens.

---

### Pattern: Tags / Chips

- Read-only by default
- Editing happens in a dedicated container
- No inline tag editing in dense views

---

## 5. Forms & Inputs

### Pattern: Sectioned Form

- Inputs are grouped into sections
- No long flat forms
- Optional micro-summary at section end

---

### Pattern: Numeric Input

- Steppers for small integers
- Numeric keypad sheet for load/reps
- No dropdowns for frequently edited numbers

---

### Pattern: Validation

- Inline only
- Blocking validation on commit
- Never interrupt an active logging flow

---

## 6. Workout Composition Patterns

These patterns describe **components**, not a specific editor screen.

### Pattern: Exercise Group Card

An ordered container representing one execution unit.

An Exercise Group Card contains:
- Header: group type + optional label
- Reorder handle (group-level)
- Overflow: duplicate / delete
- Body: ordered Exercise Rows
- Footer: execution + scheme summary

All execution rules live at **group level**.

---

### Pattern: Exercise Row

Represents a single exercise inside a group.

Rules:
- Tap opens a detail container
- No inline expansion
- Reordering allowed **only within the same group** (v1 constraint)

---

### Pattern: Add Entry Point

All creation flows use the same entry:

`+ Add` → Bottom Sheet → Select intent

Never create alternative add buttons.

---

## 7. Logging Interaction Patterns

These apply to **any live data capture**, regardless of screen.

### Pattern: Focused Set Logging

- One active set at a time
- Large thumb-friendly inputs
- Previous values visible as reference

Completing a set must never require more than one tap.

---

### Pattern: Optional Detail Reveal

Secondary inputs (notes, RPE) are:
- Hidden by default
- Explicitly revealed
- Never required

---

## 8. Time & Density Patterns

### Pattern: Stacked Day

A single calendar day may contain multiple entities.

Rules:
- Display as a vertical stack
- No assumption of one item per day
- Visual distinction between planned and unplanned items

---

## 9. Explicit Non-Goals (v1)

The following are intentionally unsupported:
- Drag-anything-anywhere
- Inline editing everywhere
- Fully dynamic form builders
- Hidden automatic behavior

If a feature requires breaking these patterns, it should be postponed.

---

*UI_PATTERNS.md is authoritative for interaction behavior in v1.*