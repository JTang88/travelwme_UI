const initialState = {
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_USER': 
      console.log('in authReducer. action.payload = ', action.payload);
      return {
        user: action.payload,
      };
    default: return state;
  }
}