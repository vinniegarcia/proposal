import 'core-js/shim';
import assert from 'assert';
import fs from 'fs';
import path from 'path';
import Proposal from '../index';

const fileReadAssertions = (fileReadPromise, cont) => {
  fileReadPromise.then((json) => {
      const data = JSON.parse(json);
      assert.ok(data.success && data.number === 42 && data.name === 'Chris Farley', 'Expected file data not found!');
      cont();
    })
    .catch(cont);
}

describe('Proposal tests', () => {

  const read = fs.readFile,
      sampleFile = path.resolve(__dirname, 'fixtures/sample.json');

  it('should return a Promise when a Proposal has arguments', function (done) {
    const readPromise = Proposal(read, sampleFile),
      isAPromise = (readPromise instanceof Promise);
    assert.ok(isAPromise, 'Proposal broke its Promise!');
    fileReadAssertions(readPromise, done);
  });

  it('should return a curried function that generates a Promise when a Proposal has no arguments',
    function (done) {
      const chickenCurry = Proposal(read),
        curryIsntPromise = !(chickenCurry instanceof Promise),
        curryIsFunction = (typeof chickenCurry === 'function');

      assert.ok(curryIsntPromise, 'You made an empty Promise! You know you won\'t keep it!');
      assert.ok(curryIsFunction, 'chickenCurry is not a funciton!');

      const curryRead = chickenCurry(sampleFile),
        curryReadIsPromise = (curryRead instanceof Promise);

      assert.ok(curryReadIsPromise, 'Promise not generated properly when curried function executed!');

      fileReadAssertions(curryRead, done);
  });

});
