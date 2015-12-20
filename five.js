var five = require("johnny-five");
var Edison = require("edison-io");
var express = require("express");
var fs = require("fs");
var app = express();
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

app.use(express.static('public'));

var board = new five.Board({
  io: new Edison()
});

board.on("ready", function() {
  var led = new five.Led(13),
      short = blink.bind(null, led, 500),
      long = blink.bind(null, led, 1000);
      
      
  var servo = new five.Servo.Continuous(9);
  servo.cw(1);
  servo.stop();

  app.post('/', function(sReq, sRes){    
    short(
      short.bind(null, 
        short.bind(null, 
          long.bind(null,
            long.bind(null,
              long.bind(null,
                short.bind(null,
                  short.bind(null,
                    short.bind(null, function () {})))))))));  
  });
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
