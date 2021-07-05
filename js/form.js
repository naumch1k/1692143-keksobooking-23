import {
  inputSelectors,
  adFormSelector,
  Price
} from './constants.js';

import { sendData } from './api.js';
import { setAddress, resetMap } from './map.js';
import { showSuccessMessage } from './form-message.js';

const adForm = document.querySelector(adFormSelector);

const addressInput = adForm.querySelector(inputSelectors.addressInput);
const priceInput = adForm.querySelector(inputSelectors.priceInput);
const typeInput = adForm.querySelector(inputSelectors.typeInput);

const adFormResetButton = adForm.querySelector('.ad-form__reset');

const resetPriceInput = () => {
  priceInput.placeholder = Price.MIN[typeInput.value];
};

const resetForm = () => {
  adForm.reset();
  setAddress(addressInput);
  resetPriceInput();
};

const handleFormSubmit = () => {
  showSuccessMessage();
  resetForm();
  resetMap();
};

const setFormSubmit = (onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );
  });
};

adFormResetButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  resetForm();
  resetMap();
});

export { setFormSubmit, handleFormSubmit };
