(function () {
    var five = require("johnny-five"),
        la_cucaracha = '- - C C - C C - C C - F F F F - A A A A - -',
        Rover = function Rover(board) {
            this.board = board;
            this.rightServo = new five.Servo.Continuous(5);
            this.leftServo = new five.Servo.Continuous(6);
            this.led = new five.Led(13);
            this.piezo = new five.Piezo(3);
        };

    Rover.prototype.forward = function forward() {
        this.rightServo.cw(1);
        this.leftServo.ccw(1);
    };

    Rover.prototype.backward = function backward() {
        this.rightServo.ccw(1);
        this.leftServo.cw(1);
    };

    Rover.prototype.right = function right() {
        this.rightServo.ccw(0.1);
        this.leftServo.ccw(0.1);
    };

    Rover.prototype.left = function left() {
        this.rightServo.cw(0.1);
        this.leftServo.cw(0.1);
    };

    Rover.prototype.stop = function stop() {
        this.rightServo.cw(0);
        this.leftServo.cw(0);
    };

    Rover.prototype.honk = function honk() {
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
        this.led.on();
    };
    
    Rover.prototype.deactivate = function deactivate() {
        this.led.off();
        this.stop();
    };
    
    module.exports = Rover;
})();