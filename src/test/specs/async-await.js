/*global it, describe*/
// builtins
import {readFile} from 'fs'
//tape
import test from 'tape'
// local modules
import {sample as sampleFile } from '../fixtures'
import {h1} from '../fixtures/emoji'
import Proposal from '../../index'

test(h1('async/await test'), async (t) => {

    try {
      // you can use await in an async function like this one
      const response = await Proposal(readFile, sampleFile)
      const farley = JSON.parse(response)

      t.ok(farley && farley.name.includes('Farley'), 'File data read correctly')
      t.end(null)
    } catch (err) {
      t.end(err)
    }

})
