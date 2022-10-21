// Var



// Hoisting

// 1 = Valid
vnum1 = 123;
vnum1 += 7;
var vnum1;

// 2 = Valid
vFun1();
function vFun1() {
    console.log("vFun1 called");
}

//3 = Invalid
// vFun2(); Invalid. cant call before the declaration
var vFun2 = function() {
    console.log("vFun2 called");
}




// scope

function fnScope() {
    var vScope = 1;
}
fnScope();
// vScope = 2;
// console.log(vScope);



let varLet = 1;
varLet = 2;
const varConst = 2;



// Destruct / Spread operator
let arr1 = [5, 7, 3, 6, 2, 8];
let arr2 = [...arr1]; // Re-assignment, reference assignment

let varA = 5;
let varB = 7;
let arr3 = [varB, varA]; // Declare an Array, Assign 0th index with varB, 1st index with varA
[varA, varB] = arr3; // Receive an Array, Whatvere is on 0th index assign that to varA, Whatvere is on 1st index assign that to varB
let [varC, varD] = arr3;
console.log(varC, varD);


// For of loop
for (const item of arr1) {
    console.log(item);
}


// Arrow function

let funOldExpressionSum = function(n1, n2) {
    return n1 + n2;
}

let funArrowSum = (n1, n2) => {
    return n1 + n2;
}

let funArrowSumInline = (n1, n2) => n1 + n2;

let resultArr = arr1.filter(function(item) {
    return item % 2 == 0;
});

resultArr = arr1
    .filter(item => item % 2 == 0) // => new filtered arr
    .map(even => even*even) // => new mapped arr
    .reduce((evenSqrPrev, evenSqrCurr) => evenSqrCurr + evenSqrPrev, 0)// => reduction

console.log(resultArr);
