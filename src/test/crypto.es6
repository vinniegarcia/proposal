'use strict';

import {ok} from 'assert';
import crypto from 'crypto';
import { h1, cool } from './fixtures/emoji';
import Proposal from '../index';

describe(h1('crypto tests where no callbacks makes a method sync'), () => {

  it(cool('properly creates Proposal for a crypto nodeback'), async (done) => {
    
    try {
      const buffy = await Proposal(crypto.randomBytes, 512);
      ok(buffy.length === 512);
      ok(buffy instanceof Buffer && !(buffy instanceof Promise));
      done();
    } catch (err) {
      done(err);
    }
    
  });

  it(cool('returns promise (async), not a sync buffer'), (done) => {
    const futureBiff = Proposal(crypto.randomBytes, 512);
    ok(futureBiff instanceof Promise && !(futureBiff instanceof Buffer));
    futureBiff.then((biff) => {
      ok(biff instanceof Buffer);
      done();
    })
    .catch(done);

  });

});
