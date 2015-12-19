var five = require("johnny-five");
var Edison = require("edison-io");
var express = require("express");
var fs = require("fs");

var app = express();

app.use(express.static('public'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

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
