'use strict';

// starting by setting the values to 0;
// selecting elements 
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// for styling 
const body = document.querySelector('body');

// Starting conditions function
const init = () => {
    scores = [0, 0];
    // it needs to be outside the function
    // if not it'll keep setting to 0 every time 'btnRoll' is clicked.
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();

// Switch to next player
const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0; // sets the score back to 0
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    // this toggles the class on or off.
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    // backgroundColor switch
    if(`current--${activePlayer}` === 'current--1') {
        // Player 1
        body.style.backgroundImage = 'linear-gradient(to top right, #2043c1 0%, #8982ff 100%)';
    } else { // Player 0
        body.style.backgroundImage = 'linear-gradient(to top left, #2043c1 0%, #8982ff 100%)';
    }
};

// Rolling dice Functionality (handler function)
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generating a random dice roll 
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // 3. Check for rolled 1
        if(dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            // selects the 'active' player && sets 'currentScore'
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
        // 1. Add current score to active player's score
        //scores[1] = scores[1] + currentScore; (same thing)
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score is >= 100 (WINNER)
        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // Switch to the next player
            switchPlayer();
        }
    }    
});

btnNew.addEventListener('click', init);