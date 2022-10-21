/* Default */
function myFirstFn() {
    // return
    console.log();
}

console.log("Type of myFirstFn is ", typeof myFirstFn);
var myAnotherFn = myFirstFn;

/* Expression */
var myThirdFn = function() {
    myFirstFn()
}
myThirdFn();

// Avoid or Should not Do
var result = 0;
function sumSideEffect(n1, n2) {
    result = n1 + n2;
}

// Please do
function sumPureFn(n1 , n2) {
    return n1 + n2;
}

export {
    myFirstFn,
    myThirdFn,
    sumSideEffect,
    sumPureFn,
    result
}



function PersonFn() {

    let name;
    let email;

    function changePwd() {
        // do something
    }

    return {
        name, email, changePwd
    }
}

const person1 = PersonFn();


class Person {
    name;
    email;

    changePwd() {}
}

const person2 = new Person();

person2();