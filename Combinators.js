// 1. Promise all

//  * If one of the promise is rejected, it will print the reject statement in the catch block and other will not be executed.

const promise1 = new Promise((resolve, reject) => {
  resolve('success');
});

const promise2 = new Promise((resolve, reject) => {
  reject('failure');
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('happy'), 100);
});

const allPromises = [promise1, promise2, promise3];

Promise.all(allPromises)
  .then((values) => console.log(values)) // values will be in array // [resolvedValue1, resolvedValue2]
  .catch((err) => console.log(err, 'error')); // rejectReason of any first rejected promise

// In the case of async/await syntax:

try {
  const values = await allPromises;
  console.log(values); // [resolvedValue1, resolvedValue2]
} catch (error) {
  console.log(error); // rejectReason of any first rejected promise
}

Promise.allSettled(allPromises).then((result) => console.log(result));

// 2. Promise allSettled

// It will return all the Promise status and value in array of object. Eg:
// [
//   { status: 'fulfilled', value: 'success' },
//   { status: 'rejected', reason: 'success2' },
//   { status: 'fulfilled', value: 'happy' }
// ]

// 3. Promise race

Promise.race(allPromises).then((value) => console.log(value)).cath((err) => console.log(err));

// It will return first executing promise either it is rejected or resolved in then block.

https://www.educative.io/answers/what-is-promiserace-in-javascript

4. Promise any :

Promise.any will return the first fulfilled promise, whereas Promise.race will return the first settled promise.
If all are rejected, in which case it's rejected with an AggregateError.
  
let promise1 = new Promise( (resolve, reject) => {
  setTimeout(resolve, 100, 'First Promise resolve after 100ms');
});

let promise2 = new Promise((resolve, reject) => {
  setTimeout(reject, 50, 'second Promise will reject after 50ms');
});

Promise.race([promise1, promise2])
        .then( value => {
          console.log("On Calling Promise.race", value);
        })
        .catch(v=>{
          console.log("On Calling Promise.race", v);  / promise 2 will reject first so it will be printed
        });

Promise.any([promise1, promise2])
        .then( value => {
          console.log("On Calling Promise.any", value); / promise 1 will fulfilled first so it will be printed
        })
        .catch( v => {
          console.log("On Calling Promise.any", v);
        })


