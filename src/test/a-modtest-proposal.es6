'use strict';
// builtins
import {ok} from 'assert';
import fs from 'fs';
// local modules
import {sample as sampleFile } from './fixtures/';
import {errify, h1, cool} from './fixtures/emoji';
import Proposal from '../index';

const fileReadAssertions = (fileReadPromise, cont) => {
  fileReadPromise.then((json) => {
      const data = JSON.parse(json),
        isFarley = data.success && data.number === 42 && data.name === 'Chris Farley';
      ok(isFarley, errify('Expected file data not found!'));
      cont();
    })
    .catch(cont);
};

describe(h1('Proposal tests'), () => {

  const read = fs.readFile;

  it(cool(`Should return a Promise when a Proposal has arguments`),
    (done) => {
      const readPromise = Proposal(read, sampleFile),
        isAPromise = (readPromise instanceof Promise);
      ok(isAPromise, errify('Proposal broke its Promise!'));
      fileReadAssertions(readPromise, done);
    });

  it(cool(`Returns a function that waits for more input
    if Proposal has only one arguments`),
    (done) => {
      const chickenCurry = Proposal(read),
        curryIsntPromise = !(chickenCurry instanceof Promise),
        curryIsFunction = (chickenCurry instanceof Function);

      ok(curryIsntPromise, errify('You made an empty Promise! You know you won\'t keep it!'));
      ok(curryIsFunction, errify('chickenCurry is not a function!'));

      const curryRead = chickenCurry(sampleFile),
        curryReadIsPromise = (curryRead instanceof Promise);

      ok(curryReadIsPromise, errify('Promise not generated properly when curried function executed!'));

      fileReadAssertions(curryRead, done);
    });

});
