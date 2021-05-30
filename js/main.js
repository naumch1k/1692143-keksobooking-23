const DIGITS_AFTER_POINT = 2;

const getRandomNumber = (min, max) =>
  (min >= 0 && min < max)
    ? Math.round(Math.random() * (max - min)) + min
    : Math.round(Math.random() * max);

getRandomNumber(-2, 10);

const getRandomFloatNumber = (min, max, digitsAfterPoint) =>
  (min >= 0 && min < max)
    ? Number((Math.random() * (max - min) + min).toFixed(digitsAfterPoint))
    : Number((Math.random() * max).toFixed(digitsAfterPoint));

getRandomFloatNumber(1.10, 1.15, DIGITS_AFTER_POINT);
