'use strict';

import Score from './Score.js';

import { onEvent, getElement, select, date } from './utility.js';

const form = select('form');
const display = select('.word-box');
const input = select('.input');
const start = select('.start-game');
const restart = getElement('restart');
const restartBtn = select('.restart');
const hits = select('.hits p');
const timer = select('.timer');
const datePost = `${date()}`;
const displayDate = select('.date');
const overlay = select('.overlay');
const scoreBoard = select('.scoreboard');
const points = select('.point');
const percent = select('.percent');
const close = select('.close');
const array = [];


const startAudio = new Audio('./assets/audio/background.mp3');
startAudio.type = 'audio/mp3';
startAudio.loop = true;


const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population',
'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute',
'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
'keyboard', 'window'];


// To append date
let p1 = document.createElement('p');
p1.classList.add("date-p");
p1.innerText = datePost;
displayDate.append(p1);


// To get random words from the array
function randomWord() {
    let word = words[Math.floor(Math.random() * words.length)];
    words.splice(word, 1);
    return word;
};

function appendWord() {
    // To append the randomword to the word box
    let selectedWord = document.createElement('p');
    selectedWord.classList.add("wordbox-p");
    selectedWord.innerText = randomWord();
    display.append(selectedWord);


    let count = 1;
    onEvent('keyup', input, () => {

        const wordRandom = selectedWord;
        let wordInput = input.value.trim().toLowerCase();
        if (wordInput === wordRandom.innerText) {
            console.log('correct');
            let inner = `${count}` ; 
            array.push(inner);
            hits.innerHTML = `Hints: ${count}`;
            points.innerHTML = `${count}`;
            input.value = '';
            selectedWord.innerText = randomWord();
            count++;

            const score = new Score(datePost, array.length, calcpercent());
            percent.innerText = `Percentage: ${score.percentage}%`
        }
    });
}

let countdownTime = 99;
let timeinterval;
let isStarted = true;

// Function to start Timer and Display Timer
function startTimer() {
  if (isStarted) {
    isStarted = false;
    timer.innerHTML = countdownTime;
    timeinterval = setInterval(displayTime, 1000);
  }
};

function displayTime() {
  countdownTime -= 1;
  timer.innerHTML = countdownTime;
  
  if (countdownTime === 0) {
    isStarted = true;
    clearInterval(timeinterval);
    countdownTime = 99;
    startAudio.pause();
    displayBoard();
  }
};

function calcpercent() {
    let result = Math.round((array.length * 100) / 90);
    return result;
}

function displayBoard() {
    scoreBoard.style.display = "block";
    overlay.style.display = "block";
}


// Event listeners
onEvent('click', restart, () => {
    window.location.reload()
})

onEvent('click', restartBtn, () => {
    window.location.reload()
})

onEvent('click', start, function() {
    appendWord();
    startAudio.play();
    input.focus();
    startTimer();
    restart.classList = 'is-visible';
    start.classList.add("not-visible");
    timer.style.display = 'block';
})

close.addEventListener('click', () => {
    scoreBoard.style.display = "none";
    overlay.style.display = "none";
});

overlay.addEventListener('click', () => {
    scoreBoard.style.display = "none";
    overlay.style.display = "none";
});

let modal = getElement("game-modal");
let span = select(".close-modal");

window.addEventListener("load", (event) => {
    setTimeout(() => {
        modal.classList.add('is-visible');
    }, 1000)
});

span.onclick = function() {
    modal.classList.remove('is-visible');
}


function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    })
}

const intro = select('.intro');
const more = select('.more-intro');

sleep(300).then(() => intro.classList.add('is-visible'));
sleep(6000).then(() => more.classList.add('is-visible'));
