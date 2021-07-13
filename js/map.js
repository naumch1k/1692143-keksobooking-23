import { changeFormsState } from './form-state.js';
import { createSimilarOffer } from './create-offer.js';
import { compareOffers, matchesFilters  } from './filter.js';

const OFFER_COPY_COUNT = 10;
const DIGITS_AFTER_POINT = 5;

const mainMarkerDefaultCoordinates = {
  lat: 35.675,
  lng: 139.75,
};

const mapZoomLevel = 12;

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

// Set up the map

const map = L.map('map-canvas');

const initializeMap = () => {
  map
    .on('load', () => changeFormsState(false))
    .setView(mainMarkerDefaultCoordinates, mapZoomLevel);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

// Markers

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

// Set ad form address field value by moving the marker across the map

const generateAddress = ({lat, lng}) => `${lat.toFixed(DIGITS_AFTER_POINT)}, ${lng.toFixed(DIGITS_AFTER_POINT)}`;

const setAddress = (input) => {
  input.value = `${ generateAddress(mainMarkerDefaultCoordinates) }`;

  mainMarker.on('drag', (evt) => {
    input.value = `${ generateAddress(evt.target.getLatLng()) }`;
  });
};

const resetMap = () => {
  mainMarker.setLatLng(mainMarkerDefaultCoordinates);
  map.setView(mainMarkerDefaultCoordinates, mapZoomLevel);
};

const renderMap = (offers) => {
  markerGroup.clearLayers();

  const sortedOffers = offers
    .slice()
    .sort(compareOffers);

  let matchedOffers = 0;

  for ( let index = 0; index < sortedOffers.length; index++) {
    if (matchedOffers >= OFFER_COPY_COUNT) {
      break;
    }

    if (matchesFilters(sortedOffers[index])){
      createSimilarMarker(sortedOffers[index]);
      matchedOffers++;
    }
  }
};

export { initializeMap, renderMap, setAddress, resetMap };
