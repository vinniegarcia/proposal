'use strict';

// Converts the (err, data) or (err, [data]) callback to Promise resolve/reject calls.
// Resolves with either the data or the [data] fulfillment argument, as onFulfilled
// takes exactly one argument (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then).
const denode = (resolve, reject) => (err, ...args) => (err) ? reject(err) : resolve((args.length > 1) ? args : args[0]);

// Takes a node-style function that sends an (err, result) or (err, [result])
// callback and turns it into a Promise.
const promiseMe = (f, ...args) => new Promise((resolve, reject) => f(...args, denode(resolve, reject)));

// Waits for parameters before creating the Promise.
const curryWrap = (f) => (...more) => promiseMe(f, ...more);

// If args are given, returns a Promise for the operation.
// Else, returns a new function that waits for more input.
const Proposal = (nodefn, ...args) => (args.length > 0) ? promiseMe(nodefn, ...args) : curryWrap(nodefn);

export default Proposal;
