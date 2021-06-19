const TitleLength = {
  MIN: 30,
  MAX: 100,
};

const Price = {
  // MIN: {
  //   'Бунгало': 0,
  //   'Квартира': 1000,
  //   'Отель': 3000,
  //   'Дом': 5000,
  //   'Дворец': 10000,
  // },
  MAX: 1000000,
};

const adForm = document.querySelector('.ad-form');
const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');
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

  priceInput.addEventListener('input', () => {
    if (priceInput.value > Price.MAX) {
      priceInput.setCustomValidity(`Максимально допустимая цена - ${Price.MAX}`);
    } else if (!priceInput.value) {
      priceInput.setCustomValidity('Введите цену, пожалуйста');
    } else {
      priceInput.setCustomValidity('');
    }

    priceInput.reportValidity();
  });

  capacityInput.addEventListener('input', () => {
    if (Number(roomNumberInput.value) < Number(capacityInput.value)) {
      capacityInput.setCustomValidity('Столько народу не влезет в выбранное количество комнат');
    } else if (Number(roomNumberInput.value) === 100 && Number(capacityInput.value) !== 0) {
      capacityInput.setCustomValidity('100 комнат — не для гостей');
    } else if (Number(roomNumberInput.value) !== 100 && Number(capacityInput.value) === 0) {
      capacityInput.setCustomValidity('Не для гостей - выберите опцию 100 комнат');
    } else {
      capacityInput.setCustomValidity('');
    }

    capacityInput.reportValidity();
  });
};

export { enableValidation };
