// constants

const DIGITS_AFTER_POINT = 5;
const USER_AVATAR_QUANTITY = 8;
const OFFER_MAX_PRICE = 100000;
const ROOMS_MIN_NUMBER = 1;
const ROOMS_MAX_NUMBER = 3;
const GUESTS_MAX_NUMBER = 2;
const OFFER_MIN_LATITUDE = 35.65;
const OFFER_MAX_LATITUDE = 35.7;
const OFFER_MIN_LONGITUDE = 139.7;
const OFFER_MAX_LONGITUDE = 139.8;
const OFFER_COPY_COUNT = 10;

// const USER_AVATARS = [
//   'img/avatars/user01.png',
//   'img/avatars/user02.png',
//   'img/avatars/user03.png',
//   'img/avatars/user04.png',
//   'img/avatars/user05.png',
//   'img/avatars/user06.png',
//   'img/avatars/user07.png',
//   'img/avatars/user08.png',
// ];

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

// utils

const getRandomNumber = (min, max) =>
  (min >= 0 && min < max)
    ? Math.round(Math.random() * (max - min)) + min
    : Math.round(Math.random() * max);

const getRandomFloatNumber = (min, max, digitsAfterPoint) =>
  (min >= 0 && min < max)
    ? Number((Math.random() * (max - min) + min).toFixed(digitsAfterPoint))
    : Number((Math.random() * max).toFixed(digitsAfterPoint));

const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

const generateAvatarLink = (index) =>
  (index.toString().length < 2)
    ? `img/avatars/user0${index}.png`
    // в папке img 11 изображений, - на случай, если нужно будет составить адрес типа user10
    : `img/avatars/user${index}.png`;

const createArray = (array, maxLength) => {
  const newArray = [];
  for (let index = 0; index <= getRandomNumber(0, maxLength); index++) {
    const tempElement = getRandomArrayElement(array);
    if (!newArray.includes(tempElement)) {
      newArray.push(tempElement);
    }
  }
  return newArray;
};

const getCoordinates = (min, max, digitsAfterPoint) => getRandomFloatNumber(min, max, digitsAfterPoint);

// create offer

const createOffer = () => {
  const randomOfferLat = getCoordinates(OFFER_MIN_LATITUDE, OFFER_MAX_LATITUDE, DIGITS_AFTER_POINT);
  const randonOfferLng = getCoordinates(OFFER_MIN_LONGITUDE, OFFER_MAX_LONGITUDE, DIGITS_AFTER_POINT);

  return {
    author: {
      // avatar, строка — адрес изображения вида img/avatars/user{{xx}}.png,
      //                 -- не понятно, от нас хотят, шаблонную строку или как и везде из массива значений по индексу
      // где {{xx}} — это число от 1 до 8 с ведущим нулём,
      //                 -- а почему изображений 11?
      // Адреса изображений не повторяются
      //                 -- если от 1 до 8 до на 10 объектов не хватит
      avatar: generateAvatarLink(getRandomNumber(1, USER_AVATAR_QUANTITY)),
    },
    offer: {
      title: getRandomArrayElement(OFFER_TITLES),
      address: `${randomOfferLat}, ${randonOfferLng}`,
      price: getRandomNumber(0, OFFER_MAX_PRICE),
      type: getRandomArrayElement(OFFER_TYPES),
      rooms: getRandomNumber(ROOMS_MIN_NUMBER, ROOMS_MAX_NUMBER),
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

new Array(OFFER_COPY_COUNT).fill(null).map(() => createOffer());
