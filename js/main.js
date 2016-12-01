


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