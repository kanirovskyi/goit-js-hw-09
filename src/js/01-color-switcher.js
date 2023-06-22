const bodyColor = document.querySelector("body");
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

stopBtn.disabled = true;
const INTERVAL = 1000;
let colorHexId = null;

//генератор случайного цвета
function getRandomHexColor() {
  return bodyColor.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

startBtn.addEventListener("click", onStart);
stopBtn.addEventListener("click", onStop);

function onStart() {
    startBtn.disabled = true;
    stopBtn.disabled = false;

    colorHexId = setInterval(() => {getRandomHexColor()}, INTERVAL);
}

function onStop() {

    clearInterval(colorHexId);

    startBtn.disabled = false;
    stopBtn.disabled = true;
}