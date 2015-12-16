'use strict'
// modules
import test from 'tape'
// local modules
import {h1, fw} from '../fixtures/emoji'
import TestServer from '../fixtures/http-server'
import Proposal from '../../index'

const afterClose = (t) => () => {
  console.log(fw('closing server'))
  t.end(null)
}

const afterStartup = (t, stop) => () => {
  console.log(fw('server listening'))
  const closeProposal = Proposal(stop)
  const notAPromise = !(closeProposal instanceof Promise) && (closeProposal instanceof Function)
  t.ok(notAPromise, 'Proposal(f) returns Function, not Promise')

  const closePromise = closeProposal()
  const isAPromise = (closePromise instanceof Promise)
  t.ok(isAPromise, 'Proposal(f)() returns Promise')

  closePromise.then(afterClose(t))
}

test(h1('Proposal test (callback-only nodeback)'), (t) => {
  const serv = TestServer(1337)
  serv.start(afterStartup(t, serv.stop))
})
