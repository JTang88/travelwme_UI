export default function (state = 1, action) {
  switch (action.type) {
    case 'USER_ID':
      return action.payload;
  }
  return state;
}
