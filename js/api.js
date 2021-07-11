import { showAlert } from './utils/utils.js';

const Url = {
  SERVER: 'https://23.javascript.pages.academy/keksobooking',
  DATA: 'https://23.javascript.pages.academy/keksobooking/data',
};

const getData = (onSuccess) => {
  fetch(Url.DATA)
    .then((response) => response.json())
    .then(onSuccess)
    .catch(() => {
      showAlert('Не удалось загрузить данные с сервера');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    Url.SERVER,
    {
      method: 'POST',
      body,
    },
  )
    .then((res) => {
      if (res.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
