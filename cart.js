const cart = ['shoe', 'pants', 'shirts'];

const promise = createOrder(cart);

promise
  .then(function (orderId) {
    console.log(orderId);
    return orderId; // should return in every then method
  })
  .then(function (orderId) {
   return proceedToPayment(orderId);
  })
  .then(function (paymentInfo) {
    console.log(paymentInfo);
  })
  .catch((err) => {
    console.log(err.message);
  })
  .then(function () {
  console.log("It will called even if success or failure");
  })

// Create Promise

function createOrder(cart) {
  // new keyword and promise constructor which has resolve and reject given by javascript
  const pr = new Promise(function (resolve, reject) {
    if (!validateCart(cart)) {
      const err = new Error('Cart is not valid');
      reject(err); // promise will be rejected (catch)
    }
    const orderId = '12345';
    if (orderId) {
      resolve(orderId); //(then)
    }
  });
  return pr;
}

function validateCart(cart) {
  return true;
}

function proceedToPayment(orderId) {
  return new Promise(function (resolve, reject) {
    resolve('Payment Succcessfull');
  });
}
