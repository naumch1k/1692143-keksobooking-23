import { createOffers } from './data.js';

const cardSelectors = {
  card: '.popup',
  cardTemplateId: '#card',
  title: '.popup__title',
  address: '.popup__text--address',
  price: '.popup__text--price',
  type: '.popup__type',
  capacity: '.popup__text--capacity',
  time: '.popup__text--time',
  features: '.popup__features',
  feature: '.popup__feature',
  featureClass: 'popup__feature',
  description: '.popup__description',
  photos: '.popup__photos',
  photoClass: 'popup__photo',
  avatar: '.popup__avatar',
};

const OFFER_TYPES = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const addPhotos = (cardData, photoList) => {
  const photos = cardData.photos;

  photos.forEach((item) => {
    const photo = document.createElement('img');
    photo.style.width = '25%';//временно
    photo.src = item;
    photo.classList.add(cardSelectors.photoClass);

    photoList.appendChild(photo);
  });
};

const addFeatures = (cardData, featuresList) => {
  const features = cardData.features;

  features.forEach((item) => {
    const feature = document.createElement('li');
    feature.classList.add(cardSelectors.featureClass);
    feature.classList.add(`${cardSelectors.featureClass}--${item}`);

    featuresList.appendChild(feature);
  });
};

// Create new elements using template

const cardListElement = document.querySelector('#map-canvas');
const similarOffersFragment = document.createDocumentFragment();

const cardTemplate = document.querySelector(cardSelectors.cardTemplateId)
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
  featureListElement.innerHTML = '';
  addFeatures(offer, featureListElement);

  cardElement.querySelector(cardSelectors.description).textContent = offer.description;

  const photoListElement = cardElement.querySelector(cardSelectors.photos);
  photoListElement.innerHTML = '';
  addPhotos(offer, photoListElement);

  cardElement.querySelector(cardSelectors.avatar).src = author.avatar;

  similarOffersFragment.appendChild(cardElement);
});

const renderCardListElement = () => cardListElement.appendChild(similarOffersFragment);

export { renderCardListElement };
