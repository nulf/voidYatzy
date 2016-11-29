

// finds all indexes of a letter
// in a string
function findLetters(searchString, letter) {
  // the first index of our letter
  var index = searchString.indexOf(letter);
  console.log(letter + " is at " + index);

  // WHILE there are letters to be found
  while(index >= 0) { // a while loop!
    // find the next index
    // keep searching
    index = searchString.indexOf(letter, index+1);

    console.log("AND " + letter + " is at " + index);
  }
}


// empty an array using while
function emptyArr(arr) {
  while (arr.length > 0) {
    arr.pop(); // remove last
  }
}











