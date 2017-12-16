import { combineReducers } from 'redux';
import userTrips from './reducerTrips';
import showTrip from './reducerShowTrip';
import searchTrip from './reducerSearchTrip';
import userId from './reducerUserId';
import tripTravelers from './reducerTravelers';

const allReducers = combineReducers({
  trips: userTrips,
  showtrip: showTrip,
  search: searchTrip,
  userid: userId,
  travelers: tripTravelers,
});

export default allReducers;
