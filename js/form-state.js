import { adFormSelector } from './utils/constants.js';

const formSelectors = {
  adFormDisabledClass: 'ad-form--disabled',
  mapFiltersFormDisabledClass: 'map__filters--disabled',
};

const adForm = document.querySelector(adFormSelector);
const mapFiltersForm = document.querySelector('.map__filters');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFiltersFormSelects = mapFiltersForm.querySelectorAll('select');
const mapFiltersFormFieldsets = mapFiltersForm.querySelectorAll('fieldset');

const changeFormsState = (isDisabled) => {

  const setFieldsState = (fields) => {
    for (let index = 0; index < fields.length; index++) {
      fields[index].disabled = isDisabled;
    }
  };

  setFieldsState(adFormFieldsets);
  setFieldsState(mapFiltersFormSelects);
  setFieldsState(mapFiltersFormFieldsets);

  if (isDisabled) {
    adForm.classList.add(formSelectors.adFormDisabledClass);
    mapFiltersForm.classList.add(formSelectors.mapFiltersFormDisabledClass);
  } else {
    adForm.classList.remove(formSelectors.adFormDisabledClass);
    mapFiltersForm.classList.remove(formSelectors.mapFiltersFormDisabledClass);
  }
};

export { changeFormsState };
