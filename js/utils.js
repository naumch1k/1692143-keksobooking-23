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

export { getRandomNumber, getRandomFloatNumber, getRandomArrayElement, generateAvatarLink, createArray };
