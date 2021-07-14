const ALERT_SHOW_TIME = 5000;
const ESCAPE_KEY = 'Escape';
const DEFAULT_TIMEOUT_DELAY = 500;

const ALERT_STYLE_SETTING = 'z-index:1100;position:absolute;left:0;top:95px;right:0;padding:10px 3px;font-size:30px;background-color:rgba(0, 0, 0, 0.8);color:white;text-align:center;';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');

  alertContainer.style.cssText = ALERT_STYLE_SETTING;
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscEvent = (evt) => evt.key === ESCAPE_KEY;

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
const debounce = (callback, timeoutDelay = DEFAULT_TIMEOUT_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { showAlert, isEscEvent, debounce };
