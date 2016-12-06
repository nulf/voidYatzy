/* ANVÄND DENNA FÖR ATT UNDVIKA POPUP RUTA */
var DEMO = true;

/* Global Variables
=================================== */
var users=[], dices = [0, 0, 0, 0, 0], scores;

if(DEMO) {
	users = [{"name":"Pontus"},{"name":"Linn"},{"name":"Sandra"},{"name":"Ulf"},{"name":"Christoffer"}]
}

/* ScoreNames to the table.
===================================*/
var scoreName = ["Ettor","Tvår","Treor","Fyror","Femmor","Sexor","Summa","Bonus (50)","Par","Tvåpar","Triss","Fyrtal","Kåk","Liten stege","Stor stege","Yatzy","Chans","Summa"];

/* Render scoreTable
===================================*/
function renderScoreTable() {
	
	var TablePlayers = $('<table class="table table-condensed" id="scoreTbl"><tr><th style="width: 100px;">Spelare</th>')
	for( var i = 0 ; i < users.length ; i++ ) {
		// if more than 4 players and usernames are long, shorten it
		if(users.length > 3 && users[i].name.length > 7) {
			var PlayerName = users[i].name.substr(0,8)+'..';
		} else {
			var PlayerName = users[i].name;
		}
		$(TablePlayers).find("tr").append('<th style="text-align: center;">'+ PlayerName +'</th>');
	}

	for( var i = 0 ; i < scoreName.length ; i++ ) {
		if(i == 5 || i == 6 || i == 7 || i == 16) {
			var borderStyle = 'style="border-bottom: 3px solid #000;"';
		} else {
			var borderStyle = '';
		}
		var newRow = $('<tr data-value="'+ i +'"'+borderStyle+'><th>'+ scoreName[i] +'</th>');
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

	if(DEMO) {
		$(".myModal").modal({
			backdrop: "static",
			show: false
		})
		renderScoreTable()
	} else {
		// Autoshow modal on load
		$(".myModal").modal({
			backdrop: "static",
			show: true
		})
	}
	


	/* enter player name and show as list
	==================================*/

	$(document).on("click",".btn-addPlayer",function showData(){
		if(users.length == 5){
			return;
		}
		var pName=$(".form-control").val();
		$("ol").append('<li>'+pName+'</li>');
		$('.form-control').val('');

		users.push(new Player(pName,users.length))
		console.log(users);
	});

	$('.form-control').keypress(function(e){
		var key= e.which;
		if (key == 13) {
			$('.btn-addPlayer').click();
		}
	})

	


	/* remove players from list
	==================================*/
	$(document).on("click",".btn-default",function(){
		users.pop();
		$("li:last").remove();
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