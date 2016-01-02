(function () {
    module.exports = function RemoteControlSocket(socket, rover) {
        console.log('initializing remote control');
        
        this.socket = socket;
        
        this.socket.on('forward', function () {
            console.log('user request forward');
            rover.forward();
        });
        
        this.socket.on('backward', function () {
            console.log('user request backward');
            rover.backward();
        });
        
        this.socket.on('right', function () {
            console.log('user request right');
            rover.right();
        });
        
        this.socket.on('left', function () {
            console.log('user request left');
            rover.left();
        });
        
        this.socket.on('stop', function () {
            console.log('user request stop');
            rover.stop();
        });
        
        this.socket.on('honk', function () {
            console.log('user request honk');
            rover.honk();
        });

        this.socket.on('disconnect', function(){
            console.log('user disconnected');
            rover.deactivate();
        });
    };
})();