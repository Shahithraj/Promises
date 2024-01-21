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
  .then((values) => console.log(values)) // values will be in array
  .catch((err) => console.log(err, 'error'));

// 1. Promise all

//  * If one of the promise is rejected, it will print the reject statement in the catch block and other will not be executed.

Promise.allSettled(allPromises).then((result) => console.log(result));

// 2. Promise allSettled

// It will return all the Promise status and value in array of object. Eg:
// [
//   { status: 'fulfilled', value: 'success' },
//   { status: 'rejected', reason: 'success2' },
//   { status: 'fulfilled', value: 'happy' }
// ]

// 3. Promise race

Promise.race(allPromises).then((value) => console.log(value));

// It will return first executing promise either it is rejected or resolved in then block
