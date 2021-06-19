import {
  getRandomNumber,
  getRandomFloatNumber,
  getRandomArrayElement,
  generateAvatarLink,
  createArray
} from './utils.js';

// constants

const OFFER_COPY_COUNT = 1;

const DIGITS_AFTER_POINT = 5;
const USER_AVATAR_QUANTITY = 11;
const OFFER_MAX_PRICE = 1000000;

const RoomsNumber = {
  MIN: 1,
  MAX: 3,
};

const GUESTS_MAX_NUMBER = 2;

const OfferCoordinates = {
  LATITUDE: {
    MIN: 35.65,
    MAX: 35.7,
  },
  LONGITUDE: {
    MIN: 139.7,
    MAX: 139.8,
  },
};

const OFFER_TITLES = [
  'Уютный домик у озера',
  'Фешенебельный гараж на окраине Бутово',
  'Койко-место в брутальном холостяцком бунгало',
  'Аутентичный лофт в здании помещении газовой котельной',
];

const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const OFFER_DESCRIPTIONS = [
  'Коттедж может вместить до 30 человек. Из благ цивилизации есть электроэнергия, горячая вода, канализация, имеются душевые кабины.',
  'В доме необходимо соблюдать правило общежития, курить можно на кухне и на улице, выпивать можно в меру, не конфликтовать с другими жильцами.',
  'Для приезжих, студентов, строителям. Хорошее транспортное сообщение, до метро 10 мин.',
  'Внутри царит брутальная атмосфера: неоштукатуренные стены, открытая проводка, металлические двухъярусные койки, стоящие прямо на бетонной стяжке.',
];

const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createOffer = () => {
  const randomOfferLat = getRandomFloatNumber(OfferCoordinates.LATITUDE.MIN, OfferCoordinates.LATITUDE.MAX, DIGITS_AFTER_POINT);
  const randonOfferLng = getRandomFloatNumber(OfferCoordinates.LONGITUDE.MIN, OfferCoordinates.LONGITUDE.MAX, DIGITS_AFTER_POINT);

  return {
    author: {
      avatar: generateAvatarLink(getRandomNumber(1, USER_AVATAR_QUANTITY)),
    },
    offer: {
      title: getRandomArrayElement(OFFER_TITLES),
      address: `${randomOfferLat}, ${randonOfferLng}`,
      price: getRandomNumber(0, OFFER_MAX_PRICE),
      type: getRandomArrayElement(OFFER_TYPES),
      rooms: getRandomNumber(RoomsNumber.MIN, RoomsNumber.MAX),
      guests: getRandomNumber(0, GUESTS_MAX_NUMBER),
      checkin: getRandomArrayElement(CHECKIN_TIMES),
      checkout: getRandomArrayElement(CHECKOUT_TIMES),
      features: createArray(OFFER_FEATURES, OFFER_FEATURES.length),
      description: getRandomArrayElement(OFFER_DESCRIPTIONS),
      photos: createArray(OFFER_PHOTOS, OFFER_PHOTOS.length),
    },
    location: {
      lat: randomOfferLat,
      lng: randonOfferLng,
    },
  };
};

const createOffers = () =>  new Array(OFFER_COPY_COUNT).fill(null).map(() => createOffer());

export { createOffers };
