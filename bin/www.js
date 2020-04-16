const app = require('./../app')
var http = require('http')
var server = http.createServer(app);

var port = normalizePort(process.env.PORT || '7777')
server.listen(port)
console.log(`server started at ${port} env is: '${process.env.NODE_ENV}', process PID: ${process.pid}`)
app.set('port', port)


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}