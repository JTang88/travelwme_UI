const initialState = {
  trips: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_TREND_TRIPS': 
      console.log('in trendTripReducer. action.payload = ', action.payload);
      return {
        trips: action.payload,
      };
    default: return state;
  }
}