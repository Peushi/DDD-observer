# Zombie Apocalypse Survival Camp Domain

## 1. Domain Overview

This domain models a survival camp during a zombie apocalypse.

The camp manages:
- Survivors
- Food supplies
- Dangerous missions
- Zombie attacks

The Domain Layer enforces business rules and emits Domain Events.
It does NOT:
- Log to console
- Send notifications
- Persist data
- Handle UI

Side effects are handled via the Observer Pattern.

---

## 2. Ubiquitous Language

| Term | Meaning |
|------|--------|
| Camp | Group of survivors |
| Survivor | Person inside the camp |
| FoodStock | Total food available |
| Mission | Risky operation outside camp |
| Domain Event | Event emitted after state change |

---

## 3. Business Rules

### Rule 1 — Food Cannot Be Negative
FoodStock must always be ≥ 0.

If food would drop below zero → throw error.

---

### Rule 2 — Mission Requires Minimum Survivors
A mission requires at least 2 alive survivors.

---

### Rule 3 — Survivor Death Is Final
If health reaches 0:
- Survivor becomes dead
- Cannot participate in missions

---

### Rule 4 — Low Food Warning
If food drops below 5 units:
- Emit FoodLowEvent

---

## 4. Domain Events

- FoodLowEvent
- MissionStartedEvent
- SurvivorDiedEvent

---

## 5. Architecture

Domain Layer:
- SurvivalCamp (Aggregate)
- Survivor (Entity)
- Branded types
- Smart constructors
- Domain events

Observers:
- Logging system
- Emergency alert
- Mock zombie alarm

This ensures separation of concerns.