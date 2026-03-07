export type Brand<T, B> = T & { readonly __brand: B }

export type SurvivorId = Brand<string, "SurvivorId">
export type SurvivorName = Brand<string, "SurvivorName">
export type Health = Brand<number, "Health">
export type FoodStock = Brand<number, "FoodStock">
export type Damage = Brand<number, "Damage">