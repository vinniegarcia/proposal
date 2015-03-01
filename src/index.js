
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

function promiseMe(f, ...args) {
  //take a node-style function that sends
  //an (err, result) style callback
  //and turns it into a promise
  let prom = new Promise((resolve, reject) => {
    let resolveFn = denode(resolve, reject),
      argsWithErrback = [...args, resolveFn];
    f(...argsWithErrback);
  });
  return prom;
}

function Proposal(errbackFn, ...args)  {
  // 1. check args
  // 2. if args is empty, return a curried func that will return a promise
  // 3. else return a promise to fulfill

  if (!args) {
    return (...argz) => {
      return promiseMe(errbackFn, ...argz);
    };      
  }

  return promiseMe(errbackFn, ...args);
}

export default Proposal;