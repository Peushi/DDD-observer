## Hello Peushi! :grin: 
Here are my feedbacks! 
## Overall 

The code is clear and generally well structured. The domain logic is easy to follow, and the separation between files makes the project readable.

## Fixes 
I would recommend additional validation limits within your factories.

Using readonly for your brand types could also be a great improvement to prevent accidental mutations.

For example: 

in **src/domain/survivor/factories.ts** 

    createSurvivorName() -> you should add a limit to reject " " (empty space string) or names with odd charcaters like @ or %. 
    
    createHealth() -> assuming that the health should be within a reasonable range. I'd recommend adding a maximum limit.
    
in **src/domain/survivor/survivor.ts** 

    It could be helpful to mark each property of the type as readonly