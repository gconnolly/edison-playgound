var five = require("johnny-five");
var Edison = require("edison-io");
var http = require("http");
var fs = require("fs");

var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  var fileStream = fs.createReadStream('index.html');
  fileStream.pipe(response);
  response.end();
});

server.listen(8080);

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
