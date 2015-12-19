var five = require("johnny-five");
var Edison = require("edison-io");
var board = new five.Board({
  io: new Edison()
});

board.on("ready", function() {
  var led = new five.Led(13),
      short = blink.bind(null, led, 1000),
      long = blink.bind(null, led, 2000);
  
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

function blink(led, interval, callback) {
  led.on();
  setTimeout(function () {
    led.off();
    setTimeout(function () {
      callback();
    }, 500)
  }, interval);
}
