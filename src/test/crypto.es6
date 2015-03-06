import {ok} from 'assert';
import crypto from 'crypto';
import {errify, h1, cool, fw} from './fixtures/emoji';
import Proposal from '../index';

describe(h1('crypto tests where no callbacks makes a method sync'), () => {

  it(cool('properly creates Proposal for a crypto nodeback'), async (done) => {
    const buffy = await Proposal(crypto.randomBytes, 512);
    ok(buffy.length === 512);
    ok(buffy instanceof Buffer && !(buffy instanceof Promise));
    done();
  });

  it(cool('returns promise (async), not a sync buffer'), (done) => {
    const futureBiff = Proposal(crypto.randomBytes, 512);
    ok(futureBiff instanceof Promise && !(futureBiff instanceof Buffer));
    futureBiff.then(function (biff) {
      ok(biff instanceof Buffer);
      done();
    })
    .catch(done);

  });

});
