console.log('we in the fucking afoudn tripsss')

function foundTrips(terms) {
  console.log('what is this? terms= ', terms)
  return {
    type: 'FOUND_TRIPS',
    payload: terms.searchTerms,
  };
}

export default foundTrips;
