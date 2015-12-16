import test from 'tape'
import http from 'http'
import req from 'httpreq'
import {exec} from 'child_process'
import { h1, cool, fw } from '../fixtures/emoji'
import Proposal from '../../index'

test(h1('multiple return values test'), async function (t) {
  const HOST = '127.0.0.1'
  const PORT = 8912
  const URL = `http://${HOST}:${PORT}`
  
  const handler = (req, res) => {
    res.writeHead(200)
    res.end(fw('TEST RESULT\n'))
  }
  const serv = http.createServer(handler)
  serv.on('listening', () => {
    console.log(fw(`server listening at ${URL}`))
  })
  serv.listen(PORT)

  try {
    const getIt = Proposal(req.get)
    const response = await getIt(URL)
    t.ok(!Array.isArray(response), 'Single item returned, not packed in array')
  } catch (err) {
    t.fail(err)
  }

  try {
    const futureExec = Proposal(exec)
    const [stout, sterr] = await futureExec(`curl -# ${URL}`, {})
    t.ok(typeof stout === 'string' && typeof sterr === 'string', 'Multiple values are returned in an array')
  } catch (err) {
    t.fail(err)
  }
  
  serv.close(t.end)

})
