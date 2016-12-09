/* ANVÄND DENNA FÖR ATT UNDVIKA POPUP RUTA */
var DEMO = true;

/* Global Variables
=================================== */
var users=[], dices = [0, 0, 0, 0, 0], dicesToRoll = [1, 1, 1, 1, 1] , scores, activePlayer, timesThrown = 0;

if(DEMO) {
    var DemoUsers = ["Pontus","Linn","Sandra","Ulf","Christoffer"];
    DemoUsers.forEach(function(name, i) {
    	users.push(new Player(name,i))
    })
    activePlayer = 0;
}

function restart(){
    dices = [0, 0, 0, 0, 0];
    users=[];
    $(".scoreTable").html('');
    $(".myModal").modal("show");
    $("ol").html('');
}

/* ScoreNames to the table.
===================================*/
var scoreName = ["Ettor","Tvår","Treor","Fyror","Femmor","Sexor","Summa","Bonus (50)","Par","Tvåpar","Triss","Fyrtal","Kåk","Liten stege","Stor stege","Chans","Yatzy","Summa"];

/* Render scoreTable
===================================*/
function renderScoreTable() {
	var PlayerName, PlayerNow;
	$(".scoreTable").html('');
	var TablePlayers = $('<table class="table table-condensed" id="scoreTbl"><tr><th style="width: 100px;">Spelare</th>')
	for( var i = 0 ; i < users.length ; i++ ) {
		// if more than 4 players and usernames are long, shorten it
		if( users[i].name.length > 5) {
			PlayerName = users[i].name.substr(0,5)+'..';
		} else {
			PlayerName = users[i].name;
		}
		if(i == activePlayer) {
			PlayerNow = "background-color: #ccc;";
		} else {
			PlayerNow = "";
		}
		$(TablePlayers).find("tr").append('<th style="text-align: center; '+PlayerNow+'">'+ PlayerName +'</th>');
	}

	for( var i = 0 ; i < scoreName.length ; i++ ) {
		if(i == 5 || i == 6 || i == 7 || i == 16) {
			var borderStyle = 'style="border-bottom: 3px solid #000;"';
		} else {
			var borderStyle = '';
		}
		var newRow = $('<tr data-value="'+ i +'"'+borderStyle+'><th>'+ scoreName[i] +'</th>');
		for( j = 0 ; j < users.length ; j++ ) {
			newRow.append('<td data-user="'+users[j].id+'" data-scorename="'+ i +'">'+users[j].score[i]+'</td>');
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
		if (! window.activeTimers() && timesThrown < 3) {
			throwDice(dicesToRoll);
			timesThrown += 1;
			$(this).text("Kasta tärning (" + timesThrown + " av 3 kast.)");
		}
	});
     
    // Lokalisera vilken rad och column som klickas (lås activecolumn till activePlayer)
	$(document).on('click', 'td', function () {

	    var player = $(this).data('user');
	    var scorename = $(this).data('scorename');

	    console.log("LOG this:", player, scorename);
	    if(player == activePlayer)
	    	newRound();

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

	$(".myModal").modal({
		backdrop: "static",
		show: false
	})

	    $(".bs-example-modal-sm").modal({
        backdrop: "static",
        show: false
    })



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
	$(document).on("click",".btn-RemovePlayer",function(){
		users.pop();
		$("li:last").remove();
	});

	/* Start round
	==========================*/
	$(".btn-StartGame").click(function() {
		if(users.length > 0)
			$(".myModal").modal("toggle");
			newRound();
	});

/* Lås Tärningar
===============================*/
	$("body").on("click",".hold", function() {
		var diceToMove = $(this);
		var diceNumber = diceToMove.children('div').data("type").substr(4);

		var fullt = 0;
		if((diceToMove.data("locked") === "" || diceToMove.data("locked") == undefined) && timesThrown > 0) {
			$(".savePoint").each(function(i) {
				if( $(this).data("locked") == undefined || $(this).data("locked") === "") {
					freeSavePoint = i;
					$(this).data("locked",diceNumber);
					return false;
				}
				freeSavePoint = false;
				fullt++
			});
		} else {
			freeSavePoint = false;
		}

		if($(this).is(":animated") || fullt == 4 || timesThrown <= 0) {
			return;
		}

		$(".throw-dice").attr("disabled","disabled");

		if(freeSavePoint === false) {
			lockedPos = $(this).data("locked");
			freeSavePoint = lockedPos;
		}
		var savePoint = $(".savePoint").eq(freeSavePoint);
		if($(this).data("locked") === "" || $(this).data("locked") == undefined) {
			$(this).data("locked",freeSavePoint)
			diceToMove.css({
				'opacity': '0.5',
				'z-index': '999'
			})
			.animate({
				'top': savePoint.offset().top - diceToMove.offset().top,
				'left': savePoint.offset().left - diceToMove.offset().left,
				'opacity': '1'
			}, 500, function() {
				dicesToRoll[diceNumber] = 0;
				if(!$(":animated").length) {
					$(".throw-dice").removeAttr('disabled')
				}
			})
			return;
		}
		diceToMove.css({
				'opacity': '0.5',
				'z-index': '999'
			})
			.animate({
				'top': 0,
				'left': 0,
				'opacity': '1'
			}, 500, function() {
				lockpos = diceToMove.data("locked")
				$(".savePoint").eq(lockpos).data("locked","")
				diceToMove.data("locked","")
				dicesToRoll[diceNumber] = 1;
				if(!$(":animated").length) {
					$(".throw-dice").removeAttr('disabled')
				}
			})
	})
})


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
function throwDice(dicesToRoll) {

	// Loop through each item in "dices", if it's a number give it a random value(1-6)
	dicesToRoll.forEach(function(diceToRoll, index) {
		if(diceToRoll) { 
			dices[index] = random = Math.floor(Math.random() * 6) + 1;
			var ran = Math.round(Math.random()*20) / 10 + 2;
			$("[data-type=dice" + index + "]").attr("style", "animation: spin " + ran + "s 1 linear;")
			doScaledTimeout(index, Math.floor(ran * 1001), random);
		}
	});
}

function newRound() {
	dices = [0,0,0,0,0];
	dicesToRoll = [1, 1, 1, 1, 1]
	timesThrown = 0;
	$(".throw-dice").html("Kasta tärning (0 av 3 kast.)")

	// Animate back the dices to there position
	$(".hold").each(function() {
		$(this).css({
			'opacity': '0.5',
			'z-index': '999'
		})
		.animate({
			'top': 0,
			'left': 0,
			'opacity': '1'
		}, 500);
		$(this).data("locked","");

	})
	// Remove locked data from savePoints
	$(".savePoint").each(function() {
		$(this).data("locked","");
	})

	if (activePlayer === users.length -1 || activePlayer == undefined)
	{
		activePlayer = 0;
	}
	else
	{
		activePlayer++;
	}

	renderScoreTable();
}