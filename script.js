"use strict";

const dice_img = document.querySelector(".dice");
const roll_dice = document.querySelector(".roll-dice");
const current_score = document.querySelectorAll(".current-score");
const player = document.querySelectorAll(".player");
const holdbtn = document.querySelector(".hold");
const playerScore = document.querySelectorAll(".number");
const resetGame = document.querySelector(".new-game");

let current, activeplayer, playing;

const start = function () {
  current = 0;
  activeplayer = 0;
  playing = true;
  dice_img.classList.add("hidden");
};
start();

const switchPlayer = function () {
  current = 0;
  current_score[activeplayer].textContent = current;
  activeplayer = activeplayer === 0 ? 1 : 0;

  player[0].classList.toggle("active-player");
  player[1].classList.toggle("active-player");
};

roll_dice.addEventListener("click", function () {
  if (playing) {
    let dice_number = Math.trunc(Math.random() * 6) + 1;
    dice_img.classList.remove("hidden");
    dice_img.src = `./assets/dice-${dice_number}.png`;
    dice_img.style.transform = "rotate(10deg)";

    if (dice_number !== 1) {
      current += dice_number;
      current_score[activeplayer].textContent = current;
    } else {
      switchPlayer();
    }
  }
});

holdbtn.addEventListener("click", function () {
  if (playing) {
    const temp = Number(current_score[activeplayer].textContent);
    playerScore[activeplayer].textContent =
      Number(playerScore[activeplayer].textContent) + temp;

    if (playerScore[activeplayer].textContent >= 50) {
      player[activeplayer].classList.add("winner-player");
      document.getElementById(
        `player-${activeplayer}`
      ).textContent = `🎉 PLAYER ${activeplayer + 1} WON!`;
      dice_img.classList.add("hidden");
      playing = false;
    } else switchPlayer();
  }
});

resetGame.addEventListener("click", function () {
  playerScore[0].textContent = 0;
  playerScore[1].textContent = 0;
  current_score[activeplayer].textContent = 0;
  document.getElementById(`player-${activeplayer}`).textContent = `PLAYER ${
    activeplayer + 1
  }`;
  player[activeplayer].classList.remove("winner-player");
  player[0].classList.add("active-player");
  player[1].classList.remove("active-player");
  start();
});
