var five = require("johnny-five"),
    Edison = require("edison-io"),
    board = new five.Board({
        io: new Edison()
    }),
    app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    Rover = require("./rover"),
    RoverLogger = require("./rover-logger"),
    RemoteControlExpress = require("./remote-control-express"),
    RemoteControlSocket = require("./remote-control-socket"),
    rover,
    remoteControl;

app.use(require("express").static('public'));
http.listen(3000);

board.on("ready", function onReady() {
    console.log('device is ready');
    rover = new Rover(board);
    
    io.on('connection', function(socket){
        var activeConnection = true,
            waitingForHeartbeat = false;
        console.log('a user connected');
        remoteControl = new RemoteControlSocket(socket, rover);
        
        socket.on('heartbeat', function () {
            if(!activeConnection) {
                console.log('activate rover');
                activeConnection = true;
            }
            waitingForHeartbeat = false;
        });
        
        setInterval(function () {
            if(waitingForHeartbeat && activeConnection) {
                console.log('deactivate rover');
                activeConnection = false;
                rover.stop();
            }
            waitingForHeartbeat = true;
        }, 2000);
    });
    
    remoteControl = new RemoteControlExpress(app, rover);
});  



