// used in several modules
const inputSelectors = {
  titleInput: '#title',
  addressInput: '#address',
  typeInput: '#type',
  priceInput: '#price',
  timeInInput: '#timein',
  timeOutInput: '#timeout',
  roomNumberInput: '#room_number',
  capacityInput: '#capacity',
};

const adFormSelector = '.ad-form';

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

export { inputSelectors, adFormSelector, Price };
