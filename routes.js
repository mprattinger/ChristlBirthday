"use strict";

const express = require("express");
const winston = require("winston");
const Answer = require("./hardware/answer");

class Routes {

    constructor() {
        this.router = express.Router();
        this._createRoutes();
        this.answer = new Answer();
    }

    _createRoutes() {
        var that = this;

        that.router.route("/shuffle")
            .post(async (req, res) => {
                //Shuffling the stuff
                winston.debug("Shuffling....")
                that.answer.shuffle();
                res.status(200);
                res.send("ok");
            })
        that.router.route("/setanswer")
            .post(async (req, res) => {
                var data = req.body;
                winston.debug("Setting answer to " + data.answer);
                that.answer.shuffleOff(()=> {
                    that.answer.switchAnswer(data.answer, "white", true);
                    res.status(200);
                    res.send("ok");
                });
            });
            that.router.route("/mananswer")
            .post((req, res) => {
                var data = req.body;
                winston.debug("Activating manual answer " + data.answer + " and stopping shuffle...");
                that.answer.switchAnswer(data.answer, "white", true);
                res.status(200);
                res.send("ok");
            });
    }
}

module.exports = Routes;