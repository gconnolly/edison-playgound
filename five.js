var five = require("johnny-five");
var Edison = require("edison-io");
var http = require("http");

var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write('<!DOCTYPE "html">');
  response.write("<html>");
  response.write("<head>");
  response.write("<title>Hello World Page!!!</title>");
  response.write("</head>");
  response.write("<body>");
  response.write("Hello World!");
  response.write("</body>");
  response.write("</html>");
  response.end();
});

server.listen(80);

var board = new five.Board({
  io: new Edison()
});

board.on("ready", function() {
  var led = new five.Led(13),
      short = blink.bind(null, led, 500),
      long = blink.bind(null, led, 1000),
      sos = function (led, short, long) {

            };
  
  setInterval(function () {
    short(
      short.bind(null, 
        short.bind(null, 
          long.bind(null,
            long.bind(null,
              long.bind(null,
                short.bind(null,
                  short.bind(null,
                    short.bind(null, function () {})))))))));
  }, 15000);
});

function blink(led, interval, callback) {
  led.on();
  setTimeout(function () {
    led.off();
    setTimeout(function () {
      callback();
    }, 250)
  }, interval);
}
