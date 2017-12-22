export default function (state = [], action) {
  switch (action.type) {
    case 'INTERESTED':
      return action.payload;
  }
  return state;
}
