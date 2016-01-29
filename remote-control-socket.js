module.exports = function initRemoteControlSocket(wss, rover) {        
    console.log('initializing socket remote control');

    wss.on('connection', function(socket){
        console.log('user connected');
        
        var activeConnection = true,
            waitingForHeartbeat = false,
            commands = {
                forward: rover.forward.bind(rover),
                backward: rover.backward.bind(rover),
                right: rover.right.bind(rover),
                left: rover.left.bind(rover),
                stop: rover.stop.bind(rover),
                honk: rover.honk.bind(rover),
                deactivate: rover.deactivate.bind(rover),
                heartbeat: function heartbeat() {
                    if(!activeConnection) {
                        console.log('heartbeat from rover dectected');
                        activeConnection = true;
                        rover.activate();
                    }
                    waitingForHeartbeat = false;
                }
            };
        
        rover.activate();

        socket.on('message', function (message) {
            console.log('user request ' + message);
            commands[message]();
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