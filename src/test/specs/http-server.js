'use strict'
// builtins
import http from 'http'
//modules
import test from 'tape'
// local modules
import {h1, cool, fw} from '../fixtures/emoji'
import Proposal from '../../index'

test(h1('Proposal test (callback-only nodeback)'), (t) => {
    const handler = (req, res) => {
      res.writeHead(200)
      res.end('hello world\n')
    },
      serv = http.createServer(handler),
      closeProposal = Proposal(serv.close.bind(serv)),
      notAPromise = !(closeProposal instanceof Promise) && (closeProposal instanceof Function)

    t.ok(notAPromise, 'Proposal(f) returns Function, not Promise')

    const shutItDown = () => {
      
      console.log(fw('server listening'))
      const closePromise = closeProposal()
      const isAPromise = (closePromise instanceof Promise)

      t.ok(isAPromise, 'Proposal(f)() returns Promise')

      closePromise.then(() => {
        console.log(fw('closing server'))
        t.end(null)
      }).catch(t.end)

    }

    serv.on('listening', shutItDown)
    serv.listen(1337)

})
