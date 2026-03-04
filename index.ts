import { v4 as uuidv4 } from "uuid"

/*
 Zombie Apocalypse Domain
 Now uses:
 - Factory methods (static create)
 - Smart constructors
 - Branded types
 - Aggregate root
 - Real Observer pattern (subscribe / unsubscribe / notify)
 */

// Branded Types

type FoodStock = number & { readonly brand: unique symbol }
type Health = number & { readonly brand: unique symbol }
type SurvivorId = string & { readonly brand: unique symbol }


// Smart Object Creation

function createFoodStock(value: number): FoodStock {
  if (value < 0) throw new Error("Food cannot be negative")
  return value as FoodStock
}

function createHealth(value: number): Health {
  if (value < 0) throw new Error("Health cannot be negative")
  return value as Health
}

function createSurvivorId(id: string): SurvivorId {
  if (!id) throw new Error("Invalid Survivor ID")
  return id as SurvivorId
}

// Domain Events

interface DomainEvent {
  type: string
}

class FoodLowEvent implements DomainEvent {
  type = "FoodLowEvent"
}

class SurvivorDiedEvent implements DomainEvent {
  type = "SurvivorDiedEvent"
}

class MissionStartedEvent implements DomainEvent {
  type = "MissionStartedEvent"
}

// Observer Type

type Observer<T> = (event: T) => void

// Entity

class Survivor {
  private constructor(
    public readonly id: SurvivorId,
    public readonly name: string,
    private health: Health
  ) {}

  static create(name: string, health: number): Survivor {
    return new Survivor(
      createSurvivorId(uuidv4()),
      name,
      createHealth(health)
    )
  }

  isAlive(): boolean {
    return this.health > 0
  }

  takeDamage(amount: number): void {
    if (!this.isAlive()) {
      throw new Error("Dead survivor cannot take damage")
    }

    const newHealth = this.health - amount
    this.health = createHealth(Math.max(0, newHealth))
  }
}

// Aggregate Root

class SurvivalCamp {
  private observers: Observer<DomainEvent>[] = []

  private constructor(
    private survivors: Survivor[],
    private food: FoodStock
  ) {}

  static create(survivors: Survivor[], food: number): SurvivalCamp {
    return new SurvivalCamp(survivors, createFoodStock(food))
  }

  // Observer management

  subscribe(observer: Observer<DomainEvent>): void {
    this.observers.push(observer)
  }

  unsubscribe(observer: Observer<DomainEvent>): void {
    this.observers = this.observers.filter(o => o !== observer)
  }

  private notify(event: DomainEvent): void {
    this.observers.forEach(observer => observer(event))
  }

  // Domain behavior

  consumeFood(amount: number) {
    const validAmount = createFoodStock(amount)

    if (this.food < validAmount) {
      throw new Error("Not enough food")
    }

    this.food = createFoodStock(this.food - validAmount)

    if (this.food < 5) {
      this.notify(new FoodLowEvent())
    }
  }

  startMission() {
    const alive = this.survivors.filter(s => s.isAlive())

    if (alive.length < 2) {
      throw new Error("Mission requires at least 2 alive survivors")
    }

    this.notify(new MissionStartedEvent())
  }

  zombieAttack() {
    const alive = this.survivors.filter(s => s.isAlive())
    if (alive.length === 0) return

    const victim = alive[Math.floor(Math.random() * alive.length)]
    victim.takeDamage(50)

    if (!victim.isAlive()) {
      this.notify(new SurvivorDiedEvent())
    }
  }
}

// Observers

function logObserver(event: DomainEvent) {
  console.log("LOG:", event.type)
}

function emergencyObserver(event: DomainEvent) {
  if (event.type === "SurvivorDiedEvent") {
    console.log("Emergency Protocol Activated!")
  }
}

function zombieRiskObserver(event: DomainEvent) {
  if (event.type === "FoodLowEvent") {
    console.log("Low food increases zombie threat!")
  }
}

// Application Layer

try {
  const camp = SurvivalCamp.create(
    [
      Survivor.create("Alice", 100),
      Survivor.create("Bob", 100)
    ],
    10
  )

  camp.subscribe(logObserver)
  camp.subscribe(emergencyObserver)
  camp.subscribe(zombieRiskObserver)

  camp.consumeFood(7)
  camp.startMission()
  camp.zombieAttack()

  camp.unsubscribe(logObserver)

  camp.consumeFood(3)

} catch (error) {
  console.error("Handled error:", error)
}

// Wrong data tests

try {
  createFoodStock(-100)
} catch {
  console.log("Negative food prevented")
}

try {
  const badCamp = SurvivalCamp.create(
    [Survivor.create("Solo", 100)],
    10
  )
  badCamp.startMission()
} catch {
  console.log("Mission prevented with insufficient survivors")
}