# WORKOUT_SPEC.md

> **Purpose**  
> This document is the single source of truth for workout composition, execution rules, and logging constraints in *Styrkur Saga*.  
> It defines the internal data model and hard rules governing workouts. UI terminology may differ, but must map cleanly to the concepts defined here.

---

## 1. Core Concepts (Vocabulary)

### 1.1 Workout
A **Workout** is a single training session performed on a given date.

A workout:
- consists of **one or more Segments**
- Segments are executed **sequentially**
- may mix different execution styles across segments

---

### 1.2 Segment
A **Segment** is the primary execution container within a workout.

A segment defines:
- *how work is executed over time*
- time, rounds, and/or interval logic
- rest logic
- completion rules
- primary RPE for that portion of the workout

A segment:
- has **exactly one Segment Type** (execution style)
- contains **one or more Exercise Groups** (see guidance below)

**Guidance (important):**
- **Default rule:** a segment should contain **exactly one** exercise group.
- **Multi-group segments are an advanced pattern** and should be used only when the segment’s execution logic *requires* addressing different work items separately (e.g. EMOM slot patterns / alternating minutes, or AMRAP where a hold/skill is tracked separately from the main circuit).

> UI note: Segments are exposed to the user as **Execution Styles** (e.g. Sets, EMOM, AMRAP, Intervals).

---

### 1.3 Segment Types

The following segment types are supported:

#### Sets
- Fixed number of sets or rounds
- Explicit rest between sets/rounds
- Rep- and load-driven

#### EMOM (Every Minute on the Minute)
- Time-driven, minute-indexed execution
- Prescribed work to be completed within each interval

#### AMRAP (As Many Rounds As Possible)
- Continuous work within a fixed time cap
- Completion measured as rounds + partial reps

#### Intervals (HIIT)
- Alternating work and rest periods
- Intensity-driven rather than rep-driven

---

### 1.4 Exercise Group
An **Exercise Group** defines how one or more exercises are structurally linked.

Supported group types:
- **Single** – one exercise performed independently
- **Superset** – 2–3 exercises performed back-to-back
- **Circuit** – 3–15 exercises performed sequentially

Groups:
- exist *inside* a segment
- do **not** define time or rest globally
- may include optional constraints

---

### 1.5 Group Constraints
Group constraints modify how a group is performed without changing its structural type.

Supported constraints:
- **Complex** (same implement, typically same load, no equipment put down)
- **No rest between exercises**
- **Shared load across exercises**

Constraints are optional and combinable where applicable.

---

### 1.6 Exercise
An **Exercise** is an atomic movement definition.

Exercises:
- belong to exactly one group
- may have planned and/or logged parameters
- may override group-level defaults during logging

---

## 2. Segment Rules

### 2.1 General Segment Rules

- Each segment has exactly one segment type
- All groups within a segment inherit the segment's execution logic
- A workout may contain multiple segments of different types
- Segments are executed sequentially, never in parallel

---

### 2.2 Segment Parameters by Type

#### Sets Segment
Parameters:
- number of sets or rounds (required)
- rest duration between sets/rounds (optional)
- optional tempo or notes

Supports:
- rep schemes
- weight schemes
- drop sets

---

#### EMOM Segment
Parameters:
- total duration (required)
- interval length (default 1 minute)
- **slots** (required): one or more scheduled work items

**EMOM Slots**
An EMOM segment is defined by a set of **Slots**.

Each Slot defines:
- `id` (e.g. `A`, `B`, `C`)
- `groupRef` (required): reference to an Exercise Group to perform in this slot
- optional `target` (reps/time/distance) and optional per-slot notes

The segment also defines a **slot schedule**:
- `slotSchedule` (required): mapping from interval index → slot id
  - examples: `A` (same slot every minute), `AB` (alternating), `AAB` (two minutes A then one minute B), or an explicit list for irregular schedules

Rules:
- Work is prescribed per interval.
- Failure to complete work within an interval is recorded as a miss/partial.
- EMOM supports **minute-indexed targets**, including fixed, ascending, descending, or custom targets.

> Design intent: Alternating EMOMs are modeled explicitly as slot schedules, not as supersets.

---

#### AMRAP Segment
Parameters:
- time cap (required)

Rules:
- Continuous work
- Completion tracked as rounds + partial reps
- Prescribed reps are targets, not schemes

---

#### Intervals Segment
Parameters:
- work duration
- rest duration
- number of rounds

Rules:
- Intensity-based execution
- Rep schemes are not applicable

---

## 3. Rep Schemes

Rep schemes define how reps change across sets.

Supported rep schemes:
- Standard (fixed reps)
- Ascending
- Descending
- Pyramid
- Drop Set
- Custom

### Rep Scheme Compatibility

| Segment Type | Rep Schemes Allowed |
|-------------|---------------------|
| Sets | All |
| EMOM | Fixed reps or linear ascending/descending targets |
| AMRAP | Not applicable |
| Intervals | Not applicable |

---

## 4. Weight Handling

### 4.1 Weight Scope

- Default: weight is defined **per exercise**
- Group-level weight locking is optional and typically used for complexes

### 4.2 Weight Schemes (Sets only)

Supported weight schemes:
- Fixed
- Ascending
- Descending
- Pyramid
- Drop

Weight schemes:
- apply only within Sets segments
- are subordinate to rep schemes

---

## 5. Logging Rules

### 5.1 Planned vs Performed

- All workouts may be planned, performed ad-hoc, or modified during execution
- Logged values may override planned values
- Deviations are preserved for analytics

---

### 5.2 Completion Tracking

- Sets: completed sets, reps, and load
- EMOM: completed vs missed intervals, actual reps
- AMRAP: rounds + partial reps
- Intervals: completed intervals and intensity markers

---

### 5.3 RPE

- Primary RPE is recorded at the **Segment** level
- Optional overall workout RPE may be recorded
- Exercise-level RPE is not required for v1

---

## 6. Hard Constraints (Non-Negotiable)

- A segment cannot mix execution styles
- Rep schemes cannot exist outside Sets segments (except EMOM targets)
- Time-based segments do not support weight schemes
- A group cannot exist outside a segment
- An exercise cannot exist outside a group

**Additional constraint (v1 recommendation):**
- Segments **SHOULD** contain exactly **one** group.
- Segments **MAY** contain multiple groups **only via explicit segment-level scheduling** (currently: **EMOM slots**). In that case, the segment’s `slots` must reference the groups used.

---

## 7. Relationship to FRD

This document defines all workout composition and execution rules.

The FRD references this document as the single source of truth for:
- workout structure
- execution logic
- grouping rules
- logging and completion behavior

The FRD intentionally omits these details to avoid duplication and drift.

