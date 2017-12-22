// export default function (state = {}, action) {
//   switch (action.type) {
//     case 'FOUND_TRIP':
//       return action.payload;
//   }
//   return state;
// }

// export default function (state = initialState, action) {
//   console.log('do we even get here??? ', action.payload)
//   switch (action.type) {
//     case 'FOUND_TRIP': 
//       console.log('in foundTripReducer. action.payload = ', action.payload);
//       return {
//         terms: action.payload,
//       };
//     default: return state;
//   }
// }
console.log('are we even hitting this fuckig file')
export default function (state = {}, action) {
  console.log('do we even get here??? ', action.type)
  switch (action.type) {
    case 'FOUND_TRIPS': 
      console.log('in foundTripReducer. action.payload = ', action.payload);
      return action.payload;
  }
  return state;
}
