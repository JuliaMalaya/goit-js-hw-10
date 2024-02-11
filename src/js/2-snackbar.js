import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stateInputs = document.querySelectorAll('input[name="state"]');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();

    const delay = parseInt(delayInput.value);
    let state;
    stateInputs.forEach(input => {
        if (input.checked) {
            state = input.value;
        }
    });

    const customPromise = new Promise((resolve, reject) => {
        if (state === 'fulfilled') {
            setTimeout(() => {
                resolve(delay);
            }, delay);
        } else {
            setTimeout(() => {
                reject(delay);
            }, delay);
        }
    });

    customPromise.then(delay => {
        iziToast.success({
            title: 'Success',
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topRight',
        });
    }).catch(delay => {
        iziToast.error({
            title: 'Error',
            message: `❌ Rejected promise in ${delay}ms`,
            position: 'topRight',
        });
    });
}
