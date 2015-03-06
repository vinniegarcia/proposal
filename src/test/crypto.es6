import {ok} from 'assert';
import crypto from 'crypto';
import Proposal from '../index';

describe('crypto tests where no callbacks makes a method sync', () => {

  it('properly creates Proposal for a crypto nodeback', async (done) => {
    const buffy = await Proposal(crypto.randomBytes, 512);
    ok(buffy.length === 512);
    ok(buffy instanceof Buffer && !(buffy instanceof Promise));
    done();
  });

  it('returns promise (async), not a sync buffer', (done) => {
    const futureBiff = Proposal(crypto.randomBytes, 512);
    ok(futureBiff instanceof Promise && !(futureBiff instanceof Buffer));
    futureBiff.then(function (biff) {
      ok(biff instanceof Buffer);
      done();
    })
    .catch(done);

  });

});
