export default function (state = null, action) {
  switch (action.type) {
    case 'CREATOR':
      return action.payload;
  }
  return state;
}
