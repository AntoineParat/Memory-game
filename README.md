# Memory Game Project

![enter image description here](https://www.antoineparat.com/img/memory.png)

## Table of Contents

* [Installation](#installation)
* [Rules](#rules)
* [Instructions](#instructions)
* [How does the game was built ?](#How-does-the-game-run-?)
* [Customize the game](#customize-the-game)
* [Trick](#trick)

## Installation

* Click to link to play  : https://antoineparat.github.io/memoryGame/
* Or browse the folder and open the index.html file

## Rules
* Match all cards with the fewer moves and the fewer time it is possible.

## Instructions
* Click on a card to display symbol and match two cards with the same symbol.
* If the two cards match they stay open ad you made a good move !
* If the the two cards doesn't match they turn back and you have to try again.
* Game ends when all cards have matched.

## How does the game was built ?

* This game is build with vanilla js. Starting from a static html file, i used js to manipulate the DOM :
* Starting by building a grid of cards.
* Adding the functionality to handle clicks.
* Working on the matching logic.
* Creating the winning condition.
* Implementing additional functionality such as a move counter or a timer.

### Customize the game

* If you find this game to be too difficult, you can easily change the star rating criterias by your own : open the `.js`file and go to line 98 : `function starCount () {
  for (let y of star1 ) { 
    if ( count ===28) { y.classList.add('display-none')};
  }
  for (let y of star2){
    if ( count ===38) { y.classList.add('display-none')};
  }
} `
* Change numbers `28`and `38`to modify the star rating ! 

### Trick 

There is a trick with your browser console to make the best score as possible... Would you be able to find it ?
