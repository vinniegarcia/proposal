import test from 'tape'
import req from 'httpreq'
import {exec} from 'child_process'
import { h1, cool, fw } from '../fixtures/emoji'
import TestServer from '../fixtures/http-server'
import Proposal from '../../index'

test(h1('multiple return values test'), async (t) => {
  const HOST = '127.0.0.1'
  const PORT = 8912
  const URL = `http://${HOST}:${PORT}/`
  
  const serv = TestServer(PORT)
  serv.start()

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
  
  serv.stop(t.end)

})
