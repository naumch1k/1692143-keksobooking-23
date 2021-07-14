import { changeFormsState } from './form-state.js';
import { createSimilarOffer } from './create-offer.js';
import { compareOffers, matchesFilters  } from './filter.js';

const OFFER_COPY_COUNT = 10;
const MAP_ZOOM_LEVEL = 12;
const DIGITS_AFTER_POINT = 5;

const mainMarkerDefaultCoordinates = {
  lat: 35.675,
  lng: 139.75,
};

const iconSettings = {
  mainPin: {
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  },
  similarPin: {
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  },
};

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon(iconSettings.mainPin);
const similarPinIcon = L.icon(iconSettings.similarPin);

const mainMarker = L.marker(
  mainMarkerDefaultCoordinates,
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(map);

const initializeMap = () => {
  map
    .on('load', () => changeFormsState(false))
    .setView(mainMarkerDefaultCoordinates, MAP_ZOOM_LEVEL);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const createSimilarMarker = (offer) => {
  const similarMarker = L.marker(
    {
      lat: offer.location.lat,
      lng: offer.location.lng,
    },
    {
      icon: similarPinIcon,
    },
  );
  similarMarker
    .addTo(markerGroup)
    .bindPopup(
      createSimilarOffer(offer),
      {
        keepInView: true,
      },
    );
};

const generateAddress = ({lat, lng}) => `${lat.toFixed(DIGITS_AFTER_POINT)}, ${lng.toFixed(DIGITS_AFTER_POINT)}`;

const setAddress = (input) => {
  input.value = `${ generateAddress(mainMarkerDefaultCoordinates) }`;

  mainMarker.on('drag', (evt) => {
    input.value = `${ generateAddress(evt.target.getLatLng()) }`;
  });
};

const resetMap = () => {
  mainMarker.setLatLng(mainMarkerDefaultCoordinates);
  map.setView(mainMarkerDefaultCoordinates, MAP_ZOOM_LEVEL);
};

const renderMap = (offers) => {
  markerGroup.clearLayers();

  const sortedOffers = offers
    .slice()
    .sort(compareOffers);

  let matchedOffers = 0;

  for ( let i = 0; i < sortedOffers.length; i++) {
    if (matchedOffers >= OFFER_COPY_COUNT) {
      break;
    }

    if (matchesFilters(sortedOffers[i])){
      createSimilarMarker(sortedOffers[i]);
      matchedOffers++;
    }
  }
};

export { initializeMap, renderMap, setAddress, resetMap };
