var Cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
let matched = 0;
let openCardList = [];
const deck = document.querySelector('.deck');
const cards = document.querySelector('.card');
let moves = 0;
let counter = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star");
let starsList = document.querySelectorAll(".stars li");
const TOTAL_PAIRS = 8
var buttonStop = document.getElementById('button-stop');
// close icon in modal
let closeicon = document.querySelector(".close");

// declare modal
let modal = document.getElementById("popup1")

var seconds = 00;
var tens = 00;
var appendTens = document.getElementById("tens")
var appendSeconds = document.getElementById("seconds")
var reset = document.getElementById('button-reset');
var Interval;

//adds a move if a card is clicked
function moveCounter() {
  moves++;
  counter.innerHTML = moves;

  // setting rates based on moves
  if (moves > 15 && moves < 20) {
    for (i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = "collapse";
      }
    }
  } else if (moves > 21) {
    for (i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = "collapse";
      }
    }
  }
}


//Shuffle the deck! This shuffle function was taken from https://matthewcranford.com/memory-game-walkthrough-part-4-setup/
function shuffleDeck() {
  const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
  const shuffledCards = shuffle(cardsToShuffle);
  for (card of shuffledCards) {
    deck.appendChild(card);
  }
}
shuffleDeck();

//Toggles the classes to show and open a card 
function toggleCard(card) {
  card.classList.toggle('open');
  card.classList.toggle('show');
}

//Pushes card to the empty array 

function addToggleCard(clickTarget) {
  openCardList.push(clickTarget);
  console.log(openCardList);
}

//Adds cards to the opened cards array

deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if (isClickValid(clickTarget)) {
    if (isClickValid(clickTarget)) {}
    toggleCard(clickTarget);
    addToggleCard(clickTarget);
    if (openCardList.length === 2) {
      checkForMatch(clickTarget);
      moveCounter()
    }
  }
});

function isClickValid(clickTarget) {
  return (
    clickTarget.classList.contains('card') &&
    !clickTarget.classList.contains('match') &&
    openCardList.length < 2 &&
    !openCardList.includes(clickTarget)
  );
}

//Function checks if cards match - Was modified using Mat. Crawford Description to https://matthewcranford.com/memory-game-walkthrough-part-1-setup/
function checkForMatch() {
  if (
    openCardList[0].firstElementChild.className ===
    openCardList[1].firstElementChild.className
  ) {
    setTimeout(function () {
      openCardList[0].classList.toggle('match');
      openCardList[1].classList.toggle('match');
      openCardList = [];
      setTimeout(function () {
        matched++;
        checkWin();
      }, 1000);
    }, 800);
  } else {
    console.log('Nope! Try again!');
    setTimeout(() => {
      toggleCard(openCardList[0]);
      toggleCard(openCardList[1]);
      openCardList = [];
    }, 1000);

  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


//If a card is clicked, start the timer 
$('.deck').on('click', '.card', Timer)

function Timer(event) {

  clearInterval(Interval);
  Interval = setInterval(startTimer, 10);
}

 function stop() {
  clearInterval(Interval);
}

//Resets the timer 

reset.onclick = function startAgain() {
  clearInterval(Interval);
  tens = "00";
  seconds = "00";
  appendTens.innerHTML = tens;
  appendSeconds.innerHTML = seconds;
  openCardList = [];
  matched = 0;
  resetStars();
  resetCards()
  shuffleDeck()
}
//Resets the game 

function retry() {
  clearInterval(Interval);
  tens = "00";
  seconds = "00";
  appendTens.innerHTML = tens;
  appendSeconds.innerHTML = seconds;
  openCardList = [];
  matched = 0;
  resetStars();
  resetCards();
  shuffleDeck()

}

//Resets the stars back to 3 

function resetStars() {
  moves = 0;
  counter.innerHTML = moves;
  for (var i = 0; i < stars.length; i++) {
    stars[i].style.color = "#FFD700";
    stars[i].style.visibility = "visible";
  }

}

//timer - which counts by seconds and ms 

function startTimer() {
  tens++;

  if (tens < 9) {
    appendTens.innerHTML = "0" + tens;
  }

  if (tens > 9) {
    appendTens.innerHTML = tens;

  }

  if (tens > 99) {
    console.log("seconds");
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }

  if (seconds > 9) {
    appendSeconds.innerHTML = seconds;
  }

}

//stops the game 
function gameOver() {
  stop();
  clearInterval(Interval);
  shuffleDeck()

}

//resets the cards back to their original class

function resetCards() {
  const cards = document.querySelectorAll(".deck li");
  for (let card of cards) {
    card.className = "card";
  }
}

//function that checks if all cards are matched
function checkWin() {
  matched += 1;
  if (matched === 16) {
      openCardList = [];
      matched === 0;
    console.log("The game is won");
    gameOver();
    finalTime = Timer.innerHTML;
    // show congratulations modal. Modal basic template came from https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript 
    modal.classList.add("show");

    // declare star rating variable
    var starRating = document.querySelector(".stars").innerHTML;

    //showing move, rating, time on modal
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = seconds + "seconds " + tens + "ms";

    //closeicon on modal
    closeModal();
  };
}


//close icon on modal
function closeModal() {
  closeicon.addEventListener("click", function (e) {
    modal.classList.remove("show");
  });
}


// desciption for user to play Again 
function playAgain() {
  modal.classList.remove("show");
  retry();
}
