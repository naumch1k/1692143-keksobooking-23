import { adFormSelector } from './utils/constants.js';
import { isEscEvent } from './utils/utils.js';

const adForm = document.querySelector(adFormSelector);

const successMessage = document.querySelector('#success')
  .content
  .querySelector('.success')
  .cloneNode(true);

const errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error')
  .cloneNode(true);

// Success message

const onSuccessMessageOverlayClick = () => closeSuccessMessage();
const onSuccessMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();

    closeSuccessMessage();
  }
};

function closeSuccessMessage () {
  successMessage.remove();

  successMessage.removeEventListener('mousedown', onSuccessMessageOverlayClick);
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
}

function showSuccessMessage () {
  adForm.insertAdjacentElement('beforeend', successMessage);

  successMessage.addEventListener('mousedown', onSuccessMessageOverlayClick);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
}

// Error message

const onErrorMessageOverlayClick = () => closeErrorMessage();
const onErrorMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();

    closeErrorMessage();
  }
};

function closeErrorMessage() {
  errorMessage.remove();

  errorMessage.removeEventListener('mousedown', onErrorMessageOverlayClick);
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
}

function showErrorMessage () {
  adForm.insertAdjacentElement('beforeend', errorMessage);

  errorMessage.addEventListener('mousedown', onErrorMessageOverlayClick);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
}

export { showSuccessMessage, showErrorMessage };
