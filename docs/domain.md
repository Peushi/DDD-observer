# Zombie Apocalypse Survival Domain

This domain models a group of survivors trying to survive a zombie apocalypse.

Each survivor has:
- a unique id
- a name
- a health level

Survivors can be attacked by zombies which reduces their health.

The camp also manages food supplies. When food drops below a safe threshold,
a "FoodLow" event is emitted.

Domain events are emitted whenever important actions occur, such as:

- SurvivorCreated
- ZombieAttack
- FoodLow

Observers listen to these events and react accordingly. In this project,
observers simulate infrastructure systems such as sending emails or saving
data to a database.

The system uses smart constructors and branded types to prevent invalid data,
ensuring the domain remains consistent and safe.