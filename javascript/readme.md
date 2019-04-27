# Tools
* [Node.js](https://nodejs.org/en/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Git](https://git-scm.com/download/win) - Not mandatory but good to have

# Setting-up a Development Environment
1. Download [Starter Kit](https://github.com/abhishekgoenka/training/blob/master/javascript/starter.zip)
2. Go to `starter` folder and run `npm i`. This will download all the npm dependencies.
3. `npm start`. This will start the application in browser. If you see below screen, it means everything is correct.

![starter](https://github.com/abhishekgoenka/training/blob/master/javascript/ref/images/starter.png)


# JavaScript Language Features
Some of these features are relatively new to JavaScript and other features are just beyond the getting-started level. Let's take a look at what they are. We'll start off by looking at constants where we can declare symbols whose values cannot change. Next we'll look at the difference between the let and var keywords when we declare variables. We'll take a look at rest parameters. A rest parameter can collect up arguments and we'll look at destructuring. We can take an array and easily assign the elements of an array to variables. Likewise we can take an object and easily assign the properties of an object to variables. Next we'll look at spread syntax. That's a way of taking an array and spreading it out into its elements so that they can use it as parameters. Rest parameters and spread are opposite and we'll see that in the upcoming videos. Next we'll take a look at the built-in typeof function in JavaScript to get the type of a variable or constant or a literal. Next we'll look at common type conversions. Mainly this deals with converting from strings to numbers or any variable to a string. Finally we'll take a look at controlling loops. We'll see how we can break out of a loop or continue through a loop without executing the complete body. So let's get started and look at constants.

## Constants
The value of a variable can change during the execution of a program; however, sometimes we want to use a symbol that won't change and that type of symbol is called a constant. Here's how we declare a constant. 

```typescript
const carId;  // error
const carId = 5; 
carId = 6 // error
```

## let and var for Variable Declarations
 Here we have a code block for our if statement. The code block is between the curly braces. We're declaring a variable called `carId`, initializing it to 9, but then outside of that block we reference foo and that's fine. We get the value 9, but let works differently. Now in our code block we're using the let keyword. So the variable foo will only exist within that code block. Let has block scoping. Once program execution leaves that block, the variable foo no longer exists so when we try to log it out we get an error. 

 ```typescript
 if(true) {
    let carId = 9;
}
console.log(carId); // error
 ```

 ## Rest Parameters
 ```typescript
 function showCars(...cars) {
    cars.forEach(c => console.log(c));
}

showCars(100, 200, 300);
 ```

 ## Destructuring Arrays
 ```typescript
let carIds = [100, 200, 300];
let [car1, car2, car3 ] = carIds;
console.log(car1, car2, car3);  // 100 200 300

let [c1, ...cars] = carIds;
console.log(c1, cars);  // 100 [200, 300]

```

## Destructuring Objects
```typescript
let car = { 'name': 'Audi', 'color': 'blue' };

// example 1
let { name, color } = car;
console.log(name, color);   // Audi blue

// example 2
let name, color;
({ name, color } = car);
console.log(name, color);   // Audi blue
```

## Spread Syntax
```typescript

function showCars(car1, car2, car3) {
    console.log(car1, car2, car3);  // 100 200 300
}

let cars = [100, 200, 300];
showCars(...cars);
```

## typeof()
```typescript
console.log(typeof(1));         // number
console.log(typeof('1'));       // string
console.log(typeof(true));      // boolean
console.log(typeof(function f() {}));   // function
console.log(typeof({}));        // object
console.log(typeof(null));      // object
```

## Common Type Conversions
```typescript
console.log('foo'.toString());
console.log(Number.parseInt('55'));
```

## Controlling Loops
```typescript
for(let i =0; i < 10; i++) {
    if (i === 5) {
        break;
    }
    console.log(i)
} 
```

# Operators
By operators we mean the simple mathematical operators plus, minus, multiply, divide, that kind of thing, but there are actually many more different types of operators. 

## Equality Operators
```typescript
if (1 == '1') {
    console.log('1 == \'1\'');
}

if (1 === '1') {
    console.log('1 === \'1\'');
}

if (1 != '1') {
    console.log('1 != \'1\'');
}

if (1 !== '1') {
    console.log('1 !== \'1\'');
}
```

## Unary Operators
```typescript
let i =10;
i++;
++i;
i--;
--i;
console.log(i);
```

## Logical (Boolean) Operators
&& ||

```typescript
let i =10;
if (i > 1 && i < 10) {
    console.log(i);
}
```

## Relational Operators
```
<, >, >=, <=
```

## Conditional Operator
```typescript
let i =10;
if (i > 1 && i < 10) {
    console.log(i);
}
```

## Assignment Operators

## Operator Precedence
Operator precedence refers to the order in which operators get executed. [mozilla doc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

# Functions and Scope