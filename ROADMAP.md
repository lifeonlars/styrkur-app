# Styrkur Saga – v1 Roadmap

> **Purpose**  
> This document defines the **build order and milestones for Styrkur Saga v1**.  
> It exists to prevent premature features, wrong sequencing, and architectural drift.

This is a **delivery roadmap**, not a marketing plan.

---

## Guiding Principles (Read First)

1. **Foundations before features**  
   If data integrity or mental model is wrong, everything built on top is wasted.

2. **Templates before planning**  
   You cannot plan cycles without stable workouts.

3. **Logging before analytics**  
   No data → no insight. Charts come last.

4. **Manual > automatic (v1)**  
   Anything that smells like inference, readiness, or auto-progression is deferred.

---

## Milestone Overview

```
M0  Foundations
M1  Workout Library (Templates)
M2  Session Logging (Execution)
M3  Planning (Program / Block / Cycle)
M4  History & Minimal Analytics
```

Each milestone **unlocks** the next. Do not skip ahead.

---

## M0 — Foundations (Non-negotiable)

**Goal**: Create a stable technical and conceptual base.

### Deliverables
- Project scaffold (React + TS + Vite)
- Routing and app shell (mobile-first)
- Global theming (dark mode only)
- Storage abstraction (local-first)
- Versioned schema / migrations strategy
- Seed data support (example exercises, example workouts)

### Explicit constraints
- No Supabase
- No auth
- No analytics
- No planning UI

### Why this matters
If storage, IDs, or schema evolution are sloppy here, the app will rot fast.

---

## M1 — Workout Library (Templates)

**Goal**: Fully support workout creation that respects the Workout Spec.

This milestone is **domain-critical**.

### Deliverables
- Workout list (library)
- Workout detail view
- Workout builder/editor

### Workout builder must support:
- Segments (execution styles)
- Segment types: Sets, EMOM, AMRAP, Intervals
- Exercise Groups (single, superset, circuit)
- Exercise selection
- Rep schemes and weight schemes (where allowed)
- Validation against hard constraints

### Non-goals
- No session logging
- No calendar
- No programs, blocks, or cycles

### Acceptance criteria
- It is **impossible** to build an invalid workout per `WORKOUT_SPEC.md`
- Editing a workout does not affect any logged data (even though none exists yet)

---

## M2 — Session Logging (Execution)

**Goal**: Log real training reliably and immutably.

### Deliverables
- Start workout → create Session
- Live logging UI (mobile-first)
- Post-session editing
- Segment-level RPE
- Notes
- Session summary

### Core rules
- Sessions are immutable historical records
- Planned values may be overridden during logging
- Deviations are preserved

### Supported flows
- Log a workout ad-hoc (no Program)
- Log a workout derived from a template

### Non-goals
- No planning
- No progression suggestions
- No analytics beyond basic summaries

---

## M3 — Planning (Program / Block / Cycle)

**Goal**: Enable long-term planning without breaking reality.

This milestone implements the **core differentiator** of Styrkur Saga.

### Deliverables
- Program creation
- Block creation (structure only)
- Cycle creation from Block
- Cycle duplication
- Assign workouts to cycle days
- Active plan timeline
- Calendar derived from cycles

### Key constraints
- One active Program at a time
- Blocks are sequential
- Cycles are editable instances
- No automatic progression

### Critical rule
All workout assignments happen at **cycle level**, never block level.

---

## M4 — History & Minimal Analytics

**Goal**: Make logged data visible and motivating without overreach.

### Deliverables
- Session history list
- Session detail view
- Per-exercise history
- Simple charts (volume, reps, load over time)
- Basic PR detection (explicit rules only)

### Non-goals
- No readiness scores
- No AI insights
- No recommendations

---

## Explicitly Deferred (Not v1)

These are intentionally **out of scope** and should not be partially implemented.

- Automatic progression engines
- Fatigue or readiness modeling
- Wearable integrations
- Social features
- Multiple active programs
- Cloud sync conflicts

---

## Exit Criteria for v1

v1 is considered complete when:
- A user can define workouts
- Log sessions reliably
- Plan multiple cycles across blocks
- Review past training
- Do all of the above offline

If a feature does not move the app closer to this state, it does not belong in v1.

---

*This roadmap is authoritative for build order. Deviations should be explicit and justified.*

