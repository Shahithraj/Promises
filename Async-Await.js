async keywoard 
 - Function having async keyword always return promise object.
1.
async function greeting() {
  return "Hello"
}
let message = greeting()
 
console.log(message) - Promise {
   PromiseState : "Fulfilled"
   Promiseresult:"Hello"
}

message.then((res) => console.log(res)) // "Hello"

2.

const newPromise = new Promise((res,rej) => {
   setTimeout(() => {
   resolve("Print after one second")
},1000)
})

async function executePromise() {
return newPromise.then((res) => console.log(res))
}

console.log(executePromise()) // Promise {<pending>} but Fulfilled in promiseState
// 

function executePromise() {
newPromise.then((res) => console.log(res))
console.log("Print before promise")
}
executePromise()

async function executePromiseAsync() {
let res = await newPromise;
console.log(res)
console.log("Print after async promise")
}
console.log(executePromiseAsync()) // Promise {<pending>} but Fulfilled in promiseState

3.

const newPromise2 = new Promise((res,rej) => {
   setTimeout(() => {
   resolve("Print after one second")
},4000)
})

async function executePromiseAsync() {
let res1 = await newPromise;
console.log(res)
let res2 = await newPromise2;
console.log(res2) // it will be printed after 3 seconds of 1st promise resolved
console.log("Print after async promise")
}

// promise1 and promise2 will simultaneously run, after first one is resolved and consecutive promises will be resolved.

console.log(executePromiseAsync()) // Promise {<pending>} but Fulfilled in promiseState



