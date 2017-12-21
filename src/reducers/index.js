import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userTrips from './reducerTrips';
import pendTrips from './reducerPendTrips';
import showTrip from './reducerShowTrip';
import searchTrip from './reducerSearchTrip';
import userId from './reducerUserId';
import tripCreator from './reducerTripCreator';
import tripTravelers from './reducerTripTravelers';
import tripInterested from './reducerTripInterested';
import updateStatus from './reducerTripStatus';
import trendTripReducer from './trendTripReducer';


const allReducers = combineReducers({
  auth: authReducer,
  mytrips: userTrips,
  pendtrips: pendTrips,
  trend: trendTripReducer,
  trips: userTrips,
  showtrip: showTrip,
  search: searchTrip,
  userid: userId,
  creator: tripCreator,
  triptrav: tripTravelers,
  tripint: tripInterested,
  tripstat: updateStatus,
});

export default allReducers;
