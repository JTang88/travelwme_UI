export default function (state = null, action) {
  console.log('REDDDDUCERRRR CREATOR', action.payload);
  switch (action.type) {
    case 'CREATOR':
      return action.payload;
  }
  return state;
}
