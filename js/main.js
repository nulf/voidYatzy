/* Global Variables
=================================== */
var users, dices = [0, 0, 0, 0, 0], scores;

/* ScoreNames to the table.
===================================*/
var scoreName = ["Ettor","Tvår","Treor","Fyror","Femmor","Sexor","Summa","Bonus (50)","Par","Tvåpar","Triss","Fyrtal","Kåk","Liten stege","Stor stege","Yatzy","Chans","Summa"];

/* Render scoreTable
===================================*/
function renderScoreTable() {
	// Example users just to see if the render works
	users = ["Pontus","Ulf","Linda","Sandra","Chrsitoffer"];
	
	var TablePlayers = $("<table id='scoreTbl'><tr><th>Spelare</th>")
	for( var i = 0 ; i < users.length ; i++ ) {
		$(TablePlayers).find("tr").append('<th>'+ users[i] +'</th>');
	}

	for( var i = 0 ; i < scoreName.length ; i++ ) {
		var newRow = $('<tr data-value="'+ i +'"><td>'+ scoreName[i] +'</td>');
		for( j = 0 ; j < users.length ; j++ ) {
			newRow.append('<td></td>');
		}
		TablePlayers.append(newRow);
	};
	$(TablePlayers).append('</tr></table>');


	$(".scoreTable").append(TablePlayers);

}

// Change later, just for debug atm
// This function will check if the table(i,j) is correct and returns the score
// if something is not correct the fuction will return -1;
function checkTableDice(row, column){
    var score = 0;

    switch(row){
        case 1:
            for(var i=0; i < dices.length; i++) if(dices[i] === 1) score += 1;
            break;
        case 2:
            for(var i=0; i < dices.length; i++) if(dices[i] === 2) score += 2; 
            break;
        case 3:
            for(var i=0; i < dices.length; i++) if(dices[i] === 3) score += 3; 
            break;
        case 4:
            for(var i=0; i < dices.length; i++) if(dices[i] === 4) score += 4; 
            break;
        case 5:
            for(var i=0; i < dices.length; i++) if(dices[i] === 5) score += 5; 
            break;
        case 6:
            for(var i=0; i < dices.length; i++) if(dices[i] === 6) score += 6;
            break;
        case 9: // Par
		    var values = [0,0,0,0,0,0]; // Temp array to hold 6 numbers
		    var par1 = 0; // variable for pair number 1
		    var par2 = 0; // variable for pair number

            // Count all numbers
		    for (var i = 0; i < 5; i++){
                switch(dices[i]){
                    case 1: values[0]++; break;
                    case 2: values[1]++; break;
                    case 3: values[2]++; break;
                    case 4: values[3]++; break;
                    case 5: values[4]++; break;
                    case 6: values[5]++; break;
		          }
                }

                // Check for pairs
                for (var i = 0; i < 6; i++){
                    if(values[i] > 1){
                        if(par1 > 0) par2 = 2*(i + 1);
                else par1 = 2*(i + 1);
                }
                }

                    // Compare the two pairs and take the biggest
                if(par1 > par2 ) score = par1;
                else score = par2;

            break;
        default: score = -1;
            break;
    }



    return score;
}


/* DOM ready
================================*/
$(function() {
	renderScoreTable();

	// Listen for .throw-dice button-click
	$(".throw-dice").click(function() {
		throwDice(dices);
	});

    /*Clickable table
    ================================*/
	$('#scoreTbl tbody tr').on('click', 'td', function () {
	    var Tbl = document.getElementById('scoreTbl');
           
	        for (var i = 0; i < Tbl.rows.length; i++) {
	            for (var j = 0; j < Tbl.rows[i].cells.length; j++) {
	                Tbl.rows[i].cells[j].onclick = (function (i, j) {

	                    return function () {

	                        if ( $(this).html() == "" ) {

	                            var score = checkTableDice(i, j)

	                            if (score !== -1) {
	                                // if we're here: everything is okay and we can change the tablecell HTML to score calc
	                                // Still need to input score to pointTable.json
	                                $(this).html(score);
	                            }
	                        }
	                    }
	                }(i, j));
	            }
	        }
	});
})

function setTime(i, sec) {
	setTimeout(turn(i), sec);
}

function doScaledTimeout(i, ms, diceValue) {
  setTimeout(function() {
    turn(i, diceValue);
  }, ms);
}

// EXAMPLE FOR TURNING DICES 
function turn(num, diceValue) {
	switch(diceValue) {
		case 1:
			$("[data-type=dice"+num+"]").removeClass();
			$("[data-type=dice"+num+"]").addClass('dice show-front');
			$("[data-type=dice"+num+"]").removeAttr("style");
		break;
		case 2:
			$("[data-type=dice"+num+"]").removeClass();
			$("[data-type=dice"+num+"]").addClass('dice show-back');
			$("[data-type=dice"+num+"]").removeAttr("style");
		break;
		case 3:
			$("[data-type=dice"+num+"]").removeClass();
			$("[data-type=dice"+num+"]").addClass('dice show-right');
			$("[data-type=dice"+num+"]").removeAttr("style");
		break;
		case 4:
			$("[data-type=dice"+num+"]").removeClass();
			$("[data-type=dice"+num+"]").addClass('dice show-left');
			$("[data-type=dice"+num+"]").removeAttr("style");
		break;
		case 5:
			$("[data-type=dice"+num+"]").removeClass();
			$("[data-type=dice"+num+"]").addClass('dice show-top');
			$("[data-type=dice"+num+"]").removeAttr("style");
		break;
		case 6:
			$("[data-type=dice"+num+"]").removeClass();
			$("[data-type=dice"+num+"]").addClass('dice show-bottom');
			$("[data-type=dice"+num+"]").removeAttr("style");
		break;
	}
}

// throwDice function, accepting one array as input(which shows locked dices as well)
// Randomizing new value for dices that arent locked
function throwDice(dices) {

	// Loop through each item in "dices", if it's a number give it a random value(1-6)
	dices.forEach(function(dice, index) {
		if(typeof dice === 'number') { 
			dices[index] = random = Math.floor(Math.random() * 6) + 1;
			var ran = Math.round(Math.random()*20) / 10 + 2;
			$("[data-type=dice" + index + "]").attr("style", "animation: spin " + ran + "s 1 linear;")
			doScaledTimeout(index, Math.floor(ran * 1001), random);
		}
	});
}