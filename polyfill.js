function action1(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`My name is ${name}`);
    }, 1000);
  });
}

function action2(age) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`My age is ${age}`);
    }, 1000);
  });
}

function action3(occupation) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`I am a ${occupation}`);
    }, 1000);
  });
}

const allPromise = [
  action1('shahith'),
  action2(24),
  action3('Software Developer'),
];

1. All
Promise.allPolyfill = function (promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    if (!promises) {
        reject(new Error(`undefined is not iterable`));
      return;
    } else if (!promises.length) {
      resolve(results);
      return;
    } else {
      promises.forEach((promise) => {
        Promise.resolve(promise)
          .then((res) => {
            results.push(res);
            if (promises.length === results.length) {
              resolve(results);
            }
          })
          .catch((err) => reject(new Error(err)));
      });
    }
  });
};

Promise.allPolyfill(allPromise)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

2. All settled
Promise.allSettledPolyfill = function (promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    if (!promises) {
        reject(new Error(`undefined is not iterable`));
      return;
    } else if (!promises.length) {
      resolve(results);
      return;
    } else {
      promises.forEach((promise) => {
        Promise.resolve(promise)
          .then((value) => {
            results.push({ status: 'fulfilled', value });
          })
          .catch((value) => results.push({ status: 'rejected', value }))
          .finally(() => {
            if (promises.length === results.length) {
              resolve(results);
            }
          });
      });
    }
  });
};


Promise.allSettledPolyfill(allPromise)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

3. Any
Promise.anyPolyfill = function (promises) {
  return new Promise((resolve, reject) => {
    let settledPromises = 0;
    if (!promises || !promises.length) {
      reject(new Error(`undefined is not iterable`));
      return;
    } else {
      promises.forEach((promise) => {
        Promise.resolve(promise)
          .then((res) => {
            resolve(res);
            return;
          })
          .catch((err) => {
            settledPromises++;
            if (settledPromises === promises.length) {
              reject(new AggregateError('All promises are rejected'));
            }
          });
      });
    }
  });
};


Promise.anyPolyfill(allPromise)
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

4. race
Promise.racePolyfill = function (promises) {
  return new Promise((resolve, reject) => {
    if (!promises || !promises.length) {
      reject(new Error(`undefined is not iterable`));
      return;
    } else {
      promises.forEach((promise) => {
        Promise.resolve(promise)
          .then((res) => {
            resolve(res);
            return;
          })
          .catch((err) => {
            reject(new Error(err));
            return;
          });
      });
    }
  });
};


Promise.racePolyfill([])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

