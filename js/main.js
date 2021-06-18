import { similarOffersFragment } from './card.js';
import { disableForms } from './form.js';

const cardListElement = document.querySelector('#map-canvas');
cardListElement.appendChild(similarOffersFragment);

disableForms();
