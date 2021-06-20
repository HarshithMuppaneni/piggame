'use strict';
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
let scores, currentScore, activePlayer, playing;

const btnRoll = document.querySelector('.btn--roll');

const init = function () {
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  document.querySelector('.dice').classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (playing) {
    const randomNum = Math.trunc(Math.random() * 6) + 1;
    document.querySelector('.dice').classList.remove('hidden');
    document.querySelector('.dice').src = `dice-${randomNum}.png`;
    if (randomNum == 1) switchPlayer();
    else {
      currentScore += randomNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', init);

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector('.dice').classList.add('hidden');
    } else switchPlayer();
  }
});
