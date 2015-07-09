'use strict';

import {ok} from 'assert';
import http from 'http';
import req from 'httpreq';
import {exec} from 'child_process';
import { h1, cool, fw } from './fixtures/emoji';
import Proposal from '../index';

describe(h1('multiple return values test'), () => {
  const handler = (req, res) => {
      res.writeHead(200);
      res.end(fw('TEST RESULT\n'));
    },
      serv = http.createServer(handler);
    serv.on('listening', () => {
       console.log(fw('server listening'));
    });

  before((done) => {
    serv.listen(8912);
    done();
  });

  after((done) => {
    serv.close(done);
  });

  it(cool('returns one value, the response of a http get call'), (done) => {
    const getIt = Proposal(req.get);

    getIt('http://localhost:8912/').then((response) => {
      ok(!Array.isArray(response));
      done();
    })
    .catch(done);
  });

  it(cool('returns multiple values, the stdout and stderr from an executed child process'),
    async function (done) {
      this.timeout(10000);

      const futureExec = Proposal(exec);
      try {
        const [stout, sterr] = await futureExec('curl -# http://127.0.0.1:8912/', {});
        ok(typeof stout === 'string' && typeof sterr === 'string');
        done();
      } catch (err) {
        done(err);
      }
    }
  );

});
