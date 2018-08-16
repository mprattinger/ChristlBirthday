"use strict";

function Message(msg) {
    var self = this;
    self.msg = msg;
}

function PartyGameViewModel() {
    var self = this;
    this.isShuffling = ko.observable(false);
    this.currentAnswer = ko.observable(-1);

    self.messages = ko.observableArray([])


    self.shuffle = function () {
        console.log("Sending schuffle to server...")
        $.post("/api/shuffle").done(
                function (result) {
                    self.messages.push(new Message("Shuffling...."));
                    self.isShuffling(true);
                    self.currentAnswer(-1);
                })
            .fail(function () {
                console.log("Error sending shuffle!");
                self.messages.push(new Message("Error sending shuffle!"));
            });
    }

    self.setAnswer = function (answer) {
        self.currentAnswer(answer);
        self.messages.push(new Message("Current answer is " + self.currentAnswer()));
    }

    self.sendAnswer = function () {
        console.log("Sending current answer " + self.currentAnswer() + " to the server!")
        $.post("/api/setanswer", { "answer": self.currentAnswer() }).done(
                function (result) {
                    self.messages.push(new Message("Sent answer " + self.currentAnswer() + " to the server!"));
                    self.isShuffling(false);
                    self.currentAnswer(-1);
                })
            .fail(function () {
                console.log("Error sending answer!");
                self.messages.push(new Message("Error sending answer!"));
            });
    }

    self.setAnswerManuell = function (answer) {
        console.log("Sending current answer " + answer + " to the server!")
        $.post("/api/mananswer", { "answer": answer }).done(
                function (result) {
                    self.messages.push(new Message("Sent manual answer " + answer + " to the server!"));
                    self.isShuffling(false);
                    self.currentAnswer(-1);
                })
            .fail(function () {
                console.log("Error sending manual answer!");
                self.messages.push(new Message("Error sending manual answer!"));
            });
    }

    self.sendAnswerEnable = ko.computed(function(){
        if(self.isShuffling && self.currentAnswer() > 0) return true;
        else return false;
    });
}

ko.applyBindings(new PartyGameViewModel());