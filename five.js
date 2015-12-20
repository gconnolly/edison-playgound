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
  var led = new five.Led(13);
  var servo = new five.Servo.Continuous(9);

  app.post('/', function(sReq, sRes){
    console.log(servo.isMoving);
    if(servo.isMoving) {
       servo.cw(1);
       led.on();
    } else {
       servo.ccw(1);
       led.off();
    }
  });
});
