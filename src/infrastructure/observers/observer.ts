import { DomainEvent } from "../../domain/events/events"

export type Observer = (event: DomainEvent) => void

export const observers: Observer[] = []

export function subscribe(observer: Observer) {
	observers.push(observer)
}

export function notify(event: DomainEvent) {
	observers.forEach((observer) => observer(event))
}