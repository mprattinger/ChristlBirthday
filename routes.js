"use strict";

const express = require("express");
const winston = require("winston");

class Routes {

    constructor() {
        this.router = express.Router();
        this._createRoutes();
    }

    _createRoutes() {
        var that = this;

        that.router.route("/shuffle")
            .get((req, res) => {

            })
            .post((req, res) => {
                //Shuffling the stuff
                winston.debug("Shuffling....")
                res.status(200);
                res.send("ok");
            })
            .put((req, res) => {
                //Update
            })
            .delete((req, res) => {
                //Delete
            });
        that.router.route("/setanswer")
            .post((req, res) => {
                var data = req.body;
                winston.debug("Setting answer to " + data.answer);
                res.status(200);
                res.send("ok");
            });
            that.router.route("/mananswer")
            .post((req, res) => {
                var data = req.body;
                winston.debug("Activating manual answer " + data.answer + " and stopping shuffle...");
                res.status(200);
                res.send("ok");
            });
    }
}

module.exports = Routes;