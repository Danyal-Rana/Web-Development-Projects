let randomNumber = parseInt(Math.random() * 100 + 1);

const submitButton = document.querySelector('#subt');
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const totalGusses = document.querySelector(".lastResult");
const lowOrHigh = document.querySelector(".lowOrHigh");
const startOver = document.querySelector(".resultParas");

const p = document.createElement('p');

let preGuess = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();

        const currentGuess = parseInt(userInput.value);
        isValid(currentGuess);
    } )
}

function isValid (guess) {
    if (isNaN(guess) || guess<1 || guess>100) {
        alert ("Please enter a Valid number.")
    } else {
        preGuess.push (guess);
        if (numGuess === 11) {
            displayGuess(guess);
            displayMessage (`Game Over. The random number was ${randomNumber}`);
            endGame();
        } else {
            displayGuess (guess);
            checkGuess (guess);
        }
    }
}

function checkGuess (guess) {
    if (guess === randomNumber) {
        displayMessage (`You guessed it right.`);
        endGame();
    } else if (guess<randomNumber) {
        displayMessage ("Entered number is Smaller !");
    } else if (guess>randomNumber) {
        displayMessage ("Entered number is Greater !")
    }
}

function displayGuess (guess) { // clean up purpose
    userInput.value = '';
    guessSlot.innerHTML = `${guess}`;
    numGuess++;
    totalGusses.innerHTML = `${11 - numGuess}`;
}

function displayMessage (message) {
    lowOrHigh.innerHTML = `<h2>${message}</h2>`
}

function newGame () {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add ('button');
    p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
    startOver.appendChild (p);
    playGame = false;
    newGame();
}

function endGame () {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener ('click', function(e) {
        randomNumber = parseInt(Math.random() * 100 + 1);
        preGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        totalGusses.innerHTML = `${11 - numGuess}`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    })
}