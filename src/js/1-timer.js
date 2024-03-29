import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import izitoast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const dateTimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let selectedDate;
startBtn.addEventListener('click', runTimer);
startBtn.disabled = true;

const datePicker = flatpickr(dateTimePicker, {
  enableTime: true,
  minuteIncrement: 1,
  time_24hr: true,
  defaultDate: new Date(),
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();   
      if (selectedDate < Date.now()) {
        startBtn.disabled = true;
        izitoast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
            position: 'topRight',
        });
    } else {
        startBtn.disabled = false;
      }
  }, 
});

function runTimer() {
    const timerInterval = setInterval(() => {
        const timeDiff = selectedDate - Date.now();
        
        if (timeDiff > 0) {
          const { days, hours, minutes, seconds } = convertMs(timeDiff);
          
            daysElement.textContent = addLeadingZero(days);
            hoursElement.textContent = addLeadingZero(hours);
            minutesElement.textContent = addLeadingZero(minutes);
            secondsElement.textContent = addLeadingZero(seconds);

            startBtn.disabled = true;
            dateTimePicker.disabled = true;
        } else {
            clearInterval(timerInterval);
        }
    }, 1000);
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};