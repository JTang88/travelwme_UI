import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userTrips from './reducerTrips';
import pendTrips from './reducerPendTrips';
import showTrip from './reducerShowTrip';
import searchTrip from './reducerSearchTrip';
import tripCreator from './reducerTripCreator';
import tripTravelers from './reducerTripTravelers';
import tripInterested from './reducerTripInterested';
import trendTripReducer from './trendTripReducer';
import singleStatus from './reducerSingleStat';


const allReducers = combineReducers({
  auth: authReducer,
  mytrips: userTrips,
  pendtrips: pendTrips,
  trend: trendTripReducer,
  trips: userTrips,
  showtrip: showTrip,
  search: searchTrip,
  creator: tripCreator,
  triptrav: tripTravelers,
  tripint: tripInterested,
  singlestat: singleStatus,
});

export default allReducers;
