export default function (state = null, action) {
  console.log('REDDDDUCERRRR TRAVELER', action.payload);
  switch (action.type) {
    case 'TRAVELERS':
      return action.payload;
  }
  return state;
}

//////NEED TO WORK ON THIS TO ONLY SEND TRAVERLS WITH C OR J FOR USER_TYPE