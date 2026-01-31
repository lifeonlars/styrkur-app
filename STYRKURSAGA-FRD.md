# Styrkur Saga – Functional Requirements Document (FRD)

> Draft v0.3.1 – clarification patch (ad-hoc sessions + multiple sessions per day)

---

## 1. Purpose

Styrkur Saga is a **mobile-first workout planner and tracker** focused on **long-term strength and conditioning programming**, not just individual workout logging.

The core differentiator is explicit support for:
- Programs spanning multiple weeks/months
- Blocks and cycles with intentional progression
- Separation of *planning* from *execution*

Dark-mode first, PWA-ready, offline-first, optimized for touch interaction.

---

## 2. Core Design Philosophy

1. **Planning-first, logging-second**  
   The app must make it easy to think in weeks, cycles, and blocks.

2. **Constraints over infinite flexibility**  
   Support common, proven training patterns well instead of allowing every theoretical combination.

3. **Templates vs instances are sacred**  
   Planning artefacts should never retroactively corrupt historical data.

4. **Adaptation beats rigidity**  
   Real training adapts to fatigue, injury, life stress, and performance.

---

## 3. Terminology and Domain Model (Authoritative)

These definitions are *canonical* and should be enforced consistently in code and UX.

### 3.1 Program

A **Program** represents the full training intent over a longer horizon (e.g. 8–16 weeks).

- Contains one or more **Blocks**
- Has an overall goal (e.g. hypertrophy, strength, conditioning)
- Is the top-level artefact selected when starting an active plan

---

### 3.2 Block

A **Block** is a conceptual phase of training with a consistent structure, exercise selection philosophy, and intent.

- Defines the *structural blueprint* of a training phase
- Defines the *intended duration* of a single iteration (e.g. 1 week, 2 weeks)
- Does **not** hard-lock progression

A block is a container, not a rigid repeating unit.

---

### 3.3 Cycle

A **Cycle** is a concrete, time-bound planning unit derived from a block.

- Has a fixed start and end date
- References a parent Block for structure
- May override parameters based on reality

Cycles are **independent entities**, even when derived from the same block.

All meaningful workload decisions happen at **cycle level**.

---

### 3.4 Workout

A **Workout** is a reusable session template describing what happens in a single training session.

- Lives in the Workout Library
- Composed of ordered **Exercise Groups**
- Contains default sets, reps, loads, execution styles

Workouts are templates, not logs.

---

### 3.5 Session

A **Session** is a performed instance of a workout on a specific date.

- Created when a workout is started
- Stores actual performance (reps, load, notes, RPE)
- Immutable once logged

---

## 4. Structural Relationships

```
Program
 ├─ Block
 │   ├─ Cycle
 │   │   ├─ Session
 │   │   └─ Session
 │   └─ Cycle
 └─ Block
     └─ Cycle
```

---

## 5. Cycle vs Block Rigidity (Design Decision)

- **Block = structural intent**
- **Cycle = planning reality**

Blocks define:
- Structure
- Relative days
- Conceptual role

Cycles define:
- Dates
- Workload
- Adjustments and deviations

This avoids hidden override logic and matches real-world training behaviour.

---

## 6. UX Implications

- Programs define intent and sequencing
- Blocks define rhythm and structure
- Cycles populate the calendar
- Sessions represent actual training

The calendar is always derived from **cycles**, never directly from blocks.

---

## 7. High-Level Functional Scope

### Must-have
- Program → Block → Cycle → Session hierarchy
- Workout library with constrained configuration
- Cycle duplication
- Calendar-based active plan
- Fast, touch-first logging
- Offline-first persistence

### Out of scope (v1)
- Automatic progression engines
- Wearables
- Social features

---

## 8. Resolved Design Decisions (v1)

### 8.1 Program and Block Ordering

Programs and Blocks are **strictly sequential** in v1.

- One active Program timeline
- Blocks do not overlap

---

### 8.2 Block vs Cycle Responsibility

- Blocks define structure and intent
- Cycles define content and execution

Workouts are always assigned at **cycle level**, never block level.

---

### 8.3 Ad-hoc Sessions (Clarified)

**Decision**  
A Session may be either **Planned** (part of a Cycle) or **Ad-hoc** (not attached to any Program).

**Ad-hoc Sessions must support:**
- Selecting any Workout Template
- Optional tags (e.g. Run, Mobility, Rehab)
- Optional duration and notes

**Behavioural rules**
- Ad-hoc Sessions appear in History and daily calendar views
- Ad-hoc Sessions do **not** count toward Program or Cycle completion metrics

This prevents forcing all training into a Program-shaped structure.

---

### 8.4 Progression and Overload

No automatic progression logic in v1.

- All progression decisions are manual
- The app does not infer readiness or fatigue

Automation may be explored later, gated behind explicit user intent.

---

### 8.5 Multiple Sessions per Day (New)

**Decision**  
The system supports **multiple Sessions on the same calendar date**.

This includes any combination of:
- Planned Sessions (from Cycles)
- Ad-hoc Sessions

**Examples**
- AM: VO₂ intervals (ad-hoc)
- PM: Cycle Day 3 strength workout

**Implications**
- Daily views must display a stacked list of Sessions
- Program adherence is measured by *planned Sessions completed*, not by calendar days
- A single planned workout slot results in one planned Session, but users may add additional ad-hoc Sessions without conflict

---

## 9. Final v1 Mental Model (Locked)

- **Program** – long-term intent
- **Block** – structural phase
- **Cycle** – concrete planning unit
- **Workout** – reusable template
- **Session** – immutable logged execution

If a feature does not fit cleanly into this model, it should not be built in v1.

---

*End of FRD v0.3.1*

