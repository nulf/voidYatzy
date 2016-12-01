/* Global Variables
=================================== */
var users, dices = [], scores;

/* ScoreNames to the table.
===================================*/
var scoreName = ["Ettor","Tvår","Treor","Fyror","Femmor","Sexor","Summa","Bonus (50)","Par","Tvåpar","Triss","Fyrtal","Kåk","Liten stege","Stor stege","Yatzy","Chans","Summa"];

/* Render scoreTable
===================================*/
function renderScoreTable() {
	// Example users just to see if the render works
	users = ["Pontus","Ulf","Linda","Sandra","Chrsitoffer"];
	
	var TablePlayers = $("<table><tr><th>Spelare</th>")
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

/* DOM ready
================================*/
$(function() {
	renderScoreTable();

	$("button").click(function() {
		for( i = 0; i < 5 ; i++ ) {
			var ran = Math.round(Math.random()*20) / 10 + 2;
			$("[data-type=dice"+i+"]").attr("style","animation: spin "+ran+"s 1 linear;")
			doScaledTimeout(i,Math.floor(ran*1001));
		}
	});
})

function setTime(i, sec) {
	setTimeout(turn(i), sec);
}

function doScaledTimeout(i,ms) {
  setTimeout(function() {
    turn(i);
  }, ms);
}

// EXAMPLE FOR TURNING DICES 
function turn(num) {
	random = Math.floor(Math.random()*6)+1;
	switch(random) {
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

// throwDice function, accepting one array as input(wich shows locked dices as well)
// Randomizing new value for dices that arent locked
function throwDice(dices) {

	// Loop through each item in "dices", if it's a number give it a random value(1-6)
	dices.forEach(function(dice, index) {
		if(typeof dice === 'number') dices[index] = Math.floor(Math.random() * 6) + 1;
	});
}