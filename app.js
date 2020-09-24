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


function bg(clicked){
  switch (clicked) {
    case 'rock':
      return 'background-image: linear-gradient(#dc2e4e, #dd405d); box-shadow: 0px 8px 0px -1px #991635;'
      
      case 'paper':
        return 'background-image: linear-gradient(#4865f4, #5671f5); box-shadow: 0px 8px 0px -1px #2642bf;';
      case 'scissors':
        return 'background-image: linear-gradient(#ec9e0e, #eca922); box-shadow: 0px 8px 0px -1px #cc6d1b;';
  }
}

let score = getId('score');//grab score

//pick one
function display(choice){

  container.classList.add('rotate');
  let currentScore = 3;
  
  setTimeout(function() {
    container.classList.remove('rotate');
    container.style.display = 'none';
    main2.style.display = 'flex';
    picked.src = `images/icon-${choice}.svg`;
    picked.alt = `${choice}`;
    picked.parentElement.style.cssText = bg(choice);
  }, 600);
  
  setTimeout(computer, 1800);//a little loading time

  function computer(){
    let randomNum = Math.floor(Math.random() * Math.floor(3));
    switch (randomNum) {
      case 0:
        // code
        random.src = 'images/icon-paper.svg';
        random.parentElement.style.cssText = bg('paper');
        random.alt = 'paper';
        break;
      case 1:
        // code
        random.parentElement.style.cssText = bg('rock');
        random.src = 'images/icon-rock.svg';
        random.alt = 'rock';
        break;
      case 2:
        // code 
        random.parentElement.style.cssText = bg('scissors');
        random.alt = 'scissors';
        random.src = 'images/icon-scissors.svg';
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
    endResult.innerHTML = 'YOU WIN!!';
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

