// DAO
class FactoryInstance {
    type = "base";

    constructor(type) { this.type = type; }

    doSomethingAsync(callbackFn) {
        setTimeout(() => {
            console.log("Did some work.!"); // do something 
            console.log("Hold on! Still doing.!"); // once ready
            console.log("Ok! its done heres the result"); // call callbackFn
            callbackFn("asyncResult")
        }, 2000)
    }
}

// Service
class ApplicationFactory {
    static instance(type, callbackFn) {
        setTimeout(() => {
            console.log("Create an instance of Factory"); // do something 
            callbackFn(new FactoryInstance(type));
        }, 3000)
    }
}

// Controller
const result = ApplicationFactory.instance("async", (factory) => {
    // do something with factory
    console.log("Inside callback of Instance");
    factory.doSomethingAsync((result) => {
        console.log("Inside callback of doSomethingAsync");
        console.log(result);
    });
});

console.log("RESULT :::: ", result);

// function 2, callback 4