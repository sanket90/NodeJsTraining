import { add } from "./module_a"

let isValid;


isValid = true;

console.log(isValid);

const doSomething = () => {
    console.log("Done.!");    
}

interface User {
    name: string;
    age: number;
    salary?: number;
}

const user: User = {
    name: "xyz",
    age: 15
}

console.log(add(15,13));
