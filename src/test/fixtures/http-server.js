import http from 'http'
import {fw} from './emoji'

const respond = (req, res) => {
  res.writeHead(200)
  res.end(fw('TEST RESULT\n'))
}

const defaultListener = (srv) => () => {
  console.log(fw(`server listening on port ${srv.address().port}`))
}

const TestServer = (port, handler = respond) => {
  const serv = http.createServer(handler)
  const stop = serv.close.bind(serv)
  return {
    serv,
    start (onListening = defaultListener(serv)) {
      serv.on('listening', onListening)
      serv.listen(port)
    },
    stop
  }
}

export default TestServer
