"use strict";

//SELECTING ELEMENTS
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
// const score1 = document.querySelector("#score--0");
// const score2 = document.querySelector("#score--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNewEl = document.querySelector(".btn--new");
const btnRollEl = document.querySelector(".btn--roll");
const btnHoldEl = document.querySelector(".btn--hold");
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");
const totalScore0El = document.getElementById("score--0");
const totalScore1El = document.getElementById("score--1");

//STARTING CONDITIONS
let currentScore;
let scores;
let activePlayer;
let playing;
const initialization = function () {
  //hiding the dice
  diceEl.classList.add("hidden");

  //reset the current scores
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  //reset the total scores
  totalScore0El.textContent = 0;
  totalScore1El.textContent = 0;

  //setting inital current score
  currentScore = 0;

  //setting both player's total scores to 0
  scores = [0, 0];

  //setting player0 as active player
  activePlayer = 0;

  //removing the player--winner class
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  //removing the player--active class
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  //chaning the state of playing to true
  playing = true;
};

initialization();

//Function to switch the player
const switchPlayer = function () {
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//ROLLING DICE FUNCTIONALITY
btnRollEl.addEventListener("click", function () {
  if (playing) {
    //Generating a random number between 1 and 6(including them)
    const diceRoll = Math.floor(Math.random() * 6) + 1;

    //Display the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${diceRoll}.png`;

    //Check if dice roll is 1 or not
    if (diceRoll != 1) {
      //add dice roll to the current score
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to the other player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      scores[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];
      switchPlayer();
    }
  }
});

//HOLDING DICE FUNCTIONALITY
btnHoldEl.addEventListener("click", function () {
  if (playing) {
    //add current score ot the active player's score
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if active player's score >= 100
    if (scores[activePlayer] >= 100) {
      //if yes then finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //else switch player
      switchPlayer();
    }
  }
});

//IMPLEMENTING TRY AGAIN BUTTON
btnNewEl.addEventListener("click", initialization);
