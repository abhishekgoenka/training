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
Some of these features are relatively new to JavaScript and other features are just beyond the getting-started level. Let's take a look at what they are. We'll start off by looking at constants where we can declare symbols whose values cannot change. Next we'll look at the difference between the let and var keywords when we declare variables. We'll take a look at rest parameters. A rest parameter can collect up arguments and we'll look at destructuring. We can take an array and easily assign the elements of an array to variables. Likewise we can take an object and easily assign the properties of an object to variables. Next we'll look at spread syntax. That's a way of taking an array and spreading it out into its elements so that they can use it as parameters. Rest parameters and spread are opposite and we'll see that in the upcoming examples. Next we'll take a look at the built-in typeof function in JavaScript to get the type of a variable or constant or a literal. Next we'll look at common type conversions. Mainly this deals with converting from strings to numbers or any variable to a string. Finally we'll take a look at controlling loops. We'll see how we can break out of a loop or continue through a loop without executing the complete body. So let's get started and look at constants.

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
Block scope wasn't available in JavaScript until recently with the ES2015 release of JavaScript. So we'll take a close look at that. 

## Function Scope
```typescript

function startCar(carId) {
    let message = 'starting...';
    let startFun = function () {
        let message = 'override';
    };
    startFun();
    console.log(message);   // starting...
}

startCar(123);
```

## Block Scope
By block we're referring to a code block. That's code that's placed in between curly braces. So by block scope we're talking about the lifetime of variables as they exist within curly braces. That could be for an if statement, a while loop, a for loop, or any set of curly braces other than a function. 

## IIFE's
IIFE stands for immediately invoked function expression 

```typescript
(function () {
    var message = 'starting...';
    let startFun = function () {
        var message = 'override';
    };
    startFun();
    console.log(message);   // starting...
})();

```

## Closures
Normally when a function executes it runs through all its code and then completes. All of its variables go out of scope, all of its functions go out of scope, but sometimes we want that function and its variables and nested functions to hang around and that's what a closure is.

```typescript
let carid = (function () {
    var message = 'starting...';
    let startFun = function () {
        var message = 'override';
    };
    startFun();
    console.log(message);   // starting...
    return 123;
})();

console.log(carid);
```

## The this Keyword
There's a special keyword we can use within functions. It's called this and this refers to an object, but it doesn't refer to the function as an object itself.

```typescript
let carObj = {
    carId : 123,
    startCar : function() {
        return this.carId;
    }
}

console.log(`started car ${carObj.startCar()}`);
```

## call and apply
You can use the call function and the apply function and the main purpose of these two functions is to change the value of this.

```typescript
let carObj = {
    carId : 123,
    startCar : function() {
        return this.carId;
    }
}

let newCarObj = { carId : 555 };
console.log(`started car ${carObj.startCar.call(newCarObj)}`);
```

```typescript
let carObj = {
    carId : 123,
    startCar : function(color) {
        console.log(color);
        return this.carId;
    }
}

let newCarObj = { carId : 555 };
console.log(`started car ${carObj.startCar.apply(newCarObj, ['green'])}`);
```

## bind
It makes a copy of that function and assigns a new context, a value that will be accessed by this.

```typescript
let carObj = {
    carId : 123,
    startCar : function(color) {
        console.log(color);
        return this.carId;
    }
}

let newCarObj = { carId : 555 };
let newFunc = carObj.startCar.bind(newCarObj, 'green');
console.log(`started car ${newFunc()}`);
```

## Arrow Functions
Arrow functions do not have their own `this` value. This refers to the enclosing context. So arrow functions were designed to get around problems with the `this` value
```typescript
let carObj = {
    carId : 123,
    startCar : (color, cardId) => { 
        console.log(color);
        return cardId;
    }
}

let newCarObj = { carId : 555 };
let newFunc = carObj.startCar.bind(newCarObj, 'green', newCarObj.carId);
console.log(`started car ${newFunc()}`);
```

OR

```typescript
let carObj = {
    carId : 123,
    startCar : (cardId) =>  cardId
}

let newCarObj = { carId : 555 };
let newFunc = carObj.startCar.bind(newCarObj, newCarObj.carId);
console.log(`started car ${newFunc()}`);
```

## Default Parameters
```typescript
let car = function(carId, color = 'blue') {
    console.log(carId, color);
}

car(123);   // 123 "blue"
car(123, 'green');  // 123 "green"
```

# Objects and Arrays
We'll start off by looking at constructor functions and how we can instantiate new objects.

## Constructor Functions
A constructor function in JavaScript is used to instantiate new objects. It looks a lot like a regular function, but it behaves very differently. 

```typescript
function Car(carid) {
    this.carid = carid;
    this.start = function() {
        console.log(`start `, this.carid);
    }
}

let car = new Car(123);
car.start();
```

## Prototypes
The subject of prototypes is very complex so we're only going to cover the basics
```typescript
function Car(carid) {
    this.carid = carid;
}

Car.prototype.start = function() {
    console.log(`start `, this.carid);
}

let car = new Car(123);
car.start();
```

```typescript
String.prototype.Hello = function() {
    return `Hello ${this.toString()}`;
} 
console.log('Abhishek'.Hello());
```

## JSON - JavaScript Object Notation
The purpose of JSON is to transmit JavaScript objects over the wire. 

```typescript
let Car = {
    carId : 123,
    color : 'green'
};

console.log(JSON.stringify(Car));   // {"carId":123,"color":"green"}
```

## Array Iteration
```typescript
let cars = [
    {
        carId : 123,
        color : 'green'
    },
    {
        carId : 444,
        color : 'blue'
    }
]

cars.forEach(car => console.log(car.carId, car.color));
cars.forEach((car, index) => console.log(index, car.carId, car.color));
```

# Classes and Modules
Classes give us the new syntax in order to create constructor functions. It's more similar to Java and C++ and C# and modules is a way to organize our code. 

## Constructors and Properties
```typescript
class Car {
    constructor(carId) {
        this.carId = carId;
    }
}

Car.prototype.start = function() {
    console.log(`start `, this.carId);
}

let car = new Car(123);
car.start();
```

## Methods
```typescript
class Car {
    constructor(carId) {
        this.carId = carId;
    }

    identify() {
        return this.carId;
    }
}

let car = new Car(123);
console.log(car.identify());
```

## Inheritance
```typescript
class Vehicle {
    constructor(type) {
        this.type = type;
    }
}

class Car extends Vehicle {
    constructor(carId) {
        super('Car');
        this.carId = carId;
    }

    identify() {
        return `${this.type} id is ${this.carId}`;
    }
}

let car = new Car(123);
console.log(car.identify());
```

## Module
```typescript
// car.js
export class Car {
    constructor(carId) {
        this.carId = carId;
    }

    identify() {
        return this.carId;
    }
}

// index.js
import { Car } from './models/car'

let car = new Car(123);
console.log(car.identify());
```

# Programming the BOM and DOM
BOM refers to the Browser Object Model and that lets you access functionality in the browser. You can change the URL you're pointing at, get information on the URL, and that kind of thing. And the Document Object Model is the DOM. That's what we use to change the actual web page. 

## The window Object
https://developer.mozilla.org/en-US/docs/Web/API/Window

```typescript
year = 1990;
console.log(window.year);
```
> When we're working with modules we need to make sure to declare our variables because they will not be placed on the global window object. So we could use the let keyword to declared year at the module level


## Timers
They fire asynchronously so events can get handled and other code can execute while you're waiting for a timer to fire. Timers are used for animation, to handle things with the user interface, for video games, and lots of other uses.

```typescript
let timeoutId = setTimeout(() => {
console.log('1 second passed')
}, 1000);

console.log(`programe finished`);

// If need to cancel...
clearTimeout(timeoutId);
```

```typescript
let timeoutId = setInterval(() => {
console.log('1 second passed')
}, 1000);

console.log(`programe finished`);

// If need to cancel...
clearTimeout(timeoutId);
 ```

## The location Object
The location object is part of the BOM, the Browser Object Model. We get information on the URL that the browser is pointing to.

https://developer.mozilla.org/en-US/docs/Web/API/Location

## The document Object
The DOM is a huge topic so we're only going to cover it briefly here and here we have some of the common properties, methods, and on document.

Properties

* Body
* Forms
* Links

Method

* createElement()
* createEvent()
* getElementById()
* getElementsByClassName()

Event

* onload
* onclick
* onkeypress

Selecting and Modifying DOM Elements
```typescript
let element = window.document.getElementById('first');
element.textContent = 'Some new text';
element.setAttribute('name', 'newName');
element.classList.add('newClass');
element.style.color = 'green';
```

# Promises and Error Handling
When something goes wrong in a JavaScript program we want to be in control. So we'll look at the mechanisms in place to help us handle errors and make sure everything runs smoothly.

## Error Handling Using try and catch
```typescript
try {
    let abc = xyx;
    console.log(abc);    
} catch (error) {
    console.log(error)
} finally {
    console.log('finally block');
}

console.log(`continue...`);

```

```typescript
// throw your own error
throw new Error('My custom error');
```

## Creating a Promise
Promises are designed to work with asynchronous JavaScript. So if you're working with a timer or if you're working with HTTP calls, you can think of a promise as a temporary holder for a value that you'll retrieve once an asynchronous operation completes. 

```typescript
let promise = new Promise((resolve, reject) => {
    // resolve(123);
    // reject('some err');
});

promise.then((result) => console.log(result), (err) => console.log(err));
promise.catch((err) => console.log(err));
promise.finally(() => console.log('promise finally'));
```

# Data Access Using HTTP
We'll start of by looking at the HTTP protocol to request data using the XHR mechanism.


## HTTP Requests Using XHR
If we look at this acronym XHR, the H and the R stand for HTTP requests, but the X actually stands for XML and that was the popular file format when this was created. 
```typescript
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        console.log(this.responseText);
    }
};

xhttp.open('GET', 'https://5cc57207f24a0f0014cd1cee.mockapi.io/users', true);
xhttp.send();
```

## HTTP Requests Using jQuery
Install `jQuery` via npm
>  npm i jquery

Import in your JavaScript file
> import $ from 'jquery';

```typescript
$.get('https://5cc57207f24a0f0014cd1cee.mockapi.io/users', data => console.log(data));
```

```typescript
let promise = $.get('https://5cc57207f24a0f0014cd1cee.mockapi.io/users');
promise.then(data => console.log(data));
```

POST
```typescript
let user = {
    'avatar': "https://s3.amazonaws.com/uifaces/faces/twitter/scrapdnb/128.jpg",
    'createdAt': "2019-04-28T03:05:29.332Z",
    'id': "1000",
    'name': "Abhishek Goenka"
}
let promise = $.post('https://5cc57207f24a0f0014cd1cee.mockapi.io/users', user);
promise.then(data => console.log(data));
```

# Assignment
Create a form with fields specifed in `POST` request. On click of submit post data to server. 

## Extendent Assignemnt
Display all the users in grid