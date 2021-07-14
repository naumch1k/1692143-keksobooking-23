import { changeFormsState } from './form-state.js';
import { initializeMap, renderMap } from './map.js';
import { enableValidation } from './validation.js';
import { setFormSubmit, onFormSubmit } from './form.js';
import { showErrorMessage } from './form-message.js';
import { getData } from './api.js';
import { setFeaturesClick, setFiltersClick } from './filter.js';
import { debounce } from './utils/utils.js';

const RERENDER_DELAY = 500;

changeFormsState(true);
initializeMap();

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

setFormSubmit(onFormSubmit, showErrorMessage);
