import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

function onFetchError() {
  Toastify({
    text: 'There is no such image. Enter again.',
    duration: 3000,
    gravity: 'top', // `top` or `bottom`
    position: 'left', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    className: 'info info-error',
    offset: {
      x: 615, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: 80, // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
  }).showToast();
}

export default { onFetchError };
