import { changeFormsState } from './form.js';
import { createOffers } from './data.js';
import { createSimilarOffer } from './create-offer.js';

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

const map = L.map('map-canvas')
  .on('load', () => {
    changeFormsState(false);
  })
  .setView(mainMarkerDefaultCoordinates, mapZoomLevel);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

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
);

mainMarker.addTo(map);

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
    //.addTo(map)
    .addTo(markerGroup)
    .bindPopup(
      createSimilarOffer(offer),
      {
        keepInView: true,
      },
    );

  return similarMarker;
};

//markerGroup.removeLayer();

// Set ad form address field value by moving the marker across the map

const generateAddress = ({lat, lng}) => `${lat.toFixed(DIGITS_AFTER_POINT)}, ${lng.toFixed(DIGITS_AFTER_POINT)}`;

const setAddress = (input) => {
  input.value = `${ generateAddress(mainMarkerDefaultCoordinates) }`;

  mainMarker.on('drag', (evt) => {
    input.value = `${ generateAddress(evt.target.getLatLng()) }`;
  });
};

const renderMap = () => createOffers().forEach((offer) => createSimilarMarker(offer));

export { renderMap, setAddress };
