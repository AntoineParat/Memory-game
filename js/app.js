
let listOfCards = document.querySelectorAll('li.card');

//function that transforms NodeList in array
function arrayOfCards() {
  	return Array.from(listOfCards);
}

//making listOfCards an array
listOfCards = arrayOfCards();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//displaying the card randomly to the grid
const deck = document.querySelector(".deck");

function randomize () { 
listOfCards = shuffle(listOfCards);
for (let x of listOfCards){
    deck.appendChild(x);
  }
}

//call the function to init game
const initGame = randomize();


let openCards = []; // open cards are pushed into array
let matchCards = []; // first card of each matched cards are pushed into array
let count = 0; // move counter is initialized
let timer = null;
const moves = document.querySelector('.moves'); 

//set up the event listener for a card.
deck.addEventListener("click", displayCard);  

function displayCard (e) {  
  if (e.target.className === "card") {  // eventListener is listening only to the cards inside the deck.
    e.target.classList.add('show','open'); // display the card's symbol
    openCards.push(e.target) //add the card to a *list* of "open" cards
    count ++; //increment the move counter
    if (openCards.length ===2 && openCards[0].firstElementChild.classList[1] ===openCards[1].firstElementChild.classList[1]){
       match(); // if the the list already has another card AND cards do match, lock the cards in the open position.
    }
    else if (openCards.length ===2 && openCards[0].firstElementChild.classList[1] != openCards[1].firstElementChild.classList[1]) {
      deck.classList.add("avoid-clicks"); // avoid cards to be cliked before timeout id executed
      openCards[0].classList.add("animated", "shake");
      openCards[1].classList.add("animated", "shake");
      setTimeout("dontMatch()",1000); // if the cards do not match, remove the cards from the list and hide the card's symbol         
    }
    if (matchCards.length===8){ // 8 cards in the array means that all cards has been matched as only the first of each pair them is pushed.
        deck.style.cssText = 'background:yellow';
        clearInterval(timer); // if all cards have matched timer is stoped
        score() // sorts the best games according to the number of moves
        displayModal (); //display a message with the final score and other features
    }
  }
  moves.innerHTML=count; // display the move counter on the page
  starCount(); //display 3, 2 or 1 stars according to the number of moves
  if (timer===null) { //if a first card is cliked, timer is run. 
    timer=setInterval(time,1000); // time() is launched each second
  }
}

 
function match () {
  openCards[0].classList.add("match", "animated", "heartBeat"); // The "match class" is added.
  openCards[1].classList.add("match", "animated", "heartBeat");
  openCards =[];
  let a = openCards[0]; // The first card of the two is pushed into the matchCards array.
  matchCards.push(a);
}


function dontMatch() {
    openCards[0].classList.remove("open", "show","animated","shake"); // "open" and "show" classes are removed
    openCards[1].classList.remove("open", "show","animated","shake");
    deck.classList.remove("avoid-clicks"); // Cards can be clicked again. 
    openCards=[] //openCards array is set to reinitialized
}

//  displaying the stars rating on the page AND on the modal
const star1 = document.querySelectorAll('.star1');
const star2 = document.querySelectorAll('.star2');

function starCount () {
  for (let y of star1 ) { 
    if ( count ===28) { y.classList.add('display-none')};
  }
  for (let y of star2){
    if ( count ===38) { y.classList.add('display-none')};
  }
}   

//SHOW MODAL
const container = document.querySelector('.container');
const modal = document.querySelector('#modal');
const duration = document.querySelector('#duration');
const mvt = document.querySelector('#mvt');
const rank = document.querySelector('#rank')
const bestScore= document.querySelector('#bestMoves');
const bravo = document.querySelector('#bravo');
const yourBestScoreIs = document.querySelector('.yourBestScoreIs');

function displayModal () { // modal displays moves counter, timer, best score.
  modal.style.cssText = 'display:block';
  container.style.cssText ='opacity : 0.4';
  mvt.innerHTML = count;
  duration.innerHTML = `${minute} min and ${seconde} sec`;
  container.classList.add('avoid-clicks');// only modal is available to click
  bestScore.innerHTML = bestMoves[0];
  if (bestMoves.length > 1 && 
    bestMoves[0] === count &&
    bestMoves[0] != bestMoves[1]) { // bestMoves[0]===count means that your current game is the one with the fewer moves (so the best)
      bravo.innerHTML ="WOOW this is yout best score !!!";
      yourBestScoreIs.classList.add("display-none");
      }
};

//HIDE MODAL
const close = document.querySelector('#playAgain');
close.addEventListener('click', function (){ //an eventListener is set on the "Play again" button
    reStart (); //game is reinitialized BUT best games are still stored in the bestMoves array
    modal.style.cssText = ''; //properties are reintialized
    container.style.cssText ='';
    container.classList.remove('avoid-clicks');// 
});

/// TIMER
const minuterie = document.querySelector('.timer');
let minute = 0;
let seconde =0;

function time () {
  seconde ++
  if(seconde ===60) {
    seconde =0;
    minute += 1;
  }
  minuterie.innerHTML=`${minute} min and ${seconde} sec`;  // timer is displayed on the page
};

// BestScore 

let bestMoves =[];

function score() { //results of moves counter are pushed in bestMoves array which sorts the best game (the fewer moves)
  bestMoves.push(count);
  bestMoves.sort(function(a, b) {
    return a - b;
  }); 
}


//RESTART
const restart = document.querySelector('.restart');
restart.addEventListener('click', function (){ //an eventListener is set on the "remove" button
  reStart();
  bestMoves =[]; //array of best game according to moves counter is reinitialized
});

function reStart() {
     randomize(); //cards are randomly display again
     for (let x of listOfCards) { //all
       x.classList.remove('match'); // "match", "open" and "show" classes are removed to each card.
       x.classList.remove('open');
       x.classList.remove('show');
       x.classList.remove('animated');
       x.classList.remove('heartBeat');
     }
     count = 0; //move counter is reinitialized
     moves.innerHTML=count; 
     openCards =[]; // array are reinitialized
     matchCards=[]; 
     deck.style.cssText = 'linear-gradient(160deg, #02ccba 0%, #aa7ecd 100%';
     clearInterval(timer); // timer is stopped and then reinitialized
     minuterie.innerHTML=`0 min and 0 sec`
     minute =0;
     seconde =0;   
     for (let y of star1){ //stars rating is displaying back to three on the page AND the modal
       y.classList.remove("display-none");
     }
     for (let y of star2){
       y.classList.remove("display-none");
     }
     bravo.innerHTML ="" //congratulation message for best game is reinitialized
     timer = null;
     }
    
