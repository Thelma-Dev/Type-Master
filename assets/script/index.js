'use strict';

import Score from './Score.js';

import { onEvent, getElement, select, date } from './utility.js';

const form = select('form');
const display = select('.word-box');
const input = select('.input');
const start = select('.start-game');
const restart = getElement('restart');
const hits = select('.hits p');
const timer = select('.timer');


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

// To get random words from the array
function randomWord() {
    let word = words[Math.floor(Math.random() * words.length)];
    return word;
};


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
        count = 0;
        hits.innerText = `Hits: ${count}` ; 
        input.value = '';
        selectedWord.innerText = randomWord();
    }
    count++;
});


let countdownTime = 99;
let timerId = setInterval(countdown, 1000);

function countdown() {
    if (countdownTime === -1) {
    clearTimeout(timerId);
    } else {
    timer.innerText = countdownTime;
    countdownTime--;
    }
}

onEvent('click', restart, () => {
    window.location.reload()
})

onEvent('click', start, function() {
    input.focus();
    countdown();
    restart.classList = 'is-visible';
    start.classList.add("not-visible");
    timer.style.display = 'block';
})

