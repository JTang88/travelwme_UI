import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userTrips from './reducerTrips';
import showTrip from './reducerShowTrip';
import searchTrip from './reducerSearchTrip';
import userId from './reducerUserId';
import tripCreator from './reducerTripCreator';
import tripTravelers from './reducerTripTravelers';
import tripInterested from './reducerTripInterested';

const allReducers = combineReducers({
  auth: authReducer,
  trips: userTrips,
  showtrip: showTrip,
  search: searchTrip,
  userid: userId,
  creator: tripCreator,
  triptrav: tripTravelers,
  tripint: tripInterested,
});

export default allReducers;
