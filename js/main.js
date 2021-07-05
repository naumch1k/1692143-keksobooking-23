import { enableValidation } from './validation.js';
import { renderMap } from './map.js';
import { setFormSubmit, handleFormSubmit } from './form.js';
import { showErrorMessage } from './form-message.js';
import { getData } from './api.js';

const OFFER_COPY_COUNT = 10;

enableValidation();

getData((offers) => renderMap(offers.slice(0, OFFER_COPY_COUNT)));

setFormSubmit(handleFormSubmit, showErrorMessage);
