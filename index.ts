import {
	createSurvivor,
	createHealth,
	createFoodStock,
	damageSurvivor
} from "./domain/survivor/factories"

import { emit } from "./infrastructure/observers/observer"
import { observers } from "./infrastructure/observers/observer"

import { sendEmailMock } from "./infrastructure/observers/email"
import { saveToDatabaseMock } from "./infrastructure/observers/database"

observers.push(sendEmailMock)
observers.push(saveToDatabaseMock)

try {

	const Lisa = createSurvivor(
		"Lisa",
		createHealth(100)
	)

	let food = createFoodStock(10)

	console.log("Camp created:", Lisa)

	food = createFoodStock(food - 7)

	if (food < 5) {
		emit({
			type: "FoodLow",
			level: food
		})
	}

	const attacked = damageSurvivor(Lisa, 120)

	if (attacked.health === 0) {
		emit({
			type: "SurvivorDied",
			survivorId: attacked.id
		})
	}

	emit({
		type: "MissionStarted"
	})

} catch (error) {

	if (error instanceof Error) {
		console.error(error.message)
	}

}

// wrong data test

try {

	createHealth(-100)

} catch (error) {

	if (error instanceof Error) {
		console.error("Handled error:", error.message)
	}

}