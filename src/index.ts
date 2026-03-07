import {
	createSurvivor,
	createFoodStock,
	createDamage,
	applyZombieAttack
} from "./domain/survivor/factories"

import { subscribe, notify } from "./infrastructure/observers/observer"
import { sendEmailMock } from "./infrastructure/observers/email"
import { saveToDatabaseMock } from "./infrastructure/observers/database"

// register observers
subscribe(sendEmailMock)
subscribe(saveToDatabaseMock)

try {

	const survivor = createSurvivor("Lisa", 100)

	console.log("Survivor created:", survivor)

	notify({
		type: "SurvivorCreated",
		survivorId: survivor.id
	})

	const damage = createDamage(50)

	const attackedSurvivor = applyZombieAttack(survivor, damage)

	console.log("After zombie attack:", attackedSurvivor)

	notify({
		type: "ZombieAttack",
		survivorId: attackedSurvivor.id
	})

	const food = createFoodStock(3)

	if (food < 5) {
		notify({
			type: "FoodLow",
			level: food
		})
	}

} catch (error) {

	if (error instanceof Error) {
		console.error("Handled error:", error.message)
	} else {
		console.error("Unknown error")
	}

}

// wrong data test

try {

	createFoodStock(-10)

} catch (error) {

	if (error instanceof Error) {
		console.error("Invalid food prevented:", error.message)
	}

}