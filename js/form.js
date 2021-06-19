const formSelectors = {
  adFormDisabledClass: 'ad-form--disabled',
  mapFiltersFormDisabledClass: 'map__filters--disabled',
};

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormSelects = mapFiltersForm.querySelectorAll('select');
const mapFiltersFormFieldsets = mapFiltersForm.querySelectorAll('fieldset');

const disableForms = (isDisable) => {

  const setFieldsState = (fields) => {
    for (let index = 0; index < fields.length; index++) {
      fields[index].disabled = isDisable;
    }
  };

  setFieldsState(adFormFieldsets);
  setFieldsState(mapFiltersFormSelects);
  setFieldsState(mapFiltersFormFieldsets);

  if (isDisable) {
    adForm.classList.add(formSelectors.adFormDisabledClass);
    mapFiltersForm.classList.add(formSelectors.mapFiltersFormDisabledClass);
  } else {
    adForm.classList.remove(formSelectors.adFormDisabledClass);
    mapFiltersForm.classList.remove(formSelectors.mapFiltersFormDisabledClass);
  }
};

export { disableForms };
