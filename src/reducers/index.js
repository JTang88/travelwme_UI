import { combineReducers } from 'redux';
import reducerTrips from './reducerTrips';
import authReducer from './authReducer';
import userTrips from './reducerTrips';
import showTrip from './reducerShowTrip';
import searchTrip from './reducerSearchTrip';
import userId from './reducerUserId';
import tripCreator from './reducerTripCreator';

const allReducers = combineReducers({
  trip: reducerTrips,
  auth: authReducer,
  trips: userTrips,
  showtrip: showTrip,
  search: searchTrip,
  userid: userId,
  creator: tripCreator,
});

export default allReducers;
