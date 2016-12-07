
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

    threeOfAKind: function (dices) {
        var diceArrayCopy = dices;
        diceArrayCopy.sort();
        diceArrayCopy = diceArrayCopy.join("");
        if(sumArray = /(.)\1{2}/.exec(diceArrayCopy)) {
            var sum = sumArray[0];
            return (Number(sum[0]) + Number(sum[1]) + Number(sum[2]));
        }

        return 0;
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


/*
function checkTableDice(row, column) {
    var score = 0;
        case 9: // Par, compare and selects the highest par combo to input in the scoretable
            var values = [0, 0, 0, 0, 0, 0]; // Temp array to hold 6 numbers
            var par1 = 0; // variable for pair number 1
            var par2 = 0; // variable for pair number

            // Count all numbers
            for (var i = 0; i < 5; i++) {
                switch (dices[i]) {
                    case 1: values[0]++; break;
                    case 2: values[1]++; break;
                    case 3: values[2]++; break;
                    case 4: values[3]++; break;
                    case 5: values[4]++; break;
                    case 6: values[5]++; break;
                }
            }

            // Check for pairs
            for (var i = 0; i < 6; i++) {
                if (values[i] > 1) {
                    if (par1 > 0) par2 = 2 * (i + 1);
                    else par1 = 2 * (i + 1);
                }
            }

            // Compare the two pairs and take the biggest
            if (par1 > par2) score = par1;
            else score = par2;

            break;
        default: score = -1;
            break;
    }
    return score;
}*/

function threeOfAKind(dices) {
    var diceArrayCopy = dices;
    diceArrayCopy.sort();
    diceArrayCopy = diceArrayCopy.join("");
    if(sumArray = /(.)\1{2}/.exec(diceArrayCopy)) {
        var sum = sumArray[0];
        return (Number(sum[0]) + Number(sum[1]) + Number(sum[2]));
    }
    return 0;
}