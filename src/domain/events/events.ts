import { SurvivorId, FoodStock } from "../survivor/types"

export type FoodLowEvent = {
	type: "FoodLow"
	level: FoodStock
}

export type SurvivorDiedEvent = {
	type: "SurvivorDied"
	survivorId: SurvivorId
}

export type MissionStartedEvent = {
	type: "MissionStarted"
}

export type DomainEvent =
	| FoodLowEvent
	| SurvivorDiedEvent
	| MissionStartedEvent