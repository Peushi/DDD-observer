import { v4 as uuidv4 } from "uuid"
import { Survivor } from "./survivor"
import { SurvivorId, SurvivorName, Health, FoodStock, Damage } from "./types"

// create survivor name
export function createSurvivorName(name: string): SurvivorName {
	if (!name) {
		throw new Error("Survivor name must exist")
	}
	return name as SurvivorName
}

// create health
export function createHealth(value: number): Health {
	if (value < 0) {
		throw new Error("Health cannot be negative")
	}
	return value as Health
}

// create food stock
export function createFoodStock(value: number): FoodStock {
	if (value < 0) {
		throw new Error("Food stock cannot be negative")
	}
	return value as FoodStock
}

// create damage
export function createDamage(value: number): Damage {
	if (value <= 0) {
		throw new Error("Damage must be positive")
	}
	return value as Damage
}

// create survivor
export function createSurvivor(
	name: string,
	health: number
): Survivor {

	return {
		id: uuidv4() as SurvivorId,
		name: createSurvivorName(name),
		health: createHealth(health)
	}
}

// apply zombie damage
export function applyZombieAttack(
	survivor: Survivor,
	damage: Damage
): Survivor {

	const newHealth = survivor.health - damage

	return {
		...survivor,
		health: createHealth(Math.max(0, newHealth))
	}
}