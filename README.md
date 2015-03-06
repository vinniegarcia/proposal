# Proposal
[![npm version](https://badge.fury.io/js/proposal.svg)](http://badge.fury.io/js/proposal)
[![travis build information](https://api.travis-ci.org/vinniegarcia/proposal.svg)](https://travis-ci.org/vinniegarcia/proposal)
[![Coverage Status](https://coveralls.io/repos/vinniegarcia/proposal/badge.svg)](https://coveralls.io/r/vinniegarcia/proposal)

Callback to Promise converter. A `Proposal` is a bridge function between node-style asynchronous functions with callbacks in the form of `(err, data) => void` (which from here on out I'll refer to as `nodebacks`) and ECMAScript 6 `Promises`.

## Installation
Required: [nodejs](http://nodejs.org/) (tested against v0.10 and 0.12), or [io.js](https://iojs.org/) (tested against v1.4.2), [npm](https://www.npmjs.com/).
```
npm i proposal --save
```

## Usage
`Proposal(nodeback[, args])` - takes a `nodeback` and converts it into a `Promise`.

If arguments are supplied, the `nodeback` is executed and a `Promise` is returned. Use it like any other Promise you've used before, with `.then()` and `.catch()`.

If no arguments are supplied, `Proposal` will return a function that, when executed with its parameters, will then return a `Promise`. This is useful if, for example, you want to execute that function multiple times to pass in different arguments.

## Examples

### 1. Create a Proposal

Create a Proposal function by calling `Proposal()` with 1 argument: the function you'd like to convert.
```javascript
var fs = require('fs'),
  Proposal = require('proposal'),
  readProposal = Proposal(fs.readFile);
```
At this point, `readProposal` is a function, that when invoked with `fs.readFile`'s parameters, will return a `Promise` containing the result of the file read operation. We'll use this Proposal twice below, once to read the system's HOSTS file and again to read the system's Apache configuration file.
```javascript
var path = require('path'),
  hostsFile = path.resolve('/etc/hosts'),
  apacheConfig = path.resolve('/etc/httpd/httpd.conf'),
  hostsRead = readProposal(hostsFile),
  apacheRead = readProposal(apacheConfig);

hostsRead.then(function (txt) {
  //do stuff with txt
})
.catch(function (err) {
  //handle the error
});

//apacheRead is also available as a Promise here
```

### 2. Create a Promise containing the result of a file read

You can skip the intermediate `Proposal` function and get a `Promise` directly by supplying the nodeback's arguments when invoking.

```javascript
var fs = require('fs'),
  path = require('path'),
  Proposal = require('proposal'),
  filepath = path.resolve('data/example.json'),
  readFile = Proposal(fs.readFile, filepath);

  readFile.then(function (data) {
    //do stuff with data
  })
  .catch(function (err) {
    //handle the error
  });
```

## Questions

1. _My nodeback doesn't take any arguments, just a callback. How can I get a Promise back 
    instead of a Proposal?_
    
    Just invoke the resulting Proposal. Example:
    ```javascript
    var Proposal = require('proposal');

    function closeConnection(callback) {
      //this is an example of a nodeback with no arguments
      callback(err, data);
    }
    //create the Proposal to close the connection
    var closeProposal = Proposal(closeConnection);
    //invoke the Proposal to return a Promise
    var closePromise = closeProposal();
    closePromise.then(function (data) {
      //do something with your data
    })
    .catch(function (err) {
      //handle your error
    });
    ```
2. _Does `Proposal` work with node `crypto` functions?_
  
  Yes! As you may or may not know, many of the functions in nodejs's [`crypto`](http://nodejs.org/api/crypto.html) module, like [`randomBytes`](http://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback), are async when a callback is passed in but sync when the callback argument is omitted. `Proposal` will work with these and preserve asynchronicity. Example from the unit tests:
  ```javascript
  var buffy = Proposal(crypto.randomBytes, 512);
  console.log(buffy instanceof Promise); // => true, is not a value
  ```
3. _I have another question that's not listed here._

    Raise an issue and I'll get to it as soon as I can. Thanks for reading this far!
