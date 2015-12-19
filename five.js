var five = require("johnny-five");
var Edison = require("edison-io");
var board = new five.Board({
  io: new Edison()
});
console.log('test');
board.on("ready", function() {
  console.log('running');
  var led = new five.Led(13);
  led.blink(500);
});
