'use strict';

const winston = require('winston');
const os = require('os');

var onoff = null;
if (os.platform() == 'linux') {
  onoff = require('onoff').Gpio;
} else {
  onoff = require('./mocks/onoffMock');
}

class Answer {
  constructor() {
    this.answer1_red = new onoff(2, 'out');
    this.answer1_green = new onoff(3, 'out');
    this.answer1_blue = new onoff(4, 'out');

    this.answer2_red = new onoff(17, 'out');
    this.answer2_green = new onoff(27, 'out');
    this.answer2_blue = new onoff(22, 'out');

    this.answer3_red = new onoff(13, 'out');
    this.answer3_green = new onoff(19, 'out');
    this.answer3_blue = new onoff(26, 'out');

    this.isShuffling = false;
  }

  shuffle() {
    return new Promise(async res => {
        var that = this;
        this.isShuffling = true;
        while (that.isShuffling) {
            that.switchAnswer(1, 'white', true);
            that.switchAnswer(2, 'white', true);
            that.switchAnswer(3, 'white', true);
            await that.sleep(500);
            that.switchAnswer(2, 'white', false);
            that.switchAnswer(3, 'white', false);
            await that.sleep(500);
            that.switchAnswer(1, 'white', false);
            that.switchAnswer(2, 'white', true);
            await that.sleep(500);
            that.switchAnswer(2, 'white', false);
            that.switchAnswer(3, 'white', true);
            await that.sleep(500);
            that.switchAnswer(1, 'white', false);
            that.switchAnswer(2, 'white', false);
            that.switchAnswer(3, 'white', false);
            await that.sleep(500);
        }
        that.switchAnswer(1, 'white', false);
        that.switchAnswer(2, 'white', false);
        that.switchAnswer(3, 'white', false);

        res();
    });
  }

  switchAnswer(answer, color, on) {
    var self = this;
    if (typeof color === 'undefined') {
      color = 'white';
    }

    switch (color) {
      case 'white':
        var prop = self['answer' + answer + '_red'];
        self['answer' + answer + '_red'].writeSync(on ? 1 : 0);
        self['answer' + answer + '_green'].writeSync(on ? 1 : 0);
        self['answer' + answer + '_blue'].writeSync(on ? 1 : 0);
        break;
      case 'red':
        self['answer' + answer + '_red'].writeSync(on ? 1 : 0);
        self['answer' + answer + '_green'].writeSync(0);
        self['answer' + answer + '_blue'].writeSync(0);
        break;
        case 'green':
        self['answer' + answer + '_red'].writeSync(0);
        self['answer' + answer + '_green'].writeSync(on ? 1 : 0);
        self['answer' + answer + '_blue'].writeSync(0);
        break;
      case 'blue':
        self['answer' + answer + '_red'].writeSync(0);
        self['answer' + answer + '_green'].writeSync(0);
        self['answer' + answer + '_blue'].writeSync(on ? 1 : 0);
        break;
    }
  }

  sleep(ms) {
    return new Promise(res => {
      setTimeout(res, ms);
    });
  }
}

module.exports = Answer;
