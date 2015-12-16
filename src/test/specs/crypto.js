import test from 'tape'
import crypto from 'crypto'
import { h1 } from '../fixtures/emoji'
import Proposal from '../../index'

test(h1('crypto tests where no callbacks makes a method sync'), async (t) => {

  try {
    const buffy = await Proposal(crypto.randomBytes, 512)
    t.ok(buffy.length === 512, 'Buffer created and awaited from Proposal')
    t.ok(buffy instanceof Buffer && !(buffy instanceof Promise), 'Buffer unwrapped from Promise')
  } catch (err) {
    t.end(err)
  }

  const futureBiff = Proposal(crypto.randomBytes, 512)
  t.ok(futureBiff instanceof Promise && !(futureBiff instanceof Buffer), 'Promise created from Proposal wrapping')
  
  futureBiff
    .then((biff) => {
      t.ok(biff instanceof Buffer, 'Buffer unwrapped from Promise')
      t.end(null)
    })
    .catch(t.end)

})
