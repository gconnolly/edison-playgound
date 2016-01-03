module.exports = function initRemoteControlExpress(expressWebServer, rover) {
    console.log('initializing http remote control');

    expressWebServer.post('/forward', function(sReq, sRes){
        rover.forward();
        sRes.end();
    });

    expressWebServer.post('/backward', function(sReq, sRes){
        rover.backward();
        sRes.end();
    });

    expressWebServer.post('/right', function(sReq, sRes){
        rover.right();
        sRes.end();
    });

    expressWebServer.post('/left', function(sReq, sRes){
        rover.left();
        sRes.end();
    });

    expressWebServer.post('/stop', function(sReq, sRes){
        rover.stop();
        sRes.end();
    });

    expressWebServer.post('/honk', function(sReq, sRes){
        rover.honk();
        sRes.end();
    });
};