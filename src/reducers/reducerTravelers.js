export default function (state = null, action) {
  console.log('REDDDDUCERRRR TRAVELER', action.payload);
  switch (action.type) {
    case 'TRAVELERS':
      return action.payload;
  }
  return state;
}
