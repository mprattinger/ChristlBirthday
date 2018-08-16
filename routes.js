'use strict';

const express = require('express');
const winston = require('winston');
const Answer = require('./hardware/answer');

class Routes {
  constructor() {
    this.router = express.Router();
    this._createRoutes();
    this.answer = new Answer();
  }

  _createRoutes() {
    var that = this;

    that.router.route('/shuffle').post(async (req, res) => {
      //Shuffling the stuff
      winston.debug('Shuffling....');
      that.answer.shuffle();
      res.status(200);
      res.send('ok');
    });
    that.router.route('/setanswer').post(async (req, res) => {
      var data = req.body;
      winston.debug('Setting answer to ' + data.answer);
      that.answer.shuffleOff(() => {
        that.answer.switchAnswer(data.answer, 'white', true);
        res.status(200);
        res.send('ok');
      });
    });
    that.router.route('/mananswer').post((req, res) => {
      var data = req.body;
      winston.debug('Activating manual answer ' + data.answer + ' and stopping shuffle...');
      that.answer.switchAnswer(data.answer, 'white', true);
      res.status(200);
      res.send('ok');
    });
    that.router.route('/alloff').post((req, res) => {
      winston.debug('All off...');
      if (that.answer.isShuffling) {
        that.answer.shuffleOff(() => {
          that.answer.switchAnswer(1, 'white', false);
          that.answer.switchAnswer(2, 'white', false);
          that.answer.switchAnswer(3, 'white', false);
          res.status(200);
          res.send('ok');
        });
      } else {
        that.answer.switchAnswer(1, 'white', false);
        that.answer.switchAnswer(2, 'white', false);
        that.answer.switchAnswer(3, 'white', false);
        res.status(200);
        res.send('ok');
      }
    });
  }
}

module.exports = Routes;
