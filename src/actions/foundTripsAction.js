

function foundTrips(terms) {

  return {
    type: 'FOUND_TRIPS',
    payload: terms.searchTerms,
  };
}

export default foundTrips;
