import { enableValidation } from './validation.js';
import { renderMap } from './map.js';
import { setFormSubmit, handleFormSubmit } from './form.js';
import { showErrorMessage } from './form-message.js';
import { getData } from './api.js';
import { setFeaturesClick, setFiltersClick } from './filter.js';
import { debounce } from './utils/utils.js';

const RERENDER_DELAY = 500;

enableValidation();

getData((offers) => {
  renderMap(offers);
  setFeaturesClick(debounce(
    () => renderMap(offers),
    RERENDER_DELAY,
  ));
  setFiltersClick(debounce(
    () => renderMap(offers),
    RERENDER_DELAY,
  ));
});

setFormSubmit(handleFormSubmit, showErrorMessage);
