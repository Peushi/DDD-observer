import { SurvivorId, FoodStock } from "../survivor/types"

export type SurvivorCreatedEvent = {
	type: "SurvivorCreated"
	survivorId: SurvivorId
}

export type ZombieAttackEvent = {
	type: "ZombieAttack"
	survivorId: SurvivorId
}

export type FoodLowEvent = {
	type: "FoodLow"
	level: FoodStock
}

export type DomainEvent =
	| SurvivorCreatedEvent
	| ZombieAttackEvent
	| FoodLowEvent