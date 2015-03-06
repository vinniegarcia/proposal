import 'core-js/shim';
import assert from 'assert';
import fs from 'fs';
import path from 'path';
import http from 'http';
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

const emojify = (emo, pre='') => (str) => `${pre}${emoji[emo]}  ${str}`,
  errify = emojify('poop'),
  h1 = emojify('pineapple'),
  cool = emojify('cool'),
  fw = emojify('fireworks', '\t\t');

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
      assert.ok(curryIsFunction, errify('chickenCurry is not a function!'));

      const curryRead = chickenCurry(sampleFile),
        curryReadIsPromise = (curryRead instanceof Promise);

      assert.ok(curryReadIsPromise, errify('Promise not generated properly when curried function executed!'));

      fileReadAssertions(curryRead, done);
    });

  it(cool('Tests a Proposal against a nodeback with no args'), function (done) {
    const handler = (req, res) => {
      console.log('hey');
      res.writeHead(200);
      res.end('hello world\n');
    },
      serv = http.createServer(handler),
      closeProposal = Proposal(serv.close.bind(serv)),
      isntAPromise = !(closeProposal instanceof Promise);

    assert.ok(isntAPromise, errify('You made an empty Promise with server.close!'));

    serv.on('listening', () => {
      console.log(fw('server listening'));

      const closePromise = closeProposal(),
        isAPromise = (closePromise instanceof Promise);

      assert.ok(isAPromise, errify('closePromise is not a Promise!'));

      closePromise.then(() => {
        console.log(fw('closing server'));
        done();
      }).catch(done);

    });
    serv.listen(10000);

  });

  it(cool('A-weits'), async function (done) {
      const farley = await Proposal(read, sampleFile);
      console.log(farley);
      assert.ok(farley.name.includes('Farley'), 'Not Chris Farley!');
      done();
    });


});
