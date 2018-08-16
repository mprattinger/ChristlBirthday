"use strict";

const winston = require("winston");

const logger = require("./logger");
const httpServer = require("./server");

global.rootDir = __dirname;

class Main{

    constructor(){
        logger.configLogger();
    }

    InitApplication(){
        var that = this;
        winston.info("Initializing application....");

        return new Promise(resolve => {
            that.webServer = new httpServer();
            that.socket = null;

            Promise.all([that.webServer.runServer()])
                .then(data => {
                    winston.info("Application initialized! Run socket.io....");
                    resolve();
                })
                .catch(err => {
                    throw err;
                });
        });
    }
}


var main = new Main();

main.InitApplication().then((data) => {
    winston.info("App gestartet");
    // main.RunProgramLoop();
}).catch((err) => {
    winston.error("An error occured when initializing the app", err);
});

process.on('SIGINT', () => {
    main.run = false;
    console.log('\nCTRL+C...');
    process.exit(0);
});
