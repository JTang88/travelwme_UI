export default function (state = null, action) {

  switch (action.type) {
    case 'SINGLE_STATUS':
      return action.payload;
  }
  return state;
}