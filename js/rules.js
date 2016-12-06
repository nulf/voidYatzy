
// Change later, just for debug atm
// This function will check if the table(i,j) is correct and returns the score
// if something is not correct the fuction will return -1;
function checkTableDice(row, column) {
    var score = 0;

    switch (row) {
        case 1:
            for (var i = 0; i < dices.length; i++) if (dices[i] === 1) score += 1;
            break;
        case 2:
            for (var i = 0; i < dices.length; i++) if (dices[i] === 2) score += 2;
            break;
        case 3:
            for (var i = 0; i < dices.length; i++) if (dices[i] === 3) score += 3;
            break;
        case 4:
            for (var i = 0; i < dices.length; i++) if (dices[i] === 4) score += 4;
            break;
        case 5:
            for (var i = 0; i < dices.length; i++) if (dices[i] === 5) score += 5;
            break;
        case 6:
            for (var i = 0; i < dices.length; i++) if (dices[i] === 6) score += 6;
            break;
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
}