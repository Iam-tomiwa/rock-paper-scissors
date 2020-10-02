//short-handed selectors
const getId = (e) => document.getElementById(e);
const query = (e) => document.querySelector(e);

//grab all my elements here
const rules = query(".rules");
const rulesBtn = query(".rules-btn");
const overlay = query(".overlay");
const close = getId("close");
const userChoice = document.querySelectorAll('.choice-btn .choice-wrapper')
const selectSection = query(".selectSection");
const userPicked = query(".user-picked");
const computerSelect = query(".computerSelect");
const resultSection = query(".main-2");
const finish = query(".finish");
const userText = query(".user-text");
const endResult = query(".end");
const msg = query(".msg");

//rules display buttons
rulesBtn.addEventListener("click", (e) => {
  rules.style.display = "flex";
  overlay.style.display = "block";
});

close.addEventListener("click", (e) => {
  rules.style.display = "none";
  overlay.style.display = "none";
});

let score = getId("score"); //grab score from score board

//displays selected elements
function gameOn(e) {
  const userAlt = e.target.firstElementChild?.alt || e.target.alt;
  const userSrc = e.target.firstElementChild?.src || e.target.src;
  userPicked.parentElement.classList.add(userAlt);
  resultSection.classList.remove("fade");
  selectSection.classList.add("rotate");
  let currentScore = 3; // a variable to keep my score for later edit

  setTimeout(() => {
    selectSection.style.display = "none";
    resultSection.style.display = "flex";
    userPicked.src = userSrc;
    userPicked.alt = userAlt;
    selectSection.classList.remove("rotate");
  }, 700); //a timeout to enable the rotate animation finish

  setTimeout(computer, 1600); //a little loading time to delay computer function runs

  //the brain processing of the game is on this function!
  function computer() {
    let randomNumber = Math.floor(Math.random() * 3); //generate random number from 0-2
    switch (randomNumber) {
      case 0:
        // code
        computerSelect.src = "images/icon-paper.svg";
        computerSelect.parentElement.classList.add("paper");
        computerSelect.alt = "paper";
        break;
      case 1:
        // code
        computerSelect.parentElement.classList.add("rock");
        computerSelect.src = "images/icon-rock.svg";
        computerSelect.alt = "rock";
        break;
      case 2:
        // code
        computerSelect.parentElement.classList.add("scissors");
        computerSelect.alt = "scissors";
        computerSelect.src = "images/icon-scissors.svg";
        break;
    }

    if (
      (randomNumber === 0 && userPicked.alt === "paper") ||
      (randomNumber === 1 && userPicked.alt === "rock") ||
      (randomNumber === 2 && userPicked.alt === "scissors")
    ) {
      userText.style.color = "hsl(39, 89%, 49%)"; //keep scores as a draw
    } else if (
      (randomNumber === 0 && userPicked.alt === "scissors") ||
      (randomNumber === 1 && userPicked.alt === "paper") ||
      (randomNumber === 2 && userPicked.alt === "rock")
    ) {
      currentScore++;
      score.innerHTML++;
      userText.style.color = "green"; //add 1 to current score
    } else if (
      (randomNumber === 0 && userPicked.alt === "rock") ||
      (randomNumber === 1 && userPicked.alt === "scissors") ||
      (randomNumber === 2 && userPicked.alt === "paper")
    ) {
      currentScore--;
      score.innerHTML--;
      userText.style.color = "red"; //remove 1 from current score
    }
  }
}

//continue playing until a limit score is reached
let continueBtn = query(".continue");

continueBtn.addEventListener("click", (e) => {
  resultSection.classList.add("fade"); //fade out effect for the result section

  setTimeout(function () {
    if (score.innerHTML < "6" && score.innerHTML >= "1") {
      //first remove all classes to avoid conflict
      userPicked.parentElement.classList.remove("paper", "rock", "scissors");
      computerSelect.parentElement.classList.remove(
        "paper",
        "rock",
        "scissors"
      );
      userText.style.color = "white";
      selectSection.style.display = "flex";
      resultSection.style.display = "none";
      computerSelect.src = "images/empty.png";
    } else if (score.innerHTML === "6") {
      finish.style.display = "flex";
      endResult.innerHTML = "YOU WIN!!";
      continueBtn.style.display = "none";
    } else if (score.innerHTML === "0") {
      finish.style.display = "flex";
      endResult.innerHTML = "YOU LOSE😟";
      continueBtn.style.display = "none";
    }
  }, 600);
});

//events listener for each user choice to initialise gameOn function
userChoice.forEach((selected) =>
  selected.addEventListener("click", gameOn, false)
);

//display a messsage before reloading th game
query(".replay").addEventListener("click", (e) => {
  msg.style.display = "flex";
  overlay.style.display = "block";
});

//reload the game on pressing close button
query(".reload").addEventListener("click", (e) => window.location.reload(true));
