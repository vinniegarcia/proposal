import 'core-js/shim';
import assert from 'assert';
import fs from 'fs';
import path from 'path';
import {emoji} from 'node-emoji';
import Proposal from '../index';

const fileReadAssertions = (fileReadPromise, cont) => {
  fileReadPromise.then((json) => {
      const data = JSON.parse(json),
        isFarley = data.success && data.number === 42 && data.name === 'Chris Farley';
      assert.ok(isFarley, errify('Expected file data not found!'));
      cont();
    })
    .catch(cont);
};

const emojify = (emo) => (str) => `${emoji[emo]}  ${str}`,
  errify = emojify('poop'),
  h1 = emojify('pineapple'),
  cool = emojify('cool');

describe(h1('Proposal tests'), () => {

  const read = fs.readFile,
      sampleFile = path.resolve(__dirname, 'fixtures/sample.json');

  it(cool('Should return a Promise when a Proposal has arguments'), function (done) {
    const readPromise = Proposal(read, sampleFile),
      isAPromise = (readPromise instanceof Promise);
    assert.ok(isAPromise, errify('Proposal broke its Promise!'));
    fileReadAssertions(readPromise, done);
  });

  it(cool('Returns a function that waits for more input if Proposal has only one arguments'),
    function (done) {
      const chickenCurry = Proposal(read),
        curryIsntPromise = !(chickenCurry instanceof Promise),
        curryIsFunction = (typeof chickenCurry === 'function');

      assert.ok(curryIsntPromise, errify('You made an empty Promise! You know you won\'t keep it!'));
      assert.ok(curryIsFunction, errify('chickenCurry is not a funciton!'));

      const curryRead = chickenCurry(sampleFile),
        curryReadIsPromise = (curryRead instanceof Promise);

      assert.ok(curryReadIsPromise, errify('Promise not generated properly when curried function executed!'));

      fileReadAssertions(curryRead, done);
  });

});
