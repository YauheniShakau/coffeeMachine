// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

let run = true;

const coffeeTypes = [{type: 'espresso', water: 35, milk:0, coffee: 18, cups: 1, cost: 4},
    {type: 'latte', water: 35, milk: 215, coffee: 18, cups: 1, cost: 7},
    {type: 'cappuccino', water: 35, milk: 145, coffee: 18, cups: 1, cost: 6}];

let coffeeMachine = {
    users: {
        admin: 'admin',
        collector: 'collector'
    }, //Primitive authorization
    ingredients: {
        water: 400,
        milk: 540,
        coffee: 120,
        cups: 9
    },
    cash: 550,
    status() {
        console.log(`The coffee machine has:
        ${this.ingredients.water} ml of water
        ${this.ingredients.milk} ml of milk
        ${this.ingredients.coffee} g of coffee beans
        ${this.ingredients.cups} disposable cups
        Balance: $${this.cash}`)
    },
    fill() {
        if (this.users.admin === input('Please, enter password: ')) {
            this.ingredients.water += Number(input('Write how many ml of water you want to add: '));
            this.ingredients.milk += Number(input('Write how many ml of milk you want to add: '));
            this.ingredients.coffee += Number(input('Write how many grams of coffee beans you want to add: '));
            this.ingredients.cups += Number(input('Write how many disposable coffee cups you want to add: '));
        } else {
            console.log('Wrong password');
        }
    },
    makeCoffee() {
        let type = input('What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino: ');
        switch (type) {
            case 'back':
                return;
            case '1':
            case '2':
            case '3':
                --type;
                this.cash += coffeeTypes[type].cost;
                this.ingredients.water -= coffeeTypes[type].water;
                this.ingredients.milk -= coffeeTypes[type].milk;
                this.ingredients.coffee -= coffeeTypes[type].coffee;
                this.ingredients.cups -= coffeeTypes[type].cups;

                //Collecting indexes of finished ingredients
                let ingredientsCheck = Object.values(this.ingredients)
                    .map((a, i) => a < 0 ? i : -1)
                    .filter(a => a !== -1);

                if (ingredientsCheck.length !== 0) {
                    //I used process.stdout.write() to log without \n
                    process.stdout.write('Sorry, not enough');
                    //Here I change indexes to keys (ingredients)
                    ingredientsCheck.forEach(a =>
                        process.stdout.write(` ${Object.keys(this.ingredients)[a]}`));
                    console.log('!');
                    //Put everything back, because coffeeMachine can't make a coffee
                    this.cash -= coffeeTypes[type].cost;
                    this.ingredients.water += coffeeTypes[type].water;
                    this.ingredients.milk += coffeeTypes[type].milk;
                    this.ingredients.coffee += coffeeTypes[type].coffee;
                    this.ingredients.cups += coffeeTypes[type].cups;
                    break;
                } else {
                    console.log('I have enough resources, making you a coffee!')
                }
                break;
            default: console.log('Something went wrong');
        }
    },
    cashOut() {
        if (this.users.collector === input('Please, enter password: ')) {
            console.log(`Cash withdrawal $${this.cash}`);
            this.cash = 0;
        } else {
            console.log('Wrong password');
        }
    }
}

while (run) {
    switch (input('Write action (buy, fill, take, status, exit): ')) {
        case 'buy':
            coffeeMachine.makeCoffee();
            break;
        case 'fill':
            coffeeMachine.fill();
            break;
        case 'take':
            coffeeMachine.cashOut();
            break;
        case 'exit':
            run = false;
            break;
        case 'status':
            coffeeMachine.status();
            break;
        default:
            console.log('Wrong action. Type \'exit\' to exit the program');
            break;
    }
}
