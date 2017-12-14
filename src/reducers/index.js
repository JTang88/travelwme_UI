import { combineReducers } from 'redux';
import userTrips from './reducerTrips';
import myTrip from './reducerMyTrip';

const allReducers = combineReducers({
  trips: userTrips,
  mytrip: myTrip,
});

export default allReducers;
