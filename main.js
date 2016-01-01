var five = require("johnny-five"),
    Edison = require("edison-io"),
    board = new five.Board({
        io: new Edison()
    }),
    express = require("express"),
    webServer = express(),
    Rover = require("./rover"),
    RoverLogger = require("./rover-logger"),
    RemoteControlWebServer = require("./remote-control-web-server"),
    rover,
    remoteControl;


webServer.listen(3000);
board.on("ready", function onReady() {
    rover = new RoverLogger(board);
    remoteControl = new RemoteControlWebServer(webServer, rover);
});
