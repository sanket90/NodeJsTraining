// Data Types

var x = 1;
x = 'abc';

var str1 = "Hello";
var str2 = '3';
var num1 = 6;

console.log(str1 + str2); //Hello3
console.log(str1 + num1); //Hello6
console.log(str2 + num1); //36
console.log(str2 * num1); //18
console.log(str1 * num1); // NaN


// String
var strDoubleQuote = "Hello";
var strSingleQuote = '3';
var strBackQuote = `${str1} World ${3+4} ${6*7}`;

// Number
var numInteger = 1;
var numFloat = 1.212312;
var numBig = 12312312312312312123n;

// Boolean
var boolTrue = true;
var boolFalse = false;



console.log("0 is ", 0 ? "Yes": "No", typeof 0); // 
console.log("1 is ", 1 ? "Yes": "No", typeof 1); // 
console.log("-1 is ", -1 ? "Yes": "No", typeof -1); // 
console.log("'' is ", '' ? "Yes": "No", typeof ''); // 
console.log("'abc' is ", 'abc' ? "Yes": "No", typeof 'abc'); // 
console.log("'1' is ", '1' ? "Yes": "No", typeof '1'); // 
console.log("{} is ", {} ? "Yes": "No", typeof {}); // 
console.log("[] is ", [] ? "Yes": "No", typeof []); // 

let tempVar; // undefined
console.log("tempVar is ", tempVar ? "Yes": "No", typeof tempVar); // 

let tempNum = 'a' * 2;
console.log("tempNum is ", tempNum ? "Yes": "No", typeof tempNum); // 


/* Truthy Values
true
non-zero number
non empty string
empty object
empty array
*/

/*
Falsy values
false
0
''
NaN
null
undefined
void
*/

var emptyStr = ""
var isValid = !!emptyStr; //! ! of emptyStr => !! of Falsy => !True => False
var nullVar = null;




exports.str1 = str1;
exports.str2 = str2;