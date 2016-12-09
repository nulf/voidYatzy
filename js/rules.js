
// Master rule function lib
var handRules = {
    ones: function (dices) { // Ones
        var cScore = 0; // temp var to hold the score while we count
        for (var i = 0; i < dices.length; i++) {
            if (dices[i] === 1) cScore += 1;
        }
        return (cScore);
    },

    twos: function (dices) { // Twos
    var cScore = 0;
    for (var i = 0; i < dices.length; i++) {
        if (dices[i] === 2) cScore += 2;
    }
    return (cScore);
    },

    threes: function (dices) { // Threes
        var cScore = 0;
        for (var i = 0; i < dices.length; i++) {
            if (dices[i] === 3) cScore += 3;
        }
        return (cScore);
    },

    fours: function (dices) { // Fours
        var cScore = 0;
        for (var i = 0; i < dices.length; i++) {
            if (dices[i] === 4) cScore += 4;
        }
        return (cScore);
    },

    fives: function (dices) { // Fives
        var cScore = 0;
        for (var i = 0; i < dices.length; i++) {
            if (dices[i] === 5) cScore += 5;
        }
        return (cScore);
    },

    sixs: function (dices) { // Sixs
        var cScore = 0;
        for (var i = 0; i < dices.length; i++) {
            if (dices[i] === 6) cScore += 6;
        }
        return (cScore);
    },

    pair: function (dices) {
        var diceArrayCopy = dices;
        diceArrayCopy.sort();
        diceArrayCopy = diceArrayCopy.join("");
        if(sumArray = /(.)\1{1}/.exec(diceArrayCopy)) {
            var sum = sumArray[0];
            pair1 = (Number(sum[0]) + Number(sum[1]));
            diceArrayCopy = diceArrayCopy.replace(sumArray[0], "");
            if(sumArray2 = /(.)\1{1}/.exec(diceArrayCopy)) {
                var sum2 = sumArray2[0];
                pair2 = (Number(sum2[0]) + Number(sum2[1]));
                if(pair1 < pair2) {
                    return pair2;
                }
            }

            return (pair1);
        }
        return 0;
    },

    twoPair: function (dices) {
        var diceArrayCopy = dices;
        diceArrayCopy.sort();
        diceArrayCopy = diceArrayCopy.join("");
        if(sumArray = /(.)\1{1}/.exec(diceArrayCopy)) {
            var sum = sumArray[0];
            pair1 = (Number(sum[0]) + Number(sum[1]));
            diceArrayCopy = diceArrayCopy.replace(sumArray[0], "");
            if(sumArray2 = /(.)\1{1}/.exec(diceArrayCopy)) {
                var sum2 = sumArray2[0];
                pair2 = (Number(sum2[0]) + Number(sum2[1]));
                return Number(pair1) + Number(pair2);
            }
        }
        return 0;
    },

    threeOfAKind: function (dices) {
        var diceArrayCopy = dices;
        diceArrayCopy.sort();
        diceArrayCopy = diceArrayCopy.join("");
        if(sumArray = /(.)\1{2}/.exec(diceArrayCopy)) {
            return (dices[0] + dices[1] + dices[2] + dices[3] + dices[4]);
        }

        return 0;
    },

    fourOfAKind: function (dices) {
        var diceArrayCopy = dices;
        diceArrayCopy.sort();
        diceArrayCopy = diceArrayCopy.join("");
        if(sumArray = /(.)\1{3}/.exec(diceArrayCopy)) {
            return (dices[0] + dices[1] + dices[2] + dices[3] + dices[4]);
        }
        return 0;
    },

    fullHouse: function (dices) {
        var diceArrayCopy = dices;
        diceArrayCopy.sort();
        diceArrayCopy = diceArrayCopy.join("");
        if(sumArray = /(.)\1{2}(.)\2|(.)\3(.)\4{2}/.exec(diceArrayCopy)) {
            return (25);
        }
        return 0;
    },

    smallStraight: function (dices) {
        var diceArrayCopy = dices;
        diceArrayCopy.sort();
        diceArrayCopy = diceArrayCopy.join("");
        if(sumArray = /12345/.exec(diceArrayCopy)) {
            return (15);
        }
        return 0;
    },

    bigStraight: function (dices) {
        var diceArrayCopy = dices;
        diceArrayCopy.sort();
        diceArrayCopy = diceArrayCopy.join("");
        if(sumArray = /23456/.exec(diceArrayCopy)) {
            return (20);
        }
        return 0;
    },

    chance: function (dices) {
        return dices[0] + dices[1] + dices[2] + dices[3] + dices[4];
    },

    yatzy: function (dices) {
        for (var i = 1; i < dices.length; i++) {
            if (dices[0] != dices[i]) {
                return 0;
            }
        }
        return 50;
    }
};