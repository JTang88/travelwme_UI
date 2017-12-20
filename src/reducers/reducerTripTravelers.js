export default function (state = [], action) {
  switch (action.type) {
    case 'TRAVELERS':
      return action.payload;
  }
  return state;
}
