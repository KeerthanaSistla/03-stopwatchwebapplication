
const numberHours = document.querySelector(".number_hours");
const barSeconds = document.querySelector(".bar_seconds");

const numberElement = [];
const barElement = [];

for (let i=1; i<=12; i++){
    numberElement.push(
        `<span style="--index:${i};"><p>${i}</p></span>`
    );
}
numberHours.insertAdjacentHTML("afterbegin", numberElement.join(""));
    
for (let i=1; i<=60; i++){
    barElement.push(
        `<span style="--index:${i};"><p></p></span>`
    );
}
barSeconds.insertAdjacentHTML("afterbegin", barElement.join(""));

const handHours = document.querySelector(".hand.hours");
const handMin = document.querySelector(".hand.min");
const handSec = document.querySelector(".hand.sec");

let secAngle = 0;
let minAngle = 0;
let hrAngle = 0;

function updateClock() {
    secAngle += 0.06;
    minAngle += 6 / 6000;
    hrAngle += 30 / 360000;
    handSec.style.transform = `rotate(${secAngle}deg)`;
    handMin.style.transform = `rotate(${minAngle}deg)`;
    handHours.style.transform = `rotate(${hrAngle}deg)`;
}



const display = document.querySelector('.display');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapsList = document.querySelector('.laps');

let startTime = 0;
let pausedTime = 0;
let timerInterval;
let running = false;

function startTimer() {
    if (!running) {
        if (startTime === 0) {
            startTime = new Date().getTime();
        } else {
            startTime = new Date().getTime() - pausedTime;
        }
        running = true;
        timerInterval = setInterval(updateTimeDisplay, 10);
        clock = setInterval(updateClock, 10);
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(timerInterval);
        clearInterval(clock);
        running = false;
        pausedTime = new Date().getTime() - startTime;
        startButton.innerText = "Play";
    }
}

function resetTimer() {
    window.location.reload();
}

function lapTimer() {
    if (running) {
        const lapTime = calculateElapsedTime();
        const formattedTime = formatTime(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = formattedTime;
        lapsList.appendChild(lapItem);
    }
}

function updateTimeDisplay() {
    handleVisibilityChange();
    const elapsedTime = calculateElapsedTime();
    display.textContent = formatTime(elapsedTime);
}

function calculateElapsedTime() {
    if(running){
        return (new Date().getTime() - startTime);
    }else{
        return pausedTime;
    }
}

function handleVisibilityChange() {
    if(document.hidden){
        clearInterval(clock);
        clearInterval(timerInterval);
    }
}

function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const centiseconds = (date.getMilliseconds() / 10).toFixed(0).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}:${centiseconds}`;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);