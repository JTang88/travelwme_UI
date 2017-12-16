import { combineReducers } from 'redux';
import reducerTrips from './reducerTrips';
import authReducer from './authReducer';

const allReducers = combineReducers({
  trip: reducerTrips,
  auth: authReducer,
});

export default allReducers;
