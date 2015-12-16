'use strict';

import {ok} from 'assert';
import http from 'http';
import req from 'httpreq';
import {exec} from 'child_process';
import { h1, cool, fw } from './fixtures/emoji';
import Proposal from '../index';

describe(h1('multiple return values test'), () => {
  const PORT = 8912;
  let url;
  
  const handler = (req, res) => {
      res.writeHead(200);
      res.end(fw('TEST RESULT\n'));
    },
      serv = http.createServer(handler);
    serv.on('listening', () => {
      const { address, port } = serv.address();
      url = `http://${address}:${port}/`;
      console.log(fw(`server listening at ${url}`));
    });

  before((done) => {
    serv.listen(PORT);
    done();
  });

  after((done) => {
    serv.close(done);
  });

  it(cool('returns one value, the response of a http get call'), async (done) => {

    try {
      const getIt = Proposal(req.get);
      const response = await getIt(url);
      ok(!Array.isArray(response));
      done();
    } catch (err) {
      done(err);
    }
    
  });

  it(cool('returns multiple values, the stdout and stderr from an executed child process'),
    async (done) => {
      this.timeout(10000);

      const futureExec = Proposal(exec);
      try {
        const [stout, sterr] = await futureExec(`curl -# ${url}`, {});
        ok(typeof stout === 'string' && typeof sterr === 'string');
        done();
      } catch (err) {
        done(err);
      }
    }
  );

});
