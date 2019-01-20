/*
...... JavaScript Exercises .....
...... from the book Eloquent JavaScript.....
*/



/*
=================== 1. Values, Types, and Operators ============================
*/
/*
=================== 2. Program Structure =======================================
*/
/*
===================== 3. Functions =============================================
*/
/*
================= 4. Data Structures: Objects and Arrays =======================
  4.1 Sum of a range
  4.2 Reversing and array
  4.3 A list
  4.4 Deep comparison
*/

// 4.1 Sum of a range  ---------------------------------------------------------
function range(start, end) {
  output = [];
	for (i = start; i <= end; i ++) {
    	output.push(i);
    };
  return output;

};

function range(start, end, step = 1) {
  output = [];

  i = start;
  if (start < end & step > 0) {
    for (i = i; i <= end; i ++) {
  	  output.push(i);
    };
  } else if (start > end & step < 0) {
    for (i = i; i >= end; i --) {
  	  output.push(i);
    };
  } else {
    console.log('defaulting');
    for (i = i; i <= end; i ++) {
  	  output.push(i);
    };
  };

  return output;
};

function sum(x) {
  output = 0;
  for (i = 0; i < x.length; i ++) {
    output += x[i];
  };
  return output;
};

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55

// 4.2 Reversing an array ------------------------------------------------------
function reverseArray(a) {
  output = [];
  for (i = a.length -1; i >= 0; i --) {
    output.push(a[i]);
  };
  return output;
};

function reverseArrayInPlace(a) {
  let limit = Math.floor(a.length / 2);
  for (i = 0; i <= limit - 1; i ++) {
    let left = a[i];
    a[i] = a[a.length - 1 - i];
    a[a.length - 1- i] = left;
  };
  console.log("array reversed...\n");
};

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5, 6, 88];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]

// 4.3 A list ------------------------------------------------------------------
function arrayToList(a) {
  for (i = a.length -1, rest = null; i >= 0; i --) {
    rest = {
             value: a[i],
             rest: rest
           };
  };
  return rest;
};

function listToArray(l) {
  if (l.rest == null) {
    return l.value;
  } else {
    return [l.value].concat(listToArray(l.rest));
  };
};

function prepend(x, list) {
  return {
            value: x,
            rest:  list
         }
};

function nth(list, i) {
  if (i == 0) {
    return list.value;
  } else if (list.rest == null) {
    return undefined;
  } else {
    return nth(list.rest, i - 1);
  };
};

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20

// 4.4 Deep comparison ---------------------------------------------------------
// Your code here.
function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

function deepEqual(a, b) {
 if (typeof a == 'object' & typeof b == 'object' & a != null & b != null) {
   let a_keys = Object.keys(a);
   let b_keys = Object.keys(b);
   if (arraysEqual(a_keys, b_keys)) {
     for (i = 0; i < a_keys.length; i ++) {
       //console.log(a[a_keys[i]]);
       if (!deepEqual(a[a_keys[i]], b[b_keys[i]])) {
         return false;
       }
     };
     return true;
   } else {
     return false;
   };
 } else {
   return a === b;
 };
};


let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true




/*
================= 5. Higher Order Functions ====================================
  5.1 Flattening
  5.2 Your own loop
  5.3 Everything
  5.4 Dominant writing direction
*/
// 5.1 Flattening --------------------------------------------------------------
let arrays = [[1, 2, 3], [4, 5], [6]];
function flatten(arrays) {
  return arrays.reduce((a, b) => a.concat(b));
};

console.log(flatten(arrays));
// → [1, 2, 3, 4, 5, 6]


// 5.2 Your own loop -----------------------------------------------------------
function loop(x, test, update, body) {
  if (!test(x)) {return};
  body(x);
  loop(update(x), test, update, body);
};

loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1


// 5.3 Everything --------------------------------------------------------------

function every(array, test) {
  return array.reduce((a, b) => test(a) && test(b), true);
}

function every(array, test) {
  if (array.filter(l => test(l)).length == array.length){
    return true;
  } else {
    return false;
  };
}

function every(array, test) {
  tests = [];
  array.forEach(l => tests.push(test(l)));
  return tests.reduce((x, y) => x && y, true);
}

function every(array, test) {
  // De Morgan's laws allow us to use 'some' method.
  return !array.some((a, b) => !test(a) || !test(b));
};


console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true

// 5.4 Dominant writing direction ----------------------------------------------
function dominantDirection(text) {
  let codePoints = text.split('').map(x => characterScript(x.codePointAt(0)));
  codePoints = codePoints.filter(x => x != null);
  codePoints = codePoints.map(x => x.direction);
  counts = countBy(codePoints, n => n);

  if (counts.length == 1) {
    return counts[0].name;
  } else {
    return counts.reduce((x, y) => x.count >= y.count ? x.name : y.name);
  };
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
/*
================= 6. Secret Life of Objects ====================================
  6.1 A vector type
  6.2 Groups
  6.3 Iterable Groups
  6.4 Borrowing a method
*/
// 6.4 A vector type -----------------------------------------------------------
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  plus (new_vec) {
    this.x = this.x + new_vec.x;
    this.y = this.y + new_vec.y;
    return this;
  }
  minus (new_vec) {
    this.x = this.x - new_vec.x;
    this.y = this.y - new_vec.y;
    return this;
  }
  get length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5

// 6.2 Groups ------------------------------------------------------------------
class Group {
  constructor() {
    this.members = [];
  }
  add(x) {
    if (!this.has(x)){
      this.members.push(x);
    }
  }
  delete(x) {
    this.members = this.members.filter(z => z !== x);
  }
  has(x) {
    return this.members.includes(x);
  }
  static from(collection) {
    let group = new Group;
    for (let value of collection){
      group.add(value);
    }
    return group;
  }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false



// 6.3 Iterable groups ---------------------------------------------------------
class Group {
  constructor() {
    this.members = [];
  }
  add(x) {
    if (!this.has(x)){
      this.members.push(x);
    }
  }
  delete(x) {
    this.members = this.members.filter(z => z !== x);
  }
  has(x) {
    return this.members.includes(x);
  }
  static from(collection) {
    let group = new Group;
    for (let value of collection){
      group.add(value);
    }
    return group;
  }

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}

class GroupIterator {
  constructor(group) {
    this.group = group;
    this.i = 0;
  }
  next() {
    if (this.i >= this.group.members.length) {
      return {done: true};
    } else {
      let result = {value: this.group.members[this.i], done: false}
      this.i++;
      return  result;
    }
  }
}


for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c


// 6.4 Borrowing a method ------------------------------------------------------
let map = {one: true, two: true, hasOwnProperty: true};

console.log(Object.prototype.hasOwnProperty.call(map, "one"));
// → true



/*
================= 7. Project: A Robot ==========================================
  7.1 Compare Robots
  7.2 Robot Efficiency
  7.3 Persistent Group
*/
// 7.1 A Compare Robots --------------------------------------------------------
function cl(x) {return console.log(x)};

function testRobot(state, robot, memory) {
	for (let turn = 0;; turn++) {
      if (state.parcels.length == 0) {
        //console.log(`Done in ${turn} turns`);
        //break;
        return turn
      }
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
      //console.log(`Moved to ${action.direction}`);
    }
};


function compareRobots(robot1, memory1, robot2, memory2) {
  let score1 = [];
  let score2 = [];
  for (let i = 0; i <= 100; i++) {
    let start_state = new VillageState.random();
    score1.push(testRobot(start_state, robot1, memory1));
    score2.push(testRobot(start_state, robot2, memory2));
  };
  let score1_sum = score1.reduce((a, b) => a + b);
  let score2_sum = score2.reduce((a, b) => a + b);

  let score1_avg = score1_sum / score1.length;
  let score2_avg = score2_sum / score2.length;

  let scoreboard = `robot 1: ${score1_avg}\nrobot 2: ${score2_avg}`
  cl(scoreboard);
};


compareRobots(routeRobot, [], goalOrientedRobot, []);


// 7.2 Robot Efficiency --------------------------------------------------------
function cl(x) {return console.log(x)};

function yourRobot(state, route) {
  // if the robot has a path, keep following it
  if (route.length > 0) {
    return {direction: route[0], memory: route.slice(1)};
  };

  // Otherwise...
  // pickup run
  let paths = []
  let last_place = state.place
  for (parcel of state.parcels) {
    //cl(parcel);
    let route = findRoute(roadGraph, last_place, parcel.place)
    if (!paths.map(x => x.toString()).some(x => x == route.toString())) {
      // if path not already in array then add it
      // we could improve by removing single stops already in a path too
      paths.push(route);
      last_place = parcel.place
    }
  }
  let pickup_route = paths.reduce((a, b) => a.concat(b)) // flatten array
  //cl(pickup_route);
  //cl(state.parcels);

  // add drop offs that were not done on the pick up route
  paths = [] // clear
  for (parcel of state.parcels) {
    let last_place = pickup_route[pickup_route.length - 1];
    let add_idx = pickup_route.lastIndexOf(parcel.address);
    let plc_idx = pickup_route.indexOf(parcel.place);
    if (add_idx == -1 || add_idx < plc_idx) {
      // if address not in paths or address was before pickup...
      let route = findRoute(roadGraph, last_place, parcel.address)
      paths.push(route);
      last_place = parcel.address
    };
  };

  if (paths.length > 0) {
    var dropoff_route = paths.reduce((a, b) => a.concat(b));
  };
  let final_route = pickup_route.concat(dropoff_route);
  //cl(final_route);
  return {direction: final_route[0], memory: final_route.slice(1)}
};

yourRobot(VillageState.random(), memory = [])

//runRobotAnimation(VillageState.random(), yourRobot, memory);


// second yourRobot is stolen from the answers
function cl(x) {return console.log(x)};

function yourRobot({place, parcels}, route) {
  if (route.length == 0) {
    let routes = parcels.map(parcel => {
      if (place != parcel.place) {
        return {route: findRoute(roadGraph, place, parcel.place),
                pickup: true}
      } else {
        return {route: findRoute(roadGraph, place, parcel.address),
                pickup: false}
      };
    });

    function score(route) {
      return route.pickup? 0.5 : 0 - routes.length
    };
    route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
  };
  return {direction: route[0], memory: route.slice(1)}
};

yourRobot(VillageState.random(), memory = []);


// 7.3 Persistent Group --------------------------------------------------------

class PGroup {
  constructor(members) {
    this.members = members;
  }

  add(x) {
    if (this.has(x)) return this;
    return new PGroup(this.members.concat([x]));
  }

  delete(x) {
    if (!this.has(x)) return this;
    return new PGroup(this.members.filter(a => a != x));
  }

  has(x) {
    return this.members.includes(x);
  }
}

PGroup.empty = new PGroup([])


let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false

/*
================= 8. Bugs & Errors =============================================
  8.1 Retry
  8.2 The locked box
*/
// 8.1 Retry -------------------------------------------------------------------
"use strict"
class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
  let result = undefined;
  for (;;) {
    try {
      result = primitiveMultiply(a, b);
      break;
    } catch(e) {
      if (e instanceof MultiplicatorUnitFailure) {
        console.log(e);
      }
    }
  }
  return result;
}


console.log(reliableMultiply(8, 8));
// → 64

// or recusion
function reliableMultiply(a, b) {
  try {
    return primitiveMultiply(a, b);
  } catch(e) {
    console.log(e);
    return reliableMultiply(a, b)
  }
}




// 8.2 The locked box ----------------------------------------------------------
const box = {
  locked: true,
  unlock() { this.locked = false; },
  lock() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

function withBoxUnlocked(body) {
  let start_state = box.locked;
  try {
    box.unlock()
    body()
  } finally {
    if (start_state) {
      box.lock()
    } else {
      box.unlock()
    }
  }
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised:", e);
}
console.log(box.locked);
// → true

/*
================= 9. Regular Expressions =======================================
  9.1 Regexp Golf
  9.2 Quoting Style
  9.3 Numbers Again
*/
// 9.1 Regexp Golf -------------------------------------------------------------
// Fill in the regular expressions

verify(/ca(t|r)/,
       ["my car", "bad cats"],
       ["camper", "high art"]);

verify(/pr?op/,
       ["pop culture", "mad props"],
       ["plop", "prrrop"]);

verify(/ferr(et|y|ari)/,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

verify(/\b.*ious\b/,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

verify(/ ^\W|\./,
       ["bad punctuation ."],
       ["escape the period"]);

verify(/\w{7,}/,
       ["hottentottententen"],
       ["no", "hotten totten tenten"]);

verify(/\b[^eE\s]+\b/,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape", "BEET"]);


function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  for (let str of yes) if (!regexp.test(str)) {
    console.log(`Failure to match '${str}'`);
  }
  for (let str of no) if (regexp.test(str)) {
    console.log(`Unexpected match for '${str}'`);
  }
}
// 9.2 Quoting Style -----------------------------------------------------------
let text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.
console.log(text.replace(/(^|\W)'|(\W|$)'/g, '$1"'));
// → "I'm the cook," he said, "it's my job."

// 9.3 Numbers Again------------------------------------------------------------
// Fill in this regular expression.
let number = /^[\+-]?\d*(\d\.|\.\d)?\d*(\d+[eE][\+-]?\d+)?$/;

// Tests:
for (let str of ["1", "-1", "+15", "1.55", ".5", "5.",
                 "1.3e2", "1E-4", "1e+12"]) {
  if (!number.test(str)) {
    console.log(`Failed to match '${str}'`);
  }
}
for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5",
                 ".5.", "1f5", "."]) {
  if (number.test(str)) {
    console.log(`Incorrectly accepted '${str}'`);
  }
}



/*
================= 10. Modules ==================================================
  10.1 A Modular Robot
  10.2 Roads Module
  10.3 Circular Dependencies
*/
// 10.1 Modular Robot ----------------------------------------------------------

// 10.2 Roads Module -----------------------------------------------------------
const {buildGraph} = require("./graph");

const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

nodes_array = roads.map(x => x.split('-'));
exports.roadGraph = buildGraph(nodes_array)
// 10.3 Circular Dependencies --------------------------------------------------




/*
================= 11. Asynchronous Programming  ================================
  11.1 Tracking the Scalpel
  11.2 Building promise.all
*/
// 11.1 Tracking the Scalpel ---------------------------------------------------
async function locateScalpel(nest) {
  curr_nest = nest.name;
  for (;;) {
    next_nest = await anyStorage(nest, curr_nest, 'scalpel');
    if (curr_nest == next_nest) return curr_nest
    curr_nest = next_nest
  }
}

function locateScalpel2(nest) {
  function loop(current) {
    return anyStorage(nest, current, 'scalpel').then(next => {
      if (next == current) return current
      else return loop(next)
    })
  }
  return loop(nest.name)
}


locateScalpel(bigOak).then(console.log);
// → Butcher Shop

locateScalpel2(bigOak).then(console.log);
// → Butcher Shop

// 11.2 Building promise.all ---------------------------------------------------
function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    let counter = promises.length
    let output = []
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(x => {
        console.log('why?', i) // you must define i with let
        output[i] = x;
        counter --;
        if (counter == 0) resolve(output);
      }).catch(reject)
    }
    if (promises.length == 0) {resolve(output)}

  });
}


// Test code.
Promise_all([]).then(array => {
  console.log("This should be []:", array);
});
function soon(val) {
  return new Promise(resolve => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}
Promise_all([soon(1), soon(2), soon(3)]).then(array => {
  console.log("This should be [1, 2, 3]:", array);
});
Promise_all([soon(1), Promise.reject("X"), soon(3)])
  .then(array => {
    console.log("We should not get here");
  })
  .catch(error => {
    if (error != "X") {
      console.log("Unexpected failure:", error);
    }
  });
/*
================= 12. Project: A Programming Language  =========================
  12.1 Arrays
  12.2 Closure
  12.3 Comments
  12.4 Fixing Scope
*/
// 12.1 Arrays------------------------------------------------------------------
// Modify these definitions...

topScope.array = function(...values) {return values};

topScope.length = function(array) {return array.length};

topScope.element = function(array, n) {return array[n]};

run(`
do(define(sum, fun(array,
     do(define(i, 0),
        define(sum, 0),
        while(<(i, length(array)),
          do(define(sum, +(sum, element(array, i))),
             define(i, +(i, 1)))),
        sum))),
   print(sum(array(1, 2, 3))))
`);
// → 6

// 12.2 Closure ----------------------------------------------------------------
/*
When you use run, your scope is topScope by default. This scope is passed into
fun where a local scope is created with the topScope bindings included. The
local scope was created with the scope passed in as a "parent scope". Then the
local scope is passed into evalute. evaluate then triggers fun again which has
the local scope passed into it, a new scope is again created but this time
with the first local scopes bindings included (which also include the topScope
bindings), therefore the "deep" function has access to all bindings defined.
*/

// 12.3 Comments ---------------------------------------------------------------
function skipSpace(string) {
  let skippable = string.match(/^(\s|#.*)*/)
  return string.slice(skippable[0].length);
}

console.log(parse("# hello\nx"));
// → {type: "word", name: "x"}

console.log(parse("a # one\n   # two\n()"));
// → {type: "apply",
//    operator: {type: "word", name: "a"},
//    args: []}

// 12.4 Fixing Scope -----------------------------------------------------------
specialForms.set = (args, scope) => {
  if (args.length != 2 || args[0].type != "word") {
    throw new SyntaxError("Incorrect use of define");
  }
  // The prototype of the local scope is the enclosing scope
  // that the function was created in.

  if (Object.prototype.hasOwnProperty.call(scope, args[0].name)) {
    let value = evaluate(args[1], scope);
    scope[args[0].name] = value
    return value
  }

  if (Object.getPrototypeOf(scope) == null) {
    throw new ReferenceError(`Binding ${args[0].name} not found in enclosing environment`);
  } else if (Object.prototype.hasOwnProperty.call(
        Object.getPrototypeOf(scope), args[0].name)) {
    let value = evaluate(args[1], scope);
    Object.getPrototypeOf(scope)[args[0].name] = value
    return value
  } else {
    specialForms.set(args, scope = Object.getPrototypeOf(scope))
  }
};


run(`
do(define(x, 4),
   define(setx, fun(val, set(x, val))),
   setx(50),
   print(x))
`);
// → 50
run(`set(quux, true)`);
// → Some kind of ReferenceError


// Alternative solution (not as robust)
specialForms.set = (args, scope) => {
  if (args.length != 2 || args[0].type != "word") {
    throw new SyntaxError("Incorrect use of define");
  }
  /* This part is good for understanding what's going on
  console.log('scope---', scope)
  console.log('name---', args[0].name)
  console.log('getPro---', Object.getPrototypeOf(scope))
  console.log('hasOwn---', Object.prototype.hasOwnProperty.call(Object.getPrototypeOf(scope), args[0].name));
  */
  // The prototype of the local scope is the enclosing scope
  // that the function was created in.

  // if the binding exists in the enclosing scope
  // then bind it to the new value
  if (Object.prototype.hasOwnProperty.call(
        Object.getPrototypeOf(scope), args[0].name)) {
    let value = evaluate(args[1], scope);
    Object.getPrototypeOf(scope)[args[0].name] = value
    return value;
  } else {
    throw ReferenceError('Binding not found in enclosing environment');
  }
};


run(`
do(define(x, 4),
   define(setx, fun(val, set(x, val))),
   setx(50),
   print(x))
`);
// → 50
run(`set(quux, true)`);
// → Some kind of ReferenceError



/*
================= 14. Document Object Model  ===================================
  14.2 Elements by tag name
  14.3 The cat’s hat
*/
// 14.2 Elements by tag name ---------------------------------------------------
<h1>Heading with a <span>span</span> element.</h1>
<p>A paragraph with <span>one</span>, <span>two</span>
  spans.</p>

<script>
  function byTagName(node, tagName) {
    // quick win is below...
    // return node.querySelectorAll(tagName)

    // slow win...
    function extractChildren(node) {
      if (node.children.length > 0) {
        let children = [...node.children];
        return [[node], [].concat(children.map(child => extractChildren(child)))]
      }
      return node
    }

    // flatten array function
    const flatten = list => list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [])

    let full_children = flatten(extractChildren(node))
    return full_children.filter(x => x.nodeName.toLowerCase() == tagName)
  }

  //console.log(document.getElementsByTagName('span'))
  console.log(byTagName(document.body, "h1").length);
  // → 1
  console.log(byTagName(document.body, "span").length);
  // → 3
  let para = document.querySelector("p");
  console.log(byTagName(para, "span").length);
  // → 2
</script>

// 14.3 The cat’s hat ----------------------------------------------------------

/*
================= 15. Handling Events  =========================================
  15.1 Balloon
  15.2 Mouse Trail
  15.3 Tabs
*/
// 15.1 Balloon ----------------------------------------------------------------
<p id='balloon'>🎈</p>

<script>
  function balloonControl() {
    event.preventDefault()
    if (last_size > 50) {
      balloon.textContent = "💥"
      window.removeEventListener("keydown", balloonControl);
    }
    if (event.key == "ArrowUp") {
      last_size = last_size * 1.1;
      balloon.style.fontSize = last_size + 'px';
    } else if (event.key == "ArrowDown") {
      last_size = last_size / 1.1;
      balloon.style.fontSize = last_size + 'px';
    }
  }

  let balloon = document.getElementById('balloon')
  let last_size = 20;
  window.addEventListener("keydown", balloonControl);

</script>


// 15.2 Mouse Trail ------------------------------------------------------------
<style>
  .trail { /* className for the trail elements */
    position: absolute;
    height: 6px; width: 6px;
    border-radius: 3px;
    background: teal;
  }
  body {
    height: 300px;
  }
</style>

<script>
  let dot_max = 20;
  for (let i=1; i <= dot_max; i++){
    let trail = document.createElement("div");
    trail.className = "trail";
    trail.style.left = (-10) + "px";
    trail.style.top = (-10) + "px";
    document.body.appendChild(trail);
  }

  let dots = document.getElementsByClassName("trail");
  let dot_id = 0;

  window.addEventListener("mousemove", event => {
    let dot = [...dots][dot_id]
    dot.style.left = event.pageX + "px";
    dot.style.top = event.pageY + "px";
    if (dot_id < (dot_max - 1)) {
      dot_id++
    } else {
      dot_id = 0
    }
  });



</script>

// 15.3 Tabs ----------------------------------------------------------------
<tab-panel>
  <div data-tabname="one">Tab one</div>
  <div data-tabname="two">Tab two</div>
  <div data-tabname="three">Tab three</div>
</tab-panel>
<script>
  function asTabs(node) {
    // Build buttons
    let nodes = [...node.children]
    for (n of nodes) {
      let btn = document.createElement("BUTTON")
      btn.innerText = n.getAttribute("data-tabname")
      btn.addEventListener("click", () => {changeTab(btn.innerText);});
      //console.log(document.body.children)
      document.body.insertBefore(btn, node)
    }

    // Hide all tabs except for the first one
    let divs = [...document.body.querySelectorAll("div")]
    for (i=0; i < divs.length; i ++) {
      if (i != 0) {
        divs[i].style.display = 'none'
      }
    }

    function changeTab(tabName) {
      //console.log(tabName);
      let divs = [...document.body.querySelectorAll("div")]
      for (i=0; i < divs.length; i ++) {
        if (divs[i].getAttribute("data-tabname") == tabName) {
          divs[i].style.display = 'block'
        } else {
          divs[i].style.display = 'none'
        }
      }
    }
  }
  asTabs(document.querySelector("tab-panel"));
</script>

/*
================= 16. Project: A Platform Game  ================================
  16.1 Game over
  16.2 Pausing the game
  16.3 A monster
*/
// 16.1 Game Over --------------------------------------------------------------
<link rel="stylesheet" href="css/game.css">

<body>
<script>
  // The old runGame function. Modify it...
  async function runGame(plans, Display) {
    let lives = 3;
    for (let level = 0; level < plans.length && lives > 0;) {
      let status = await runLevel(new Level(plans[level]),
                                  Display);
      if (status == "lost") lives--;
      if (status == "won")  level++;
    }
    if (lives > 0) {
      console.log("You've won!");
    } else {
      console.log("Game Over.");
    }
  }
  runGame(GAME_LEVELS, DOMDisplay);
</script>
</body>

// 16.2 Pausing the game -------------------------------------------------------
<link rel="stylesheet" href="css/game.css">

<body>
<script>
  // The old runLevel function. Modify this...
  function runLevel(level, Display) {
    let display = new Display(document.body, level);
    let state = State.start(level);
    let ending = 1;
    let paused = false;
    window.addEventListener("keydown", event => {
      if (event.keyCode == 27) {
        paused = !paused
        paused ? console.log('paused') : console.log('unpaused')
      }
    });
    return new Promise(resolve => {
      runAnimation(time => {
        if (paused) return paused;
        state = state.update(time, arrowKeys);
        display.syncState(state);
        if (state.status == "playing") {
          return true;
        } else if (ending > 0) {
          ending -= time;
          return true;
        } else {
          display.clear();
          resolve(state.status);
          return false;
        }
      });
    });
  }
  runGame(GAME_LEVELS, DOMDisplay);
</script>
</body>


// Key handling leak soln.
<link rel="stylesheet" href="css/game.css">

<body>
<script>
  function trackKeys(keys) {
    let down = Object.create(null);
    function track(event) {
      if (keys.includes(event.key)) {
        down[event.key] = event.type == "keydown";
        event.preventDefault();
      }
    }
    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);
    down.unregister = () => {
      window.removeEventListener("keydown", track);
      window.removeEventListener("keyup", track);
    }
    return down;
    };


  function runLevel(level, Display) {
    let display = new Display(document.body, level);
    let state = State.start(level);
    let ending = 1;
    let paused = false;
    let arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);
    window.addEventListener("keydown", event => {
      if (event.keyCode == 27) {
        paused = !paused
        paused ? console.log('paused') : console.log('unpaused')
      }
    });
    return new Promise(resolve => {
      runAnimation(time => {
        if (paused) return paused;
        state = state.update(time, arrowKeys);
        display.syncState(state);
        if (state.status == "playing") {
          return true;
        } else if (ending > 0) {
          ending -= time;
          return true;
        } else {
          display.clear();
          resolve(state.status);
          arrowKeys.unregister()
          return false;
        }
      });
    });
  }
  runGame(GAME_LEVELS, DOMDisplay);
</script>
</body>

// 16.3 A monster --------------------------------------------------------------
<link rel="stylesheet" href="css/game.css">
<style>.monster { background: purple }</style>

<body>
  <script>
    // Complete the constructor, update, and collide methods
    class Monster {
      constructor(pos, speed) {
        this.pos   = pos;
        this.speed = speed;
      }

      get type() { return "monster"; }

      static create(pos) {
        return new Monster(pos.plus(new Vec(0, -1)), new Vec(4, 0));
      }

      update(time, state) {
        let newPos = this.pos.plus(this.speed.times(time));
        if (!state.level.touches(newPos, this.size, "wall")) {
          return new Monster(newPos, this.speed);
        } else {
          return new Monster(this.pos, this.speed.times(-1));
        }
      };

      collide(state) {
        //console.log(state.player.pos)
        let player_bottom = (state.player.pos.y + 0.4)
        let monster_top = (this.pos.y - 1)
        if (player_bottom <= monster_top) {
          let filtered = state.actors.filter(a => a != this);
          return new State(state.level, filtered, "playing");
        } else {
          return new State(state.level, state.actors, "lost");
        }
      }
    }

    Monster.prototype.size = new Vec(1.2, 2);

    levelChars["M"] = Monster;

    runLevel(new Level(`
..................................
.################################.
.#..............................#.
.#..............................#.
.#..............................#.
.#...........................o..#.
.#..@...........................#.
.##########..............########.
..........#..o..o..o..o..#........
..........#...........M..#........
..........################........
..................................
`), DOMDisplay);
  </script>
</body>

/*
================= 17. Drawing on canvas ========================================
  17.1 Shapes
  17.2 The pie chart
  17.3 A bouncing ball
*/
// 17.1 Shapes -----------------------------------------------------------------
<canvas width="600" height="200"></canvas>
<script>
  let cx = document.querySelector("canvas").getContext("2d");
  // Trapezoid
  function drawTrapezoid(cx) {
    cx.beginPath();
    cx.moveTo(50, 10);
    cx.lineTo(80, 10);
    cx.lineTo(100, 50);
    cx.lineTo(30, 50);
    cx.closePath();
    cx.stroke();
  };
  drawTrapezoid(cx)

  // Dimond
  cx.beginPath();
  cx.moveTo(150, 10);
  cx.lineTo(170, 30);
  cx.lineTo(150, 50);
  cx.lineTo(130, 30);
  cx.fillStyle = 'red';
  cx.fill();

  // Zig-Zig
  cx.beginPath();
  for (let y = 0; y < 100; y += 10) {
    cx.lineTo(280 - ((y % 20)) * 8, y + 10);
  }
  cx.stroke();

  //Spiral
  function drawSpiral(cx) {
    cx.beginPath();
    let resolution = 0.1;
    let increase = 0.3
    let angle = Math.PI - 0.5;
    let xstart = 350;
    let ystart = 50;
    cx.moveTo(xstart, ystart);
    for (let y = resolution; y < 500*resolution; y += resolution) {
      let xpos = Math.cos(angle * increase * y) * y + xstart;
      let ypos = Math.sin(angle * increase * y) * y + ystart;
      cx.lineTo(xpos, ypos);
    }
    cx.stroke();
  };
  drawSpiral(cx)

  //Star
  function drawStar(cx, points = 8, size = 40) {
    let xstart = 470;
    let ystart = 50;
    let angle  = Math.PI / 2;
    let rad    = size;
    cx.beginPath();
    cx.fillStyle = 'orange';
    cx.moveTo(xstart, ystart);
    for (let p = 1; p <= points + 1; p += 1) {
      angle += (2*Math.PI)/points
      let xpos = Math.cos(angle)*rad + xstart;
      let ypos = Math.sin(angle)*rad + ystart;
      if (p == 1) {
        cx.moveTo(xpos, ypos)
      } else {
        cx.quadraticCurveTo(xstart, ystart, xpos, ypos);
      }
    }
    cx.fill();
  };
  drawStar(cx, points = 8, size = 45);
</script>

// 17.2 The pie chart  ---------------------------------------------------------
<canvas width="600" height="300"></canvas>
<script>
  let cx = document.querySelector("canvas").getContext("2d");
  let total = results
    .reduce((sum, {count}) => sum + count, 0);
  let currentAngle = -0.5 * Math.PI;
  let startAngle = currentAngle;
  let centerX = 300, centerY = 150;

  function writeText(cx, text, centerX, centerY,
                      startAngle, sliceAngle,
                      rad = 20, size = 20) {
    cx.font = `${size}px Arial`;
    cx.fillStyle = "black";
    let textAngle = startAngle + sliceAngle / 2;
    if (Math.cos(textAngle) < 0) {
    	cx.textAlign = 'end';
    } else {
        cx.textAlign = 'left';
    }
    cx.textBaseline = 'middle';
    let xpos = Math.cos(textAngle) * rad + centerX;
    let ypos = Math.sin(textAngle) * rad + centerY;
    cx.fillText(`${text}`, xpos, ypos);
  };

  // Add code to draw the slice labels in this loop.
  for (let result of results) {
    let sliceAngle = (result.count / total) * 2 * Math.PI;
    cx.beginPath();
    cx.arc(centerX, centerY, 100,
           currentAngle, currentAngle + sliceAngle);
    startAngle = currentAngle;
    currentAngle += sliceAngle;
    cx.lineTo(centerX, centerY);
    cx.fillStyle = result.color;
    cx.fill();
    writeText(cx, result.name, centerX, centerY,
              startAngle, sliceAngle,
              rad = 105, size = 13)
  }
</script>

// 17.3 A bouncing ball --------------------------------------------------------

<canvas width="400" height="400"></canvas>
<script>
  let cx = document.querySelector("canvas").getContext("2d");

  let lastTime = null;
  function frame(time) {
    if (lastTime != null) {
      updateAnimation(Math.min(100, time - lastTime) / 1000);
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  let pos        = new Vec(20,30);
  let speed      = new Vec(80,250);
  let boxSize    = new Vec(300, 300);
  let radius     = 10;
  let energyXfer = new Vec(1.09, 1.08)

  function updateAnimation(step) {
    // Your code here.
    cx.clearRect(0, 0, boxSize.x + radius + 20, boxSize.y + radius + 20);
    cx.strokeStyle = 'orange'
    cx.strokeRect(radius, radius, boxSize.x, boxSize.y)

    if (pos.x >= boxSize.x - radius || pos.x <= radius) {
      speed.x *= -1 * energyXfer.x
    }
    if (pos.y >= boxSize.y - radius || pos.y <= radius) {
      speed.y *= -1 * energyXfer.y
    }

    pos.x += step * speed.x;
    pos.y += step * speed.y

    cx.beginPath();
    cx.arc(pos.x + radius, pos.y + radius, radius, 0, 7);
    cx.fill();
  }
</script>

/*
================= 18. HTTP and Forms ===========================================
  18.1 Content negotiation
  18.2 A JavaScript workbench
  18.3 Conway’s Game of Life
*/
// 18.1 Content negotiation ----------------------------------------------------
const url = "https://eloquentjavascript.net/author";
const types = ["text/plain",
               "text/html",
               "application/json",
               "application/rainbows+unicorns"];

async function showTypes() {
  for (type of types) {
    let resp = await fetch(url, {headers: {accept: types}})
    console.log(`${await resp.status}\n`);
    console.log(`${type}: ${await resp.text()}\n`);
  }
}

showTypes()


// 18.2 A JavaScript workbench -------------------------------------------------
<textarea id="code">return "hi";</textarea>
<button id="button">Run</button>
<pre id="output"></pre>

<script>
  // Your code here.
  let code   = document.querySelector("#code");
  let output = document.querySelector("#output");
  let button = document.querySelector("#button");
  button.addEventListener("click", () => {
    try {
      let result = Function(code.value)();
      let out = String(result);
      output.textContent = out;
    } catch(e) {
      output.textContent = e;
    }
  });
</script>

// 18.3 Conway’s Game of Life --------------------------------------------------

<div id="grid"></div>
<button id="next">Next generation</button>

<script>
  // Your code here.
  let size = 20;

  function initRow(size) {
    return new Array(size).fill(0).map(function(n) {
      return Math.random() > 0.5})
  }

  function initCellSet(size) {
    return new Array(size).fill(0).map(function(n) {
      return initRow(size)})
  }

  let cellSet = initCellSet(size)

  function addCheckbox(status) {
    let checkbox = document.createElement('input');
	checkbox.type = "checkbox";
    checkbox.checked = status;
    return(checkbox)
  };

  function addRow(uni_row, container) {
    let row = document.createElement('div')
    container.appendChild(row)
    for (cell of uni_row){
      row.appendChild(addCheckbox(status = cell))
    }
  }

  function buildUniverse(cellSet) {
    let container = document.createElement('div')
    container.setAttribute("id", "container");
    document.body.appendChild(container);
  	for (j = 1; j < cellSet.length; j++){
      addRow(cellSet[j], container)
    }
  }

  function getNeighboursIdx([row_idx, col_idx], cellSet) {
    let idx_list = []
    for (v = row_idx - 1; v <= row_idx + 1; v++) {
      for (u = col_idx - 1; u <= col_idx + 1; u++) {
        if (v >= 0 && v <= cellSet.length - 1&&
            u >= 0 && u <= cellSet.length - 1 &&
            ([v, u] !== [row_idx, col_idx])) {
          idx_list.push([v, u])
        }
      }
    }
    return(idx_list)
  }

  function nextGenerationCell(row_idx, col_idx, cellSet) {
    let nbrs = {
      self_idx: [row_idx, col_idx],
      self_status: cellSet[row_idx][col_idx],
      nbr_idx : getNeighboursIdx([row_idx, col_idx], cellSet),
      nbr_status : [],
      nbr_status_cnt: null
    }
    for (idx of nbrs.nbr_idx) {
      nbrs.nbr_status.push(cellSet[idx[0]][idx[1]]);
    }
    // count live neighbours
    nbrs.nbr_status_cnt = nbrs.nbr_status.filter(Boolean).length

    if ( nbrs.self_status &&
        (nbrs.nbr_status_cnt == 2 || nbrs.nbr_status_cnt == 3)) {
      nbrs.self_status = true;
    } else if (!nbrs.self_status && nbrs.nbr_status_cnt == 3) {
      nbrs.self_status = true;
    } else {
      nbrs.self_status = false;
    }
    return(nbrs.self_status)
  }

  function nextGeneration(cellSet) {
    let output = new Array(cellSet.length);
    for (r = 0; r < cellSet.length; r++) {
      let output_row = new Array(cellSet.length);
      for (c = 0; c < cellSet.length; c++) {
        output_row[c] = nextGenerationCell(r, c, cellSet)
      }
      output[r] = output_row;
    }
    return(output)
  }

  buildUniverse(cellSet)

  let button = document.querySelector("#next");
  button.addEventListener("click", () => {
    cellSet = nextGeneration(cellSet);
    let chx = document.body.querySelector("#container");
    if (chx != null) {chx.remove()}
    buildUniverse(cellSet)
  });

</script>


/*
================= 19. Project: A Pixel Art Editor ===============================
  19.1 Keyboard bindings
  19.2 Efficient drawing
  19.3 Circles
  19.4 Proper lines
*/
// 19.1 Keyboard bindings ------------------------------------------------------
<div></div>
<script>
  // The original PixelEditor class. Extend the constructor.
  class PixelEditor {
    constructor(state, config) {
      let {tools, controls, dispatch} = config;
      this.state = state;

      this.canvas = new PictureCanvas(state.picture, pos => {
        let tool = tools[this.state.tool];
        let onMove = tool(pos, this.state, dispatch);
        if (onMove) {
          return pos => onMove(pos, this.state, dispatch);
        }
      });
      this.controls = controls.map(
        Control => new Control(state, config));
      this.dom = elt("div", {tabIndex : 0},
                     this.canvas.dom, elt("br"),
                     ...this.controls.reduce(
                       (a, c) => a.concat(" ", c.dom), []));

      let cmd_down = false;
      this.dom.addEventListener("keydown", event => {
        let tool_idx = Object.keys(tools).map(x => x[0]).indexOf(event.key)
        if (tool_idx != -1) {
          event.preventDefault();
          this.state.tool = Object.keys(tools)[tool_idx]
          dispatch({tool: this.state.tool});
        };
        if(event.metaKey) {
          event.preventDefault();
          cmd_down = true;
        }
        if (cmd_down && event.key == 'z') {
          event.preventDefault();
          dispatch({undo: true})
        }
      })

      this.dom.addEventListener("keyup", event => {
        if(event.key == 'Meta') {
          event.preventDefault();
          cmd_down = false;
        }
      })
    }
    syncState(state) {
      this.state = state;
      this.canvas.syncState(state.picture);
      for (let ctrl of this.controls) ctrl.syncState(state);
    }
  }

  document.querySelector("div")
    .appendChild(startPixelEditor({}));
</script>

// 19.2 Efficient drawing ------------------------------------------------------
<div></div>
<script>
  // Change this method
  PictureCanvas.prototype.syncState = function(picture) {
    if (this.picture == picture) return;
    let prev = this.picture;
    this.picture = picture;
    drawPicture(this.picture, this.dom, scale, prev);
  };

  // You may want to use or change this as well
  function drawPicture(picture, canvas, scale, prev = null) {
    if (prev == undefined ||
        picture.width  != prev.width  ||
        picture.height != prev.height) {
       canvas.width  = picture.width  * scale;
       canvas.height = picture.height * scale;
       prev = null;
    }

    let cx = canvas.getContext("2d");
    for (let y = 0; y < picture.height; y++) {
      for (let x = 0; x < picture.width; x++) {
        if (prev == null ||
            prev.pixel(x, y) != picture.pixel(x, y)) {
          //if (prev != null) {console.log(prev.pixel(x, y), picture.pixel(x, y))}
          cx.fillStyle = picture.pixel(x, y);
          cx.fillRect(x * scale, y * scale, scale, scale);
        }
      }
    }
  }

  document.querySelector("div")
    .appendChild(startPixelEditor({}));
</script>

// 19.3 Circles ----------------------------------------------------------------

<div></div>
<script>
  function circle(pos, state, dispatch) {
    // Your code here
    function drawCircle(to) {
      let radius = Math.sqrt(Math.pow(to.x - pos.x, 2) +
                             Math.pow(to.y - pos.y, 2));
      let radiusC = Math.ceil(radius);
      let drawn = [];
      for (dy = -radiusC; dy <= radiusC; dy++) {
        for (dx = -radiusC; dx <= radiusC; dx++) {
          let dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
          if (dist > radius) {continue}
          let x = pos.x + dx;
          let y = pos.y + dy;
          if (y < 0 || y > state.picture.height ||
              x < 0 || x > state.picture.width)
          {continue};
          drawn.push({x, y, color: state.color})
        }
      }
      dispatch({picture: state.picture.draw(drawn)});
    }
    drawCircle(pos);
    return drawCircle
  }

  const startState = {
    tool: "circle",
    color: "#000000",
    picture: Picture.empty(60, 30, "#f0f0f0"),
    done: [],
    doneAt: 0
  };
  let dom = startPixelEditor({
    state: startState,
    tools: Object.assign({}, baseTools, {circle})
  });
  document.querySelector("div").appendChild(dom);
</script>

// 19.4 Proper Lines ------------------------------------------------------
<div></div>
<script>
  // The old draw tool. Rewrite this.
  function draw(pos, state, dispatch) {
    function drawPixel({x, y}, state) {
      let drawn = {x, y, color: state.color};
      dispatch({picture: state.picture.draw([drawn])});
    }
    drawPixel(pos, state);
    return drawPixel;
  }

  function line(pos, state, dispatch) {
    // Your code here
    function drawLine(to) {
      let xStart = pos.x;
      let xEnd   = to.x;
      let xdiff  = xStart - xEnd;
      let xdir   = xdiff < 0 ? 1 : -1;
      let yStart = pos.y;
      let yEnd   = to.y;
      let ydiff  = yStart - yEnd
      let ydir   = ydiff < 0 ? 1 : -1
      //let dist   = Math.sqrt(Math.pow(xdiff, 2) + Math.pow(ydiff, 2))
      let theta  = xdiff == 0 ? Math.PI/2:Math.abs(Math.atan(ydiff/xdiff))
      //console.log(theta)
      let drawn  = [];
      let last_pos = {x:null, y:null};

      for (let dy = 0; dy <= Math.abs(ydiff); dy++) {
        for (let dx = 0; dx <= Math.abs(xdiff); dx++) {
          let y = yStart + dy * ydir;
          let x = xStart + dx * xdir;
          console.log(theta);
          let exp_dx = theta == 0 ? dx:Math.abs(dy / Math.tan(theta));
          let exp_dy = theta == Math.PI/2 ? dy:Math.abs(dx * Math.tan(theta));

          let doubx = (theta > (3/4)*Math.PI && theta <= (5/4)*Math.PI) ||
                      (theta > (7/4)*Math.PI && theta <= 2*Math.PI) ||
                      (theta > 0 && theta <= (1/4)*Math.PI)
                      ? x == last_pos.x : false;
          let douby = (theta > (1/4)*Math.PI && theta <= (3/4)*Math.PI) ||
                      (theta > (5/4)*Math.PI && theta <= (7/4)*Math.PI)
                      ? y == last_pos.y : false;

          if (dy < Math.floor(exp_dy) ||
              dx < Math.floor(exp_dx) ||
              doubx ||
              douby
             )
          {
            //console.log(x, last_pos.x, doubx, theta, douby)
            continue}
          last_pos = {x:x,y:y}
          //console.log(last_pos)
          drawn.push({x:x, y:y, color: state.color})
          //console.log(dx, condx, dy, condy)
          //console.log(drawn)
        }
      }
      //console.log(drawn);
      dispatch({picture: state.picture.draw(drawn)});
      //console.log(state)
    }
    drawLine(pos); // state must be from upper env to allow refresh
    // therefore we don't put the state as an argument
    return drawLine;
  }

  let dom = startPixelEditor({
    tools: {draw, line, fill, rectangle, pick}
  });
  document.querySelector("div").appendChild(dom);
</script>



// Solution by author
<!doctype html>
<script src="code/chapter/19_paint.js"></script>

<div></div>
<script>
  function drawLine(from, to, color) {
    let points = [];
    if (Math.abs(from.x - to.x) > Math.abs(from.y - to.y)) {
      if (from.x > to.x) [from, to] = [to, from];
      let slope = (to.y - from.y) / (to.x - from.x);
      for (let {x, y} = from; x <= to.x; x++) {
        points.push({x, y: Math.round(y), color});
        y += slope;
      }
    } else {
      if (from.y > to.y) [from, to] = [to, from];
      let slope = (to.x - from.x) / (to.y - from.y);
      for (let {x, y} = from; y <= to.y; y++) {
        points.push({x: Math.round(x), y, color});
        x += slope;
      }
    }
    return points;
  }

  function draw(pos, state, dispatch) {
    function connect(newPos, state) {
      let line = drawLine(pos, newPos, state.color);
      pos = newPos;
      dispatch({picture: state.picture.draw(line)});
    }
    connect(pos, state);
    return connect;
  }

  function line(pos, state, dispatch) {
    return end => {
      let line = drawLine(pos, end, state.color);
      dispatch({picture: state.picture.draw(line)});
    };
  }

  let dom = startPixelEditor({
    tools: {draw, line, fill, rectangle, pick}
  });
  document.querySelector("div").appendChild(dom);
</script>
