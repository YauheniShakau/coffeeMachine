# Coffee Machine · JavaScript CLI

A terminal simulation of a coffee machine. It tracks ingredients and cash in memory, sells three drinks, and restores the previous balance and stock when a purchase fails.

## Implementation guide

| File or directory | Purpose |
| --- | --- |
| [`main.js`](main.js) | Recipes, machine state and interactive commands |

## Run in a compatible environment

Use the educational runtime that supplies the `sync-input` module, then run `node main.js`. The public npm package currently has no installable version. For a standalone smoke check, run `node --check main.js`. The illustrated run uses an input stub for the four shown responses.

| Drink | Choice | Water | Milk | Coffee | Price |
| --- | --- | ---: | ---: | ---: | ---: |
| Espresso | 1 | 35 ml | 0 ml | 18 g | $4 |
| Latte | 2 | 35 ml | 215 ml | 18 g | $7 |
| Cappuccino | 3 | 35 ml | 145 ml | 18 g | $6 |

The `fill` and `take` actions use hardcoded exercise credentials. Each run starts with the same stock and cash.

[Implementation history](https://github.com/YauheniShakau/coffeeMachine/commits/main/)
