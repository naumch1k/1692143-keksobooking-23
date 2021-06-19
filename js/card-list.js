import { createOffers } from './data.js';

const cardSelectors = {
  card: '.popup',
  cardTemplate: '#card',
  title: '.popup__title',
  address: '.popup__text--address',
  price: '.popup__text--price',
  type: '.popup__type',
  capacity: '.popup__text--capacity',
  time: '.popup__text--time',
  features: '.popup__features',
  feature: '.popup__feature',
  description: '.popup__description',
  photos: '.popup__photos',
  photo: 'popup__photo',
  avatar: '.popup__avatar',
};

const OFFER_TYPES = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const addPhotos = function (cardData, photoList) {
  const photos = cardData.photos;

  photos.forEach((item) => {
    const photo = document.createElement('img');
    photo.style.width = '25%';//временно
    photo.src = item;
    photo.classList.add(cardSelectors.photo);
    photoList.appendChild(photo);
  });
};

// Create new elements using template

const cardListElement = document.querySelector('#map-canvas');
const similarOffersFragment = document.createDocumentFragment();

const cardTemplate = document.querySelector(cardSelectors.cardTemplate)
  .content
  .querySelector(cardSelectors.card);

const similarOffers = createOffers();

similarOffers.forEach(({ offer, author }) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector(cardSelectors.title).textContent = offer.title;
  cardElement.querySelector(cardSelectors.address).textContent = offer.address;
  cardElement.querySelector(cardSelectors.price).textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector(cardSelectors.type).textContent = OFFER_TYPES[offer.type];
  cardElement.querySelector(cardSelectors.capacity).textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector(cardSelectors.time).textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const featureListElement = cardElement.querySelector(cardSelectors.features);
  const modifiers = offer.features.map((feature) => `popup__feature--${feature}`);
  featureListElement.querySelectorAll(cardSelectors.feature).forEach((item) => {
    const modifier = item.classList[1];

    if (!modifiers.includes(modifier)) {
      item.remove();
    }
  });

  cardElement.querySelector(cardSelectors.description).textContent = offer.description;

  const photoListElement = cardElement.querySelector(cardSelectors.photos);
  photoListElement.innerHTML = '';
  addPhotos(offer, photoListElement);

  cardElement.querySelector(cardSelectors.avatar).src = author.avatar;

  similarOffersFragment.appendChild(cardElement);
});

const renderCardListElement = () => cardListElement.appendChild(similarOffersFragment);

export { renderCardListElement };
