import { combineReducers } from 'redux';
import userTrips from './reducerTrips';
import myTrip from './reducerMyTrip';
import searchTrip from './reducerSearchTrip';
import userId from './reducerUserId';
import tripTravelers from './reducerTravelers';

const allReducers = combineReducers({
  trips: userTrips,
  mytrip: myTrip,
  search: searchTrip,
  userid: userId,
  travelers: tripTravelers,
});

export default allReducers;
