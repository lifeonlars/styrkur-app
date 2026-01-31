# Styrkur Saga – Agent Overview / README

> **Purpose**  
> This document is the **entry point for Claude Code and other agents** working on Styrkur Saga.  
> It explains *what this product is*, *which documents are authoritative*, *what v1 explicitly is and is not*, and *how to orient yourself before writing code*.

This file is intentionally short and non-ambiguous. If something is not defined here, follow the links.

---

## 1. What Styrkur Saga Is

Styrkur Saga is a **mobile‑first, offline‑first workout planner and tracker** focused on **long‑term strength training programming**, not just logging individual workouts.

Key differentiators:
- Explicit support for **Programs → Blocks → Cycles → Sessions**
- Clear separation of **planning** vs **execution/logging**
- Constraints that reflect real‑world strength training, not infinite flexibility

Design goals:
- Dark‑mode first
- PWA‑ready
- Touch‑first interaction
- Fast, local, and reliable even without connectivity


---

## 2. Canonical Documents (Source of Truth)

The following documents are **authoritative**. Do not duplicate, reinterpret, or partially re-implement their logic elsewhere.

### 2.1 Functional Requirements Document (FRD)
- Defines the **product model, terminology, scope, and constraints**
- Locks the mental model used in UX and code

📄 STYRKURSAGA-FRD.md  
→ Product truth

---

### 2.2 Workout Specification
- Defines **workout composition, execution styles, and hard constraints**
- Governs how workouts, segments, groups, and exercises behave

📄 WORKOUT_SPEC.md  
→ Domain & data-model truth

---

### 2.3 Screen Inventory
- Defines **which screens exist**, their routes, required states, and primary actions
- Acts as the UI coverage checklist
- Does **not** define interaction behavior or components

📄 SCREENS.md  
→ Screen inventory & routing truth

---

### 2.4 UI Patterns
- Defines **reusable UI components and interaction laws**
- Governs how editors, lists, logging, and commit actions behave
- Is intentionally **screen-agnostic**

📄 UI_PATTERNS.md  
→ Interaction & component behavior law

---

If a feature or UI interaction conflicts with **any** of these documents, **the feature is wrong**.

## How These Documents Fit Together (Critical)

Agents must use the documents in this order:

1. **FRD**  
   → Is this concept allowed? What is it?

2. **WORKOUT_SPEC**  
   → How must workouts and execution behave?

3. **SCREENS.md**  
   → Which screens exist and what must each one do?

4. **UI_PATTERNS.md**  
   → How should the UI behave everywhere?

If you find yourself inventing:
- new interaction patterns
- screen-specific UI behavior
- implicit automation

Stop and re-read UI_PATTERNS.md.  
If it’s still unclear, ask.




---

## 3. What v1 Is (and Is Not)

### v1 IS:
- Local‑first (offline‑first) application
- Manual planning and progression
- Explicit, user‑controlled structure
- Single active Program at a time
- Sequential Blocks and Cycles

### v1 IS NOT:
- Automatic progression or overload engines
- AI‑driven planning logic
- Wearable integration
- Social features
- Parallel or overlapping Programs

If something smells like “smart automation”, it is probably **out of scope**.

---

## 4. High‑Level Mental Model (Non‑Negotiable)

- **Program** – long‑term intent and sequence
- **Block** – structural phase and rhythm
- **Cycle** – concrete, editable planning instance
- **Workout** – reusable session template
- **Session** – immutable logged performance

Templates never mutate historical data. Instances are sacred.

---

## 5. Tech Stack (Current Intent)

This is not a promise of final architecture, but the **working assumption for v1**.

- **Frontend**: React + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui (Base UI primitives)
- **Charts**: shadcn default charts (Recharts under the hood)
- **Icons**: Phosphor (via shadcn)
- **Storage (v1)**: Local storage / IndexedDB abstraction
- **Backend (later)**: Supabase (sync + auth, not required for v1)

---

## 6. How to Start as an Agent

Before writing code:
1. Read **FRD** end‑to‑end
2. Read **WORKOUT_SPEC** end‑to‑end
3. Assume **no hidden logic** beyond what is written
4. Prefer **explicit state and constraints** over inference

If unsure:
- Re‑read the spec
- Ask for clarification
- Do **not** invent behavior

---

## 7. What Comes Next (Deliberately Separate)

The following will live in **separate documents** and are *not* defined here:
- Product roadmap / build order
- Screen inventory and navigation
- UI patterns and reusable components
- Implementation and data‑layer strategy
- Agent operating rules

This README exists solely to **orient** and **de‑risk early implementation**.

---

*If you cannot explain a feature using only this README + the FRD + the Workout Spec, it does not belong in v1.*

