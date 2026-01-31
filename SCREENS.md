# Styrkur Saga – Screen Inventory (v1)

> **Purpose**  
> Enumerate v1 screens, routes, and required states so implementation stays consistent and complete.

This doc is intentionally **design-light**. Where visual designs are missing, screens still need:
- clear primary actions
- predictable navigation
- empty/loading/error states

---

## Global Navigation Model (v1)

### App Shell
- **Bottom nav** (mobile-first)
  - **Today** (Dashboard)
  - **Plan** (Programs / Blocks / Cycles)
  - **Workouts** (Workout Library)
  - **History** (Sessions / Exercise history)
  - **Settings**

### Global behaviors
- Floating/primary action is contextual per tab (e.g. “New Workout”, “Start Session”).
- Use consistent patterns for:
  - List → Detail
  - Create/Edit → Save/Cancel
  - “Start” actions always create a **new Session**.
- A **single calendar day may contain multiple Sessions** (planned and/or ad‑hoc).
- Ad‑hoc Sessions live **outside** Programs, Blocks, and Cycles and never replace planned sessions.

---

## Common UI States (Required)

Every screen must support:
- **Loading** (skeleton or placeholder)
- **Empty** (clear CTA)
- **Error** (retry + diagnostic hint)

And where relevant:
- **Read-only vs Editing** modes
- **Unsaved changes** protection

---

## M0 — Foundations (Screens)

### S0.1 App Shell
- Route: `/*`
- Purpose: Provides bottom nav + top bar
- Notes: dark mode only

### S0.2 Not Found
- Route: `*`
- Purpose: Safe fallback

---

## M1 — Workout Library (Templates)

### S1.1 Workouts List
- Route: `/workouts`
- Shows: all workout templates
- Primary actions:
  - Create workout
  - Search/filter (v1: simple text search)
- States:
  - Empty: “Create your first workout”

### S1.2 Workout Detail (Template)
- Route: `/workouts/:workoutId`
- Shows: read-only view of template structure
- Primary actions:
  - Edit
  - Start (creates Session)
  - Duplicate (creates new template)

### S1.3 Workout Editor
- Route: `/workouts/:workoutId/edit` and `/workouts/new`
- Purpose: Build valid workouts per WORKOUT_SPEC
- Primary actions:
  - Add Segment
  - Reorder Segments
  - Add Group within Segment
  - Add Exercise within Group
  - Save
- Critical UI requirements:
  - Validation is immediate and explicit
  - Illegal combinations are blocked (not warnings)
  - Segment type drives available fields

### S1.4 Exercise Picker (Modal/Sheet)
- Route: modal over editor
- Purpose: Search/select exercises
- Primary actions:
  - Search
  - Select
  - Create custom exercise (optional v1; can defer)

---

## M2 — Session Logging (Execution)

**Key clarification**
- Sessions may be logged **from a Cycle (planned)** or **ad‑hoc (unplanned)**.
- Ad‑hoc Sessions:
  - Do not consume or replace planned Cycle sessions
  - Are additive and logged independently
  - Are visible in Dashboard, Workout, and History views

---

### S2.1 Start Session (Entry)
- Route: `/session/start`
- Entry points:
  - From Workout Detail: start that template (ad‑hoc)
  - From Plan / Cycle Day: start planned workout
  - From Today/Dashboard
- Primary action:
  - Confirm start (always creates a new Session)

### S2.2 Active Session (Live Logging)
- Route: `/sessions/:sessionId/active`
- Purpose: Fast touch-first logging
- Must support:
  - Segment navigation (next/previous)
  - Set completion toggles
  - Edit reps/load
  - Segment RPE
  - Notes
  - Early termination (cut session short)
- Primary actions:
  - Finish session
  - Save & exit

### S2.3 Session Summary
- Route: `/sessions/:sessionId/summary`
- Purpose: Review + final edits
- Primary actions:
  - Edit session
  - Save

### S2.4 Session Edit (Post)
- Route: `/sessions/:sessionId/edit`
- Purpose: Correct logged data
- Rule: edits affect Session only

---

## M3 — Planning (Program / Block / Cycle)

> Planning screens must reflect the FRD mental model: Programs/Blocks sequential, Cycles are editable instances.

### S3.1 Plan Home
- Route: `/plan`
- Shows:
  - Active Program (if any)
  - Upcoming cycle timeline snapshot
  - CTA: create/select Program
- States:
  - Empty: no program → “Create Program”

### S3.2 Programs List
- Route: `/plan/programs`
- Shows: all programs
- Primary actions:
  - Create Program
  - Set active program

### S3.3 Program Detail
- Route: `/plan/programs/:programId`
- Shows:
  - Blocks (ordered)
  - Cycles grouped under blocks
  - Timeline view (simple)
- Primary actions:
  - Add Block
  - Create Cycle from Block
  - Duplicate Cycle

### S3.4 Program Editor
- Route: `/plan/programs/:programId/edit` and `/plan/programs/new`
- Primary actions:
  - Edit name/goal notes
  - Reorder blocks
  - Save

### S3.5 Block Editor (Structure Only)
- Route: `/plan/blocks/:blockId/edit` and `/plan/blocks/new`
- Block defines:
  - Name
  - Intended duration (e.g. 1–2 weeks)
  - Relative day structure (Day 1..N)
- Primary action:
  - Save
- Explicit non-goal:
  - No workout assignments here

### S3.6 Cycle Create (From Block)
- Route: `/plan/blocks/:blockId/cycles/new`
- Purpose: Create Cycle instance
- Inputs:
  - Start date
  - Length (default from block)
- Output:
  - New cycle in timeline

### S3.7 Cycle Detail
- Route: `/plan/cycles/:cycleId`
- Shows:
  - Cycle date range
  - Planned sessions (fixed)
  - Per-session state:
    - planned
    - completed
    - missed
  - Summary counts (e.g. completed / planned)
- Visual indicators (e.g. dots/checkmarks) represent **planned sessions only**
- Ad‑hoc Sessions are **not** shown inline
- Primary actions:
  - Start planned session (creates Session)
  - View cycle summary

### S3.8 Cycle Editor (Assignments)
 Cycle Editor (Assignments)
- Route: `/plan/cycles/:cycleId/edit`
- Purpose:
  - Assign workout templates to relative days
  - Optionally override day labels
- Rule:
  - Changes affect this cycle only

### S3.9 Plan Calendar (Derived)
- Route: `/plan/calendar`
- Shows:
  - Calendar view derived from active Cycle(s)
  - Planned sessions and logged Sessions
- Supports:
  - Multiple Sessions per day
- Primary actions:
  - Tap planned session → start Session
  - Tap logged Session → view summary
- Rule:
  - Calendar is **read-only** with respect to planning

---

## M4 — History & Minimal Analytics

### S4.1 History Home
- Route: `/history`
- Shows:
  - Recent sessions
  - Quick filters
  - CTA: view exercise history

### S4.2 Sessions List
- Route: `/history/sessions`
- Shows: all sessions (including ad-hoc)
- Primary actions:
  - Filter by workout template
  - Search

### S4.3 Session Detail (Read-only)
- Route: `/history/sessions/:sessionId`
- Shows:
  - Full logged session
  - Notes
  - PR badges (if implemented)
- Primary action:
  - Edit (goes to S2.4)

### S4.4 Exercises List
- Route: `/history/exercises`
- Shows: exercises with last performed + frequency
- Primary actions:
  - Search

### S4.5 Exercise Detail
- Route: `/history/exercises/:exerciseId`
- Shows:
  - Time series chart(s): load/reps/volume (simple)
  - Recent sets

---

## Settings (v1)

### S5.1 Settings Home
- Route: `/settings`
- Shows:
  - Units (kg/lb)
  - Rest timer defaults (optional)
  - Data export/import (if implemented)

---

## Screen Priority (Build Order Alignment)

Implement in this order:
1. S0.*
2. S1.1 → S1.4
3. S2.1 → S2.4
4. S3.1 → S3.9
5. S4.1 → S4.5
6. S5.1

---

## Notes on Designs

- It is fine if only Plan + Workout screens have early mockups.
- Use WORKOUT_SPEC to drive the editor and logger UI structure.
- Missing screen designs should default to:
  - simple lists
  - clear CTAs
  - consistent app shell
  - minimal but correct states

*If a screen can’t be described as a list/detail/editor with clear actions, it’s probably too complex for v1.*

