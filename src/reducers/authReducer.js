const initialState = {
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_USER': 
      return {
        user: action.payload,
      };
    default: return state;
  }
}