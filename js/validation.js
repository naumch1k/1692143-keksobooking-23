const TitleLength = {
  MIN: 30,
  MAX: 100,
};

const Price = {
  MIN: {
    'bungalow': 0,
    'flat': 1000,
    'hotel': 3000,
    'house': 5000,
    'palace': 10000,
  },
  MAX: 1000000,
};

const NOT_FOR_GUESTS_ROOM_NUMBER = 100;

const adForm = document.querySelector('.ad-form');
const titleInput = adForm.querySelector('#title');
const typeInput = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const timeInInput = adForm.querySelector('#timein');
const timeOutInput = adForm.querySelector('#timeout');
const roomNumberInput = adForm.querySelector('#room_number');
const capacityInput = adForm.querySelector('#capacity');

const enableValidation = () => {

  titleInput.addEventListener('input', () => {
    const valueLength = titleInput.value.length;

    if (valueLength < TitleLength.MIN) {
      titleInput.setCustomValidity(`Введите ещё ${ TitleLength.MIN - valueLength } симв.`);
    } else if (valueLength > TitleLength.MAX) {
      titleInput.setCustomValidity(`Удалите лишние ${ valueLength - TitleLength.MAX } симв.`);
    } else {
      titleInput.setCustomValidity('');
    }

    titleInput.reportValidity();
  });

  typeInput.addEventListener('input', () => {
    const currentTypeMinPrice = Price.MIN[typeInput.value];

    priceInput.placeholder = currentTypeMinPrice;
    priceInput.min = currentTypeMinPrice;
  });


  priceInput.addEventListener('input', () => {
    const currentTypeMinPrice = Price.MIN[typeInput.value];

    if (!priceInput.value) {
      priceInput.setCustomValidity('Введите цену, пожалуйста');
    } else if (priceInput.value > Price.MAX) {
      priceInput.setCustomValidity(`Максимально допустимая цена - ${Price.MAX}`);
    } else if (priceInput.value < currentTypeMinPrice) {
      priceInput.setCustomValidity(`Цена не может быть ниже ${currentTypeMinPrice}`);
    }  else {
      priceInput.setCustomValidity('');
    }

    priceInput.reportValidity();
  });

  timeInInput.addEventListener('input', () => {
    timeOutInput.value = timeInInput.value;
  });

  timeOutInput.addEventListener('input', () => {
    timeInInput.value = timeOutInput.value;
  });

  capacityInput.addEventListener('input', () => {
    if (Number(roomNumberInput.value) < Number(capacityInput.value)) {
      capacityInput.setCustomValidity('Столько народу не влезет в выбранное количество комнат');
    } else if (Number(roomNumberInput.value) === NOT_FOR_GUESTS_ROOM_NUMBER && Number(capacityInput.value)) {
      capacityInput.setCustomValidity('100 комнат — не для гостей');
    } else if (Number(roomNumberInput.value) !== NOT_FOR_GUESTS_ROOM_NUMBER && !Number(capacityInput.value)) {
      capacityInput.setCustomValidity('Не для гостей - выберите опцию 100 комнат');
    } else {
      capacityInput.setCustomValidity('');
    }

    capacityInput.reportValidity();
  });
};

export { enableValidation };
