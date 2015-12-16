'use strict';
// builtins
import http from 'http';
import {ok} from 'assert';
// local modules
import {errify, h1, cool, fw} from './fixtures/emoji';
import Proposal from '../index';

describe(h1('Proposal test (callback-only nodeback)'), () => {
  it(cool('Tests a Proposal against a nodeback with no args'), (done) => {
    const handler = (req, res) => {
      res.writeHead(200);
      res.end('hello world\n');
    },
      serv = http.createServer(handler),
      closeProposal = Proposal(serv.close.bind(serv)),
      isntAPromise = !(closeProposal instanceof Promise) && (closeProposal instanceof Function);

    ok(isntAPromise, errify('You made an empty Promise with server.close!'));

    serv.on('listening', () => {
      console.log(fw('server listening'));

      const closePromise = closeProposal(),
        isAPromise = (closePromise instanceof Promise);

      ok(isAPromise, errify('closePromise is not a Promise!'));

      closePromise.then(() => {
        console.log(fw('closing server'));
        done();
      }).catch(done);

    });
    serv.listen(1337);

  });
});
