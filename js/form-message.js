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

const closeSuccessMessage = () => {
  successMessage.remove();

  // eslint-disable-next-line no-use-before-define
  successMessage.removeEventListener('mousedown', onSuccessMessageOverlayClick);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
};

const onSuccessMessageOverlayClick = () => closeSuccessMessage();
const onSuccessMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();

    closeSuccessMessage();
  }
};

const showSuccessMessage = () => {
  adForm.insertAdjacentElement('beforeend', successMessage);

  successMessage.addEventListener('mousedown', onSuccessMessageOverlayClick);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
};

// Error message

const closeErrorMessage = () => {
  errorMessage.remove();

  // eslint-disable-next-line no-use-before-define
  errorMessage.removeEventListener('mousedown', onErrorMessageOverlayClick);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
};

const onErrorMessageOverlayClick = () => closeErrorMessage();
const onErrorMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();

    closeErrorMessage();
  }
};

const showErrorMessage = () => {
  adForm.insertAdjacentElement('beforeend', errorMessage);

  errorMessage.addEventListener('mousedown', onErrorMessageOverlayClick);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
};

export { showSuccessMessage, showErrorMessage };
