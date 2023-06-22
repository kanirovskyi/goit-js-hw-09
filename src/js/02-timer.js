// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// библиотека notiflix
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDate = document.querySelector("#datetime-picker");
const startBtn = document.querySelector('[data-start]');
const dataDay = document.querySelector('[data-days]');
const dataHour = document.querySelector('[data-hours]');
const dataMin = document.querySelector('[data-minutes]');
const dataSec = document.querySelector('[data-seconds]');

//переменные для сохранения времени интервала и времени
startBtn.disabled = true;
const INTERVAL = 1000;
let timerId = null;

//переменные для сохранения времени
let dataActual = null;
let dataChoise = null;
let dataFinish = null;

startBtn.addEventListener("click", onStart);


// опции для библиотеки flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      dataChoise = selectedDates[0];
      dataActual = new Date();
      dataFinish = dataChoise - dataActual;

      if (dataFinish > 0) {
          Notify.success('Вйо!')
          startBtn.disabled = false;
      }
      else {
          Notify.failure('Ти, рагуль, обери нормальну дату!');
          startBtn.disabled = true;
      }
  },
};

flatpickr(inputDate, options);


function onStart() {

    dataActual = new Date();
    dataFinish = dataChoise - dataActual;

    if (dataFinish > 0) {
        Notify.success('Почали!');
        startCountdown();
        startBtn.disabled = true;
        inputDate.disabled = true;

    }
    
      else {
          Notify.failure('Ти, рагуль, обери нормальну дату!');
        startBtn.disabled = true;
      }
}

function startCountdown() {
    interfaceUpdate(addLeadingZero(convertMs(dataFinish)));
    timerId = setInterval(() => {
        dataFinish -= INTERVAL;
        interfaceUpdate(addLeadingZero(convertMs(dataFinish)));

        if (dataFinish < INTERVAL) {
            clearInterval(timerId);
            Notify.success('Час вийшов!')

            inputDate.disabled = false;
            startBtn.disabled = false;
        }
    }, INTERVAL)
}

function interfaceUpdate({formatDays, formatHours, formatMinutes, formatSeconds}) {
    dataDay.textContent = formatDays;
    dataHour.textContent = formatHours;
    dataMin.textContent = formatMinutes;
    dataSec.textContent = formatSeconds;
}

// функция для конвертации времени
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// функция для форматирования времени
function formatTime(time) {
  return String(time).padStart(2, '0');
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  const formatDays = formatTime(days);
  const formatHours = formatTime(hours);
  const formatMinutes = formatTime(minutes);
  const formatSeconds = formatTime(seconds);

  return { formatDays, formatHours, formatMinutes, formatSeconds };
}