var five = require("johnny-five"),
    Edison = require("edison-io"),
    express = require("express"),
    fs = require("fs"),
    app = express(),
    server = app.listen(3000);

app.use(express.static('public'));

var board = new five.Board({
  io: new Edison()
});

board.on("ready", function() {
  var rightServo = new five.Servo.Continuous(5),
      leftServo = new five.Servo.Continuous(6),
      led = new five.Led(13),
      piezo = new five.Piezo(12),
      moving = false,
      stop = function () {
        moving = false;
        rightServo.cw(0);
        leftServo.cw(0);
      };

  led.on();
  
  // Add to REPL
  this.repl.inject({
    led: led,
    rightServo: rightServo,
    leftServo: leftServo,
    piezo: piezo
  });

  app.post('/forward', function(sReq, sRes){
    if(moving) {
        stop();
        return;
    } else {
        moving = true;
    }
    
    rightServo.cw(1);
    leftServo.ccw(1);
  });
  
  app.post('/backward', function(sReq, sRes){
    if(moving) {
        stop();
        return;
    } else {
        moving = true;
    }
    
    rightServo.ccw(1);
    leftServo.cw(1);
  });

  app.post('/right', function(sReq, sRes){
    if(moving) {
        stop();
        return;
    } else {
        moving = true;
    }
    
    rightServo.ccw(0.25);
    leftServo.ccw(0.25);
  });

  app.post('/left', function(sReq, sRes){
    rightServo.cw(0.25);
    leftServo.cw(0.25);
  });
  
  app.post('/stop', function(sReq, sRes){
    rightServo.cw(0);
    leftServo.cw(0);
  });
  
  app.post('/honk', function(sReq, sRes){
    piezo.play({
        // song is composed by a string of notes
        // a default beat is set, and the default octave is used
        // any invalid note is read as "no note"
        song: "- - C C C - C C C - C C C - F F F F - A A A A - - - - C C C - C C C - C C C - F F F F - A A A A",
        beats: 1 / 8,
        tempo: 100
    });
  });
});