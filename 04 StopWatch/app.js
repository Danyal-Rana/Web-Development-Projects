let hours = 0;
let minutes = 0;
let seconds = 0;
let tens = 0;
let interval;

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const hoursElement = document.getElementById('hours');
const minsElement = document.getElementById('mins');
const tensElement = document.getElementById('tens');

// Function to update the stopwatch display
function updateDisplay() {
    hoursElement.innerHTML = hours.toString().padStart(2, "0");
    minsElement.innerHTML = minutes.toString().padStart(2, "0");
    tensElement.innerHTML = tens.toString().padStart(2, "0");
}

// Function to start the stopwatch
function startTimer() {
    console.log (`${minutes}:${seconds}:${tens}`)
    tens++;

    if (tens === 10) {
        seconds++;
        tens = 0;
    }

    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }

    if (minutes === 60) {
        hours++;
        minutes = 0;
    }

    updateDisplay();
}

// Start button click event listener
startButton.addEventListener('click', () => {
    clearInterval(interval);
    interval = setInterval(startTimer, 10);
});

// Stop button click event listener
stopButton.addEventListener('click', () => clearInterval(interval));

// Reset button click event listener
resetButton.addEventListener('click', () => {
    clearInterval(interval);
    hours = 0;
    minutes = 0;
    seconds = 0;
    tens = 0;
    updateDisplay();
});