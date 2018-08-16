"use strict";

const winston = require("winston");
const os = require("os");

var onoff = null;
if (os.platform() == "linux") {
    onoff = require("onoff").Gpio;
} else {
    onoff = require("./mocks/onoffMock");
}

class Answer {

    constructor() {
        this.answer1_red = new onoff(8, "out");
        this.answer1_green = new onoff(9, "out");
        this.answer1_blue = new onoff(7, "out");

        this.answer2_red = new onoff(0, "out");
        this.answer2_green = new onoff(2, "out");
        this.answer2_blue = new onoff(3, "out");

        this.answer3_red = new onoff(23, "out");
        this.answer3_green = new onoff(24, "out");
        this.answer3_blue = new onoff(25, "out");

        this.shuffle = false;
    }

    shuffle() {
        this.shuffle = true;
        while (this.shuffle) {

        }
    }

    switchAnswer(answer, color, on) {

        var self = this;
        if (typeof color === 'undefined') {
            color = 'white';
        }

        switch (color) {
            case "white":
                self["answer" + answer + "_red"].writeSync(on ? 1 : 0);
                self["answer" + answer + "_green"].writeSync(on ? 1 : 0);
                self["answer" + answer + "_blue"].writeSync(on ? 1 : 0);
            case "red":
                self.answer1_red.writeSync(on ? 1 : 0);
                self.answer1_green.writeSync(0);
                self.answer1_blue.writeSync(0);
            case "green":
                self.answer1_red.writeSync(0);
                self.answer1_green.writeSync(on ? 1 : 0);
                self.answer1_blue.writeSync(0);
            case "blue":
                self.answer1_red.writeSync(0);
                self.answer1_green.writeSync(0);
                self.answer1_blue.writeSync(on ? 1 : 0);
        }
    }

    // switchAnswer(answer, color, on) {
    //     var self = this;
    //     if (typeof color === 'undefined') {
    //         color = 'white';
    //     }

    //     switch (answer) {
    //         case 1:
    //             switchAnswer1(color, on);
    //             break;
    //         case 2:
    //             switchAnswer2(color, on);
    //             break;
    //         case 3:
    //             switchAnswer3(color, on);
    //             break;
    //     }

    // }

    switchAnswer1(color, on) {
        var self = this;
        switch (color) {
            case "white":
                self.answer1_red.writeSync(on ? 1 : 0);
                self.answer1_green.writeSync(on ? 1 : 0);
                self.answer1_blue.writeSync(on ? 1 : 0);
            case "red":
                self.answer1_red.writeSync(on ? 1 : 0);
                self.answer1_green.writeSync(0);
                self.answer1_blue.writeSync(0);
            case "green":
                self.answer1_red.writeSync(0);
                self.answer1_green.writeSync(on ? 1 : 0);
                self.answer1_blue.writeSync(0);
            case "blue":
                self.answer1_red.writeSync(0);
                self.answer1_green.writeSync(0);
                self.answer1_blue.writeSync(on ? 1 : 0);
        }
    }

    switchAnswer2(color, on) {
        var self = this;
        switch (color) {
            case "white":
                self.answer2_red.writeSync(on ? 1 : 0);
                self.answer2_green.writeSync(on ? 1 : 0);
                self.answer2_blue.writeSync(on ? 1 : 0);
            case "red":
                self.answer2_red.writeSync(on ? 1 : 0);
                self.answer2_green.writeSync(0);
                self.answer2_blue.writeSync(0);
            case "green":
                self.answer2_red.writeSync(0);
                self.answer2_green.writeSync(on ? 1 : 0);
                self.answer2_blue.writeSync(0);
            case "blue":
                self.answer2_red.writeSync(0);
                self.answer2_green.writeSync(0);
                self.answer2_blue.writeSync(on ? 1 : 0);
        }
    }

    switchAnswer3(color, on) {
        var self = this;
        switch (color) {
            case "white":
                self.answer3_red.writeSync(on ? 1 : 0);
                self.answer3_green.writeSync(on ? 1 : 0);
                self.answer3_blue.writeSync(on ? 1 : 0);
            case "red":
                self.answer3_red.writeSync(on ? 1 : 0);
                self.answer3_green.writeSync(0);
                self.answer3_blue.writeSync(0);
            case "green":
                self.answer3_red.writeSync(0);
                self.answer3_green.writeSync(on ? 1 : 0);
                self.answer3_blue.writeSync(0);
            case "blue":
                self.answer3_red.writeSync(0);
                self.answer3_green.writeSync(0);
                self.answer3_blue.writeSync(on ? 1 : 0);
        }
    }
}

module.exports = Answer;