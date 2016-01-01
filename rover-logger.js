(function () {
    var la_cucaracha = '- - C C - C C - C C - F F F F - A A A A - -',
        RoverLogger = function RoverLogger() {
        };

    RoverLogger.prototype.forward = function forward() {
        console.log('forward');
    };

    RoverLogger.prototype.backward = function backward() {
        console.log('backward');
    };

    RoverLogger.prototype.right = function right() {
        console.log('right');
    };

    RoverLogger.prototype.left = function left() {
        console.log('left');
    };

    RoverLogger.prototype.stop = function stop() {
        console.log('stop');
    };

    RoverLogger.prototype.honk = function honk() {
        console.log('honk: ' + la_cucaracha);
    };
    
    module.exports = RoverLogger;
})();