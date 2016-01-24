module.exports = function initRemoteControlSocket(wss, rover) {        
    console.log('initializing socket remote control');

    wss.on('connection', function(socket){
        console.log('user connected');
        
        var activeConnection = true,
            waitingForHeartbeat = false;
        
        rover.activate();

        socket.on('forward', function () {
            console.log('user request forward');
            rover.forward();
        });
        
        socket.on('backward', function () {
            console.log('user request backward');
            rover.backward();
        });
        
        socket.on('right', function () {
            console.log('user request right');
            rover.right();
        });
        
        socket.on('left', function () {
            console.log('user request left');
            rover.left();
        });
        
        socket.on('stop', function () {
            console.log('user request stop');
            rover.stop();
        });
        
        socket.on('honk', function () {
            console.log('user request honk');
            rover.honk();
        });

        socket.on('disconnect', function(){
            console.log('user disconnected');
            rover.deactivate();
        });
        
        socket.on('heartbeat', function () {
            if(!activeConnection) {
                console.log('heartbeat from rover dectected');
                activeConnection = true;
                rover.activate();
            }
            waitingForHeartbeat = false;
        });
        
        setInterval(function () {
            if(waitingForHeartbeat && activeConnection) {
                console.log('heartbeat from rover lost');
                activeConnection = false;
                rover.deactivate();
            }
            waitingForHeartbeat = true;
        }, 2000);
    });
};