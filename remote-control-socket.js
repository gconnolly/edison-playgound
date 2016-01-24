module.exports = function initRemoteControlSocket(wss, rover) {        
    console.log('initializing socket remote control');

    wss.on('connection', function(socket){
        console.log('user connected');
        
        var activeConnection = true,
            waitingForHeartbeat = false;
        
        rover.activate();

        socket.on('message', function (message) {
            console.log('user request ' + message);
            switch(message) {
                case 'forward':
                    rover.forward();
                    break;
                case 'backward':
                    rover.backward();
                    break;
                case 'right':
                    rover.right();
                    break;
                case 'left':
                    rover.left();
                    break;
                case 'stop':
                    rover.stop();
                    break;
                case 'honk':
                    rover.honk();
                    break;
                case 'disconnect':
                    rover.deactivate();
                    break;
                case 'heartbeat':
                    if(!activeConnection) {
                        console.log('heartbeat from rover dectected');
                        activeConnection = true;
                        rover.activate();
                    }
                    waitingForHeartbeat = false;
                    break;
                default:
            }
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