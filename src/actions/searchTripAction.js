function searchTrip(tripid) {
  return {
    type: 'SEARCH_TRIP',
    payload: tripid,
  };
}

export default searchTrip;
