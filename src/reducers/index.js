import { combineReducers } from 'redux';
import reducerTrips from './reducerTrips';
import authReducer from './authReducer';
import userTrips from './reducerTrips';
import myTrip from './reducerMyTrip';
import searchTrip from './reducerSearchTrip';
import userId from './reducerUserId';
import tripTravelers from './reducerTravelers';

const allReducers = combineReducers({
  trip: reducerTrips,
  auth: authReducer,
  trips: userTrips,
  mytrip: myTrip,
  search: searchTrip,
  userid: userId,
  travelers: tripTravelers,
});

export default allReducers;
