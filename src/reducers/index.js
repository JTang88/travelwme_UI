import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userTrips from './reducerTrips';
import showTrip from './reducerShowTrip';
import searchTrip from './reducerSearchTrip';
import userId from './reducerUserId';
import tripCreator from './reducerTripCreator';
import trendTripReducer from './trendTripReducer';

const allReducers = combineReducers({
  auth: authReducer,
  trend: trendTripReducer,
  trips: userTrips,
  showtrip: showTrip,
  search: searchTrip,
  userid: userId,
  creator: tripCreator,
});

export default allReducers;
