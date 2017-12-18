export default function (state = null, action) {
  switch (action.type) {
    case 'INTERESTED':
      return action.payload;
  }
  return state;
}
