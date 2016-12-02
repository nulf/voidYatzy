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
})


// EXAMPLE FOR TURNING DICES 
function turn() {
	random = Math.floor(Math.random()*6)+1;
	switch(random) {
		case 1:
			$("[data-type=dice]").removeClass();
			$("[data-type=dice]").addClass('dice show-front');
		break;
		case 2:
			$("[data-type=dice]").removeClass();
			$("[data-type=dice]").addClass('dice show-back');
		break;
		case 3:
			$("[data-type=dice]").removeClass();
			$("[data-type=dice]").addClass('dice show-right');
		break;
		case 4:
			$("[data-type=dice]").removeClass();
			$("[data-type=dice]").addClass('dice show-left');
		break;
		case 5:
			$("[data-type=dice]").removeClass();
			$("[data-type=dice]").addClass('dice show-top');
		break;
		case 6:
			$("[data-type=dice]").removeClass();
			$("[data-type=dice]").addClass('dice show-bottom');
		break;
	}
}

// throwDice function, accepting one array as input(which shows locked dices as well)
// Randomizing new value for dices that arent locked
function throwDice(dices) {

	// Loop through each item in "dices", if it's a number give it a random value(1-6)
	dices.forEach(function(dice, index) {
		if(typeof dice === 'number') dices[index] = Math.floor(Math.random() * 6) + 1;
	});
}