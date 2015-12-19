var five = require("johnny-five");
var Edison = require("edison-io");
var board = new five.Board({
  io: new Edison()
});

board.on("ready", function() {
  var led = new five.Led(13),
      short = blink.bind(null, 1000),
      long = blink.bind(null, 2000);
  
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

function blink(interval, callback) {
  var led = new five.Led(13);
  led.on();
  setTimeout(function () {
    led.off();
    callback();
  }, interval);
}
