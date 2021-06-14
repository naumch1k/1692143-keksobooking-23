import {createOffer} from './data.js';


const OFFER_COPY_COUNT = 10;

new Array(OFFER_COPY_COUNT).fill(null).map(() => createOffer());
