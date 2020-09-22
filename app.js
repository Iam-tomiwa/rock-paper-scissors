//short-handed selectors
const getId = (e) => document.getElementById(e);
const query = (e) => document.querySelector(e);

//grab all my elements here
const rules = query('.rules');
const button = query('.button');
const overlay = query('.overlay');
const close = getId('close');
const container = query('.container');
const paper = query('.paper');
const scissors = query('.scissors');
const rock = query('.rock');
const picked = query('.picked');
const random = query('.random');
const choose = document.querySelectorAll('.choose');
const main2 = query('.main-2');
const finish = query('.finish');
const userText = query('.user-text');
const endResult = query('.end');
const msg = query('.msg');

//rules display
button.addEventListener('click', e => {
  rules.style.display = 'flex';
  overlay.style.display = 'block';
})
 
close.addEventListener('click', e => {
  rules.style.display = 'none';
  overlay.style.display = 'none';
})

let score = getId('score');//grab score

//pick one
function display(choice){

  let currentScore = 3;
  main2.style.display = 'flex';
  container.style.display = 'none';
  picked.src = `images/${choice}.png`;
  picked.alt = `${choice}`;

  setTimeout(computer, 2000);//a little loading time

  function computer(){
    let randomNum = Math.floor(Math.random() * Math.floor(3));
    switch (randomNum) {
      case 0:
        // code
        random.src = 'images/paper.png';
        random.alt = 'paper';
        break;
      case 1:
        // code
        random.src = 'images/rock.png';
        random.alt = 'rock';
        break;
      case 2:
        // code 
        random.alt = 'scissors';
        random.src = 'images/scissors.png';
        break;
    }

    if ((randomNum === 0 && picked.alt === 'paper') || 
    (randomNum === 1 && picked.alt === 'rock') || 
    (randomNum === 2 && picked.alt === 'scissors')) {
      
      currentScore = currentScore;
      score.innerHTML = score.innerHTML;
      userText.style.color = 'hsl(39, 89%, 49%)';
      
    } else if((randomNum === 0 && picked.alt === 'scissors') ||
     (randomNum === 1 && picked.alt === 'paper') || 
     (randomNum === 2 && picked.alt === 'rock')) {
      
      currentScore++;
      score.innerHTML++;
      userText.style.color = 'green';
      
    }else if((randomNum === 0 && picked.alt === 'rock') || 
    (randomNum === 1 && picked.alt === 'scissors') || 
    (randomNum === 2 && picked.alt === 'paper')) {
      
      currentScore--;
      score.innerHTML--;
      userText.style.color = 'red';

    }
  }
}

//continue playing until a limit score is reached
let continueBtn = query('.continue');

continueBtn.addEventListener('click', e => {
    
    if(score.innerHTML < '6' && score.innerHTML >= '1') {
      
    userText.style.color = 'white';
    container.style.display = 'flex';
    main2.style.display = 'none';
    random.src = 'images/empty.png';
    
    } else if(score.innerHTML === '6') {
      
    finish.style.display = 'flex';
    endResult.innerHTML = 'YOU WIN!🥳';
    continueBtn.style.display = 'none';
    
    } else if(score.innerHTML === '0'){
      
    finish.style.display = 'flex';
    endResult.innerHTML = 'YOU LOSE😟';
    continueBtn.style.display = 'none';
  }
})

paper.addEventListener('click', e => {
  display('paper')
});
rock.addEventListener('click', e => {
  display('rock')
});
scissors.addEventListener('click', e => {
  display('scissors')
});

//restart the game
query('.replay').addEventListener('click', e => {
  msg.style.display = 'flex';
  overlay.style.display = 'block';
}) 

query('.reload').addEventListener('click', e => window.location.reload(true));

