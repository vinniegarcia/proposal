import 'core-js/shim';

function denode(resolve, reject) {
  //convert the err,data callback to
  //promise resolve/reject calls
  return (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    };
}

//take a node-style function that sends
//an (err, result) style callback
//and turns it into a promise
const promiseMe = (f, ...args) => new Promise((resolve, reject) => f(...args, denode(resolve, reject)));

function Proposal(errbackFn, ...args)  {
  // 1. check args
  // 2. if args is empty, return a curried func that will return a promise
  // 3. else return a promise to fulfill
  if (args.length === 0) {
    return (...argz) => promiseMe(errbackFn, ...argz);
  }
  return promiseMe(errbackFn, ...args);
}

export default Proposal;
