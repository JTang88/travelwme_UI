function tripTravelers(travelers) {
  const mainTravelers = [];
  for (let i = 0; i < travelers.length; i++) {
    if (travelers[i].user_type !== 'I') {
      mainTravelers.push(travelers[i]);
    }
  }
  return {
    type: 'TRAVELERS',
    payload: mainTravelers,
  };
}

export default tripTravelers;

