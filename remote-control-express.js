(function () {
    module.exports = function RemoteControlExpress(expressWebServer, rover) {
        this.expressWebServer = expressWebServer;
        
        this.expressWebServer.post('/forward', function(sReq, sRes){
            rover.forward();
            sRes.end();
        });

        this.expressWebServer.post('/backward', function(sReq, sRes){
            rover.backward();
            sRes.end();
        });

        this.expressWebServer.post('/right', function(sReq, sRes){
            rover.right();
            sRes.end();
        });

        this.expressWebServer.post('/left', function(sReq, sRes){
            rover.left();
            sRes.end();
        });

        this.expressWebServer.post('/stop', function(sReq, sRes){
            rover.stop();
            sRes.end();
        });

        this.expressWebServer.post('/honk', function(sReq, sRes){
            rover.honk();
            sRes.end();
        });
    };
})();