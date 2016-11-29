// initialize some variables
var suits = [ // all suits
      'hearts',
      'spades',
      'diamonds',
      'clubs'
    ],
    cards = [], // all cards
    removedCards = []; // all removed cards

// create all cards by looping all suits
for (var i = 0; i < suits.length; i++) {
  // console.log("suit no " + i + " is: " + suits[i]);
  // and looping a total of 13 times
  for (var j = 1; j < 14; j++) {
    // a card is an object
    cards.push({
      no: j, // the number of the card
      suit: suits[i] // the suit of the card
    });
  }
}

console.log("all cards", cards);


// function that removes a random card
function randomCard() {
  // random integer between 0 && cards.length-1
  var randomIndex = Math.floor(Math.random() * cards.length);

  // remove that index
  var removed = cards.splice(randomIndex, 1);

  // remember the removed card
  removedCards.push(removed[0]);

  // return the removed card
  return removed[0];
}















