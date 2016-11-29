

/*
  using break; to terminate loops
*/

// our own version of indexOf
function ourIndexOf(searchString, letter) {
  // compare each letter against the letter
  // we are searching for, and stop the loop
  // if and when we find a match!

  // Strings have lengths too!
  for (var i = 0; i < searchString.length; i++) {
    // as soon as we find a match,
    // terminate the loop!
    if (searchString[i] == letter) {
      console.log("Found a match at index "+i);

      // please stop looping!
      break;
    }
  }
}


// find the first card with a specific number
function findCardByNumber(no) {
  // go through all cards one by one
  for (var i = 0; i < cards.length; i++) {
    // see if there is a match;
    if (cards[i].no == no) {
      console.log("Found a card no" + no + " at index "+i);
      // if a match, stop looking
      break;
    }
  }
}




/*
  Skipping iterations of a loop
  using continue;
*/

// counts to ten, buts skips a provided number
function countToTenButSkip(no) {
  for (var i = 1; i <= 10; i++) {
    // skip the number we are given
    // as a parameter
    if (i === no) { continue; }

    console.log("counting " + i);
  }
}


// show all cards that have even indexes
function showEvenIndexes() {
  for (var i = 0; i < cards.length; i++) {

    // using % (modulus) to see if i is an even number
    if (i%2 !== 0) { continue; }

    console.log("card index " + i + " is: ", cards[i]);
  }
}

// show all cards that have uneven indexes
function showUnevenIndexes() {
  for (var i = 0; i < cards.length; i++) {

    // using % (modulus) to see if i is an uneven number
    if (i%2 === 0) { continue; }
    
    console.log("card index " + i + " is: ", cards[i]);
  }
}








