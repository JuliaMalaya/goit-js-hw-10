import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
/*import izitoast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";*/

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
startBtn.addEventListener('click', runTimer);
startBtn.disabled = true;

const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let userSelectedDate;

const calendar = flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();   

      if (userSelectedDate < Date.now()) {
        startBtn.disabled = true;
        izitoast.error({
            title: '',
            message: 'Please choose a date in the future',
            position: 'topRight',
        });
    } else {
        startBtn.disabled = false;
      }
  }, 
});

function runTimer() {
    const intervalID = setInterval(() => {
        const timeDiff = userSelectedDate - Date.now();
        
        if (timeDiff > 0) {
            const { days, hours, minutes, seconds } = convertMs(timeDiff);

            daysSpan.textContent = addLeadingZero(days);
            hoursSpan.textContent = addLeadingZero(hours);
            minutesSpan.textContent = addLeadingZero(minutes);
            secondsSpan.textContent = addLeadingZero(seconds);

            startBtn.disabled = true;
        } else {
            clearInterval(intervalID);
        }
    }, 1000);
};

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

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};
/*
Зворотній відлік до певної дати у JavaScript можна реалізувати наступним чином. Ось приклад скрипта таймера:

html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Countdown Timer</title>
    <style>
        #timer {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin-top: 50px;
        }
    </style>
</head>
<body>
    <div id="timer"></div>

    <script>
        // Встановлюємо дату, до якої будемо рахувати
        const targetDate = new Date('2024-12-31T23:59:59').getTime();

        // Оновлення таймера кожної секунди
        const timerInterval = setInterval(updateTimer, 1000);

        function updateTimer() {
            // Отримуємо поточну дату та час
            const currentDate = new Date().getTime();

            // Знаходимо різницю між поточною датою та цільовою датою
            const difference = targetDate - currentDate;

            // Обчислюємо час у днях, годинах, хвилинах та секундах
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            // Оновлюємо вміст елемента з ID "timer" з відліком
            document.getElementById('timer').innerHTML = `
                ${days}д ${hours}г ${minutes}хв ${seconds}с
            `;

            // Перевіряємо, чи досягли ми цільової дати, якщо так, то очищуємо інтервал
            if (difference < 0) {
                clearInterval(timerInterval);
                document.getElementById('timer').innerHTML = 'Час вийшов!';
            }
        }
    </script>
</body>
</html>
У цьому коді ми встановлюємо цільову дату, до якої ми хочемо здійснювати зворотній відлік. Потім ми використовуємо setInterval для оновлення таймера кожну секунду. В функції updateTimer ми обчислюємо різницю між поточною датою та цільовою, а потім розраховуємо скільки днів, годин, хвилин і секунд залишилося до цільової дати. Потім ми оновлюємо вміст елемента з ID "timer" з цими значеннями.

Коли різниця стає менше нуля, це означає, що ми досягли або перевищили цільову дату, і ми очищаємо інтервал таймера.
*/