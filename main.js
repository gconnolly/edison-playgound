var five = require("johnny-five"),
    Edison = require("edison-io"),
    board = new five.Board({
        io: new Edison()
    }),
    express = require("express"),
    Rover = require("rover"),
    RoverLogger = require("roer-logger"),
    RemoteControlWebServer = require("./remote-control-web-server"),
    webServer = express(),
    remoteControl;


webServer.listen(3000);
board.on("ready", function() {
    remoteControl = new RemoteControlWebServer(webServer, new RoverLogger(board));
});
