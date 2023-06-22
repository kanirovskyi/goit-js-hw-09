// библиотека notiflix
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const firstDelay = document.querySelector('[name="delay"]');
const delayStep = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');
const form = document.querySelector(".form");

form.addEventListener("submit", formSubmit);

function formSubmit(event) {
  event.preventDefault();
  

  let position = 0;
  let delay = Number(firstDelay.value);
  const step = Number(delayStep.value);
  const amount = Number(amountEl.value);

  for (let i = 0; i < amount; i += 1) {
    position += 1;

    createPromise(position, delay)
  .then(({ position, delay }) => {
     Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    delay += step;
  }
  form.reset()
  }


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
    if (shouldResolve) {
      resolve({ position, delay });
    }
    else {
      reject({ position, delay });
    }
      
    }, delay)
  })

  
}
