import { combineReducers } from 'redux';
import reducerTrips from './reducerTrips';
import authReducer from './authReducer';
import userTrips from './reducerTrips';
import myTrip from './reducerMyTrip';
import searchTrip from './reducerSearchTrip';
import userId from './reducerUserId';

const allReducers = combineReducers({
  trip: reducerTrips,
  auth: authReducer,
  trips: userTrips,
  mytrip: myTrip,
  search: searchTrip,
  userid: userId,
});

export default allReducers;
