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

const offerTypes = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const PhotoSize = {
  WIDTH: '45px',
  HEIGHT: '40px',
};

const addPhotos = (cardData, photoList) => {
  photoList.innerHTML = '';
  const photos = cardData.photos;

  photos.forEach((item) => {
    const photo = document.createElement('img');
    photo.style.width = PhotoSize.WIDTH;
    photo.style.height = PhotoSize.HEIGHT;
    photo.src = item;
    photo.classList.add(cardSelectors.photoClass);

    photoList.appendChild(photo);
  });
};

const addFeatures = (cardData, featuresList) => {
  featuresList.innerHTML = '';
  const features = cardData.features;

  features.forEach((item) => {
    const feature = document.createElement('li');
    feature.classList.add(cardSelectors.featureClass);
    feature.classList.add(`${cardSelectors.featureClass}--${item}`);

    featuresList.appendChild(feature);
  });
};

// Create new element using template

const cardTemplate = document.querySelector(cardSelectors.cardTemplateId)
  .content
  .querySelector(cardSelectors.card);

const createSimilarOffer = (({ offer, author }) => {
  const cardElement = cardTemplate.cloneNode(true);

  const typeElement = cardElement.querySelector(cardSelectors.type);
  const capacityElement = cardElement.querySelector(cardSelectors.capacity);
  const timeElement = cardElement.querySelector(cardSelectors.time);
  const featureListElement = cardElement.querySelector(cardSelectors.features);
  const descriptionElement = cardElement.querySelector(cardSelectors.description);
  const avatarElement = cardElement.querySelector(cardSelectors.avatar);
  const photoListElement = cardElement.querySelector(cardSelectors.photos);

  // required fields, don't need to be checked
  cardElement.querySelector(cardSelectors.title).textContent = offer.title;
  cardElement.querySelector(cardSelectors.address).textContent = offer.address;
  cardElement.querySelector(cardSelectors.price).textContent = `${offer.price} ₽/ночь`;

  (offer.type) ? typeElement.textContent = offerTypes[offer.type] : typeElement.remove();
  (offer.rooms && offer.guests) ? capacityElement.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей` : capacityElement.remove();
  (offer.checkin && offer.checkout) ? timeElement.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}` : timeElement.remove();
  (offer.features) ? addFeatures(offer, featureListElement) : featureListElement.remove();
  (offer.description) ? descriptionElement.textContent = offer.description : descriptionElement.remove();
  (offer.photos) ? addPhotos(offer, photoListElement) : photoListElement.remove();
  (author.avatar) ? avatarElement.src = author.avatar : avatarElement.remove();

  return cardElement;
});

export { createSimilarOffer };
