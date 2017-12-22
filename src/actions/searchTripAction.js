function searchTrip(tripList) {
  console.log('what is this? terms= ', tripList)
  return {
    type: 'SEARCH_TRIP',
    payload: tripList,
  };
}

export default searchTrip;
