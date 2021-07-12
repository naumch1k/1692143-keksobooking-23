const filterSelectors = {
  filters: '.map__filters',
  filter: '.map__filter',
  features: '.map__features',
  typeFilter: '#housing-type',
  priceFilter: '#housing-price',
  roomsFilter: '#housing-rooms',
  guestsFilter: '#housing-guests',
};

const features = document.querySelector(filterSelectors.features);
const filters = document.querySelector(filterSelectors.filters);
const typeFilter = filters.querySelector(filterSelectors.typeFilter);
const priceFilter = filters.querySelector(filterSelectors.priceFilter);
const roomsFilter = filters.querySelector(filterSelectors.roomsFilter);
const guestsFilter = filters.querySelector(filterSelectors.guestsFilter);

const DEFAULT_VALUE = 'any';

const filterElements = {
  type: typeFilter,
  price: priceFilter,
  rooms: roomsFilter,
  guests: guestsFilter,
};

const filterValues = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
};

const priceValues = {
  low: 'low',
  middle: 'middle',
  high: 'high',
};

const MaxPrices = {
  forLowValued: 10000,
  forMiddleValued: 50000,
};

// Compare offers

let enabledFeatures = [];

const getOfferRank = ({offer}) => {
  let rank = 0;

  for (let index = 0; index < enabledFeatures.length; index++) {
    if (offer.features && offer.features.includes(enabledFeatures[index])) {
      rank += 1;
    }
  }

  return rank;
};

const compareOffers = (offerA, offerB) => {
  const rankA = getOfferRank(offerA);
  const rankB = getOfferRank(offerB);

  return rankB - rankA;
};

const setFeaturesClick = (cb) => {
  features.addEventListener('change', () => {
    const checkedFeatures = Array.from(features.querySelectorAll('input:checked'));
    enabledFeatures = checkedFeatures.map(((item) => item.value));

    cb();
  });
};

//  Filter offers

const isFilterMatched = (filterValue, offerCondition) => filterValue === String(offerCondition) || filterValue === DEFAULT_VALUE;

const isPriceMatched = (filterValue, offerCondition) => {
  if (filterValue === priceValues.low) {
    return offerCondition < MaxPrices.forLowValued;
  } else if (filterValue === priceValues.middle) {
    return offerCondition > MaxPrices.forLowValued && offerCondition < MaxPrices.forMiddleValued;
  } else if (filterValue === priceValues.high) {
    return offerCondition > MaxPrices.forMiddleValued;
  }
  return true;
};

const filterOffers = (({offer}) => {
  const typeMatched = isFilterMatched(filterValues.type, offer.type);
  const priceMacthed = isPriceMatched(filterValues.price, offer.price);
  const roomsMacthed = isFilterMatched(filterValues.rooms, offer.rooms);
  const guestsMacthed = isFilterMatched(filterValues.guests, offer.guests);

  return typeMatched && priceMacthed && roomsMacthed && guestsMacthed;
});

const setFiltersClick = (cb) => {
  Object.keys(filterValues).forEach((key) => {
    filterElements[key].addEventListener('change', (evt) => {
      filterValues[key] = evt.target.value;

      cb();
    });
  });
};

const resetFilters = () => {
  filters.reset();
};

export { compareOffers, filterOffers, setFeaturesClick, setFiltersClick, resetFilters };
