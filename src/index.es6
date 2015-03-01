import 'core-js/shim';

//convert the err,data callback to promise resolve/reject calls
const denode = (resolve, reject) => (err, data) => (err) ? reject(err) : resolve(data);

//take a node-style function that sends an (err, result) style callback
//and turns it into a promise
const promiseMe = (f, ...args) => new Promise((resolve, reject) => f(...args, denode(resolve, reject)));

//waits for parameters before creating the Promise
const curryWrap = (f) => (...more) => Proposal(f, ...more);

function Proposal(errbackFn, ...args)  {
  // if args given, return a promise for the operation.
  // if not, return a new function that waits for more input.
  return (args.length > 0) ? promiseMe(errbackFn, ...args) : curryWrap(errbackFn);
}

export default Proposal;
