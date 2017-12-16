import { combineReducers } from 'redux';
import reducerTrips from './reducerTrips';
import authReducer from './authReducer';
import userTrips from './reducerTrips';
import myTrip from './reducerMyTrip';

const allReducers = combineReducers({
  trip: reducerTrips,
  auth: authReducer,
  trips: userTrips,
  mytrip: myTrip,
});

export default allReducers;
