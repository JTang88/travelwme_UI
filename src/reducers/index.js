import { combineReducers } from 'redux';
import userTrips from './reducerTrips';
import myTrip from './reducerMyTrip';
import searchTrip from './reducerSearchTrip';
import userId from './reducerUserId';

const allReducers = combineReducers({
  trips: userTrips,
  mytrip: myTrip,
  search: searchTrip,
  userid: userId,
});

export default allReducers;
