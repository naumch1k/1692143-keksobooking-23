const filterSelectors = {
  filters: '.map__filters',
  filter: '.map__filter',
  features: '.map__features',
  typeFilter: '#housing-type',
  priceFilter: '#housing-price',
  roomsFilter: '#housing-rooms',
  guestsFilter: '#housing-guests',
};

const DEFAULT_VALUE = 'any';

const MaxPrices = {
  FOR_LOW_VALUED: 10000,
  FOR_MIDDLE_VALUED: 50000,
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

const features = document.querySelector(filterSelectors.features);
const filters = document.querySelector(filterSelectors.filters);
const typeFilter = filters.querySelector(filterSelectors.typeFilter);
const priceFilter = filters.querySelector(filterSelectors.priceFilter);
const roomsFilter = filters.querySelector(filterSelectors.roomsFilter);
const guestsFilter = filters.querySelector(filterSelectors.guestsFilter);


const filterElements = {
  type: typeFilter,
  price: priceFilter,
  rooms: roomsFilter,
  guests: guestsFilter,
};

// Compare offers

let enabledFeatures = [];

const getOfferRank = ({offer}) => {
  let rank = 0;

  for (let i = 0; i < enabledFeatures.length; i++) {
    if (offer.features && offer.features.includes(enabledFeatures[i])) {
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

//  Check if matches filters

const isFilterMatched = (filterValue, offerCondition) => filterValue === String(offerCondition) || filterValue === DEFAULT_VALUE;

const isPriceMatched = (filterValue, offerCondition) => {
  if (filterValue === priceValues.low) {
    return offerCondition < MaxPrices.FOR_LOW_VALUED;
  } else if (filterValue === priceValues.middle) {
    return offerCondition > MaxPrices.FOR_LOW_VALUED && offerCondition < MaxPrices.FOR_MIDDLE_VALUED;
  } else if (filterValue === priceValues.high) {
    return offerCondition > MaxPrices.FOR_MIDDLE_VALUED;
  }
  return true;
};

const matchesFilters = (({offer}) => {
  const typeMatched = isFilterMatched(filterValues.type, offer.type);
  const priceMatched = isPriceMatched(filterValues.price, offer.price);
  const roomsMatched = isFilterMatched(filterValues.rooms, offer.rooms);
  const guestsMatched = isFilterMatched(filterValues.guests, offer.guests);

  return typeMatched && priceMatched && roomsMatched && guestsMatched;
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

export { compareOffers, matchesFilters, setFeaturesClick, setFiltersClick, resetFilters };
