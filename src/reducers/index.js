import { combineReducers } from 'redux';
import userTrips from './reducerTrips';
import showTrip from './reducerShowTrip';
import searchTrip from './reducerSearchTrip';
import userId from './reducerUserId';
import tripCreator from './reducerTripCreator';

const allReducers = combineReducers({
  trips: userTrips,
  showtrip: showTrip,
  search: searchTrip,
  userid: userId,
  creator: tripCreator,
});

export default allReducers;
