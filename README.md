# Zombie Apocalypse Survival System

### Strong Typing in TypeScript for Robust Domain-Driven Design

This project models a **Zombie Apocalypse survival system** using **Domain-Driven Design (DDD)** concepts and **strong typing in TypeScript**.

The system demonstrates how a survivor's state (health, food supply, zombie attacks) can be modeled using **branded types, smart constructors, and domain events** while observers react to important survival events.

---

## Prerequisites

Before working on this project, you should be familiar with:

- Running TypeScript with Node.js
- Basic TypeScript types (`number`, `string`, `boolean`)
- Functions and type annotations
- Type safety and compile-time checks
- Factory functions and smart constructors
- Value objects and entities
- Observer Pattern

---

## Learning Objectives

The goal of this project is to demonstrate how **domain rules can be enforced through strong typing and domain logic**, ensuring invalid states cannot exist inside the system.

| Concept                   | What it solves                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------ |
| **Branded Types**         | Prevent mixing values that share the same primitive type (e.g., `Health`, `Damage`, `FoodStock`) |
| **Smart Constructors**    | Validate survival rules at creation time so invalid values cannot exist                          |
| **Value Objects**         | Model domain concepts like `Health`, `Damage`, and `FoodStock` as immutable types                |
| **Entities**              | Represent things with identity and lifecycle such as a `Survivor`                                |
| **Parse, Don't Validate** | Convert raw input into safe domain types at the system boundary                                  |

---

## Project Structure

```
DDD-observer/
  src/
    domain/
      survivor/
        survivor.ts
        factories.ts
        types.ts
    infrastructure/
      observers/
        observer.ts
        email.ts
        database.ts
    index.ts        # CLI runner – runs the survival simulation
```

---

## Getting Started

Install dependencies:

```bash
npm install
```

Run the simulation:

```bash
npm run dev
```

This will simulate a **zombie survival scenario**, including survivor creation, zombie attacks, food checks, and domain events.

---

## How the Simulation Works

The application demonstrates several survival scenarios:

1. A **survivor is created**
2. A **zombie attack occurs**
3. The survivor's **health is reduced**
4. **Food supplies are monitored**
5. Domain events trigger **observers**

Observers react to events such as:

- Survivor creation
- Zombie attacks
- Low food levels

---

## Domain Model

### Survivor Entity

Represents a survivor in the apocalypse.

| Property | Type           |
| -------- | -------------- |
| id       | `SurvivorId`   |
| name     | `SurvivorName` |
| health   | `Health`       |

The survivor's health changes when attacked by zombies.

---

## Domain Events

Important events are emitted when survival conditions change.

### SurvivorCreated

Emitted when a new survivor enters the system.

```ts
{
  type: "SurvivorCreated",
  survivorId: string
}
```

### ZombieAttack

Emitted when a zombie attack damages a survivor.

```ts
{
  type: "ZombieAttack",
  survivorId: string
}
```

### FoodLow

Emitted when food supplies drop below a safe threshold.

```ts
{
  type: "FoodLow",
  level: number
}
```

---

## Observer Pattern

Observers react to domain events without the domain needing to know about them. This keeps the system **loosely coupled and extensible**.

### Email Observer

Simulates sending an alert email when an important event occurs.

Example output:
```
Email alert triggered: ZombieAttack
```

### Database Observer

Simulates saving domain events to a database log.

Example output:
```
Database log: {"type":"ZombieAttack","survivorId":"..."}
```

---

## Example Scenario

Running the project produces output similar to:

```
Survivor created: { id: "...", name: "Lisa", health: 100 }

Email alert triggered: SurvivorCreated
Database log: {"type":"SurvivorCreated","survivorId":"..."}

After zombie attack: { id: "...", name: "Lisa", health: 50 }

Email alert triggered: ZombieAttack
Database log: {"type":"ZombieAttack","survivorId":"..."}

Email alert triggered: FoodLow
Database log: {"type":"FoodLow","level":3}
```

---

## Preventing Invalid Data

### Without Strong Typing

```ts
type Survivor = {
  name: string
  health: number
}
```

This allows invalid values:

```ts
health: -50  //Invalid but compiler doesn't catch it
```

### With Branded Types and Smart Constructors

```ts
type Health = number & { readonly __brand: unique symbol }

function createHealth(value: number): Health {
  if (value < 0) {
    throw new Error("Health cannot be negative")
  }
  return value as Health
}
```

Now:

- `health = -50` is impossible
- Invalid values throw runtime errors
- Domain rules are enforced automatically

---

## Key Takeaways

**Make illegal states unrepresentable.**  
If health cannot be negative, the type system should enforce it.

**Push validation to the boundary.**  
Convert raw input into safe domain types early.

**Keep domain logic inside domain objects.**  
Zombie damage logic belongs in the domain, not random utility functions.

**Use types as documentation.**  
When a function expects `Health` instead of `number`, its meaning is immediately clear.

---