function tripTravelers(travelers) {
  let jTravelers = [];
  for (let i = 0; i < travelers.length; i++) {
    if (travelers[i].user_type === 'J') {
      jTravelers.push(travelers[i]);
    }
  }
  return {
    type: 'TRAVELERS',
    payload: jTravelers,
  };
}

export default tripTravelers;

