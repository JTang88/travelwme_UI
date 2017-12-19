const initialState = {
  getUser: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_USER': 
      console.log('in authReducer. action.payload = ', action.payload);
      return {
        getUser: action.payload,
      };
    default: return state;
  }
}