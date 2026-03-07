import { DomainEvent } from "../../domain/events/events"

export const saveToDatabaseMock = (event: DomainEvent) => {
	console.log("Database log:", JSON.stringify(event))
}