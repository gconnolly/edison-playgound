var five = require("johnny-five"),
    la_cucaracha = '- - C C - C C - C C - F F F F - A A A A - -',
    Rover = function Rover(board) {
        console.log('initializing rover');
        this.board = board;
        this.rightServo = new five.Servo.Continuous(5);
        this.leftServo = new five.Servo.Continuous(6);
        this.led = new five.Led(13);
        this.piezo = new five.Piezo(3);
        this.rgbs = [
            new five.Led.RGB({
                pins: { red: 2, green: 1, blue: 0 },
                controller: "PCA9685"
            }),
            new five.Led.RGB({
                pins: { red: 5, green: 4, blue: 3 },
                controller: "PCA9685"
            }),
            new five.Led.RGB({
                pins: { red: 8, green: 7, blue: 6 },
                controller: "PCA9685"
            }),
            new five.Led.RGB({
                pins: { red: 11, green: 10, blue: 9 },
                controller: "PCA9685"
            }),
            new five.Led.RGB({
                pins: { red: 14, green: 13, blue: 12 },
                controller: "PCA9685"
            })                                                
        ];
        
        board.repl.inject({
            rgbs: this.rgbs,
            led: this.led,
            rightServo: this.rightServo,
            leftServo: this.leftServo,
            piezo: this.piezo
        });
    };

Rover.prototype.colorMe = function colorMe(color) {
    console.log('rover colorMe');
    
    this.rgbs.forEach(function (led, index) {
       // if(colors[index]) {
            led.color(color);
       // }
    });
}
    
Rover.prototype.lightUp = function lightUp() {
    console.log('rover lightUp');
    
    this.rgbs.forEach(function (led) {
       led.on(); 
    });
};

Rover.prototype.pulse = function pulse() {
    console.log('rover pulse');
    
    this.rgbs.forEach(function (led) {
       led.pulse(); 
    });
};

Rover.prototype.stealth = function stealth() {
    console.log('rover stealth');
    
    this.rgbs.forEach(function (led) {
        led.off();
    });
};

Rover.prototype.forward = function forward() {
    console.log('rover forward');
    this.rightServo.cw(1);
    this.leftServo.ccw(1);
};

Rover.prototype.backward = function backward() {
    console.log('rover backward');
    this.rightServo.ccw(1);
    this.leftServo.cw(1);
};

Rover.prototype.right = function right() {
    console.log('rover right');
    this.rightServo.ccw(0.1);
    this.leftServo.ccw(0.1);
};

Rover.prototype.left = function left() {
    console.log('rover left');
    this.rightServo.cw(0.1);
    this.leftServo.cw(0.1);
};

Rover.prototype.stop = function stop() {
    console.log('rover stop');
    this.rightServo.cw(0);
    this.leftServo.cw(0);
};

Rover.prototype.honk = function honk() {
    console.log('rover honk');
    this.piezo.play({
        // song is composed by a string of notes
        // a default beat is set, and the default octave is used
        // any invalid note is read as "no note"
        song: la_cucaracha + la_cucaracha,
        beats: 1 / 8,
        tempo: 100
    });
};

Rover.prototype.activate = function activate() {
    console.log('rover activate');
    this.led.on();
};

Rover.prototype.deactivate = function deactivate() {
    console.log('rover deactivate');
    this.led.off();
    this.stop();
};

module.exports = Rover;