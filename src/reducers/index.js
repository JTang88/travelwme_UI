import { combineReducers } from 'redux';
<<<<<<< HEAD
import reducerTrips from './reducerTrips';
import authReducer from './authReducer';
=======
>>>>>>> refs/remotes/origin/master
import userTrips from './reducerTrips';
import showTrip from './reducerShowTrip';
import searchTrip from './reducerSearchTrip';
import userId from './reducerUserId';
import tripCreator from './reducerTripCreator';

const allReducers = combineReducers({
<<<<<<< HEAD
  trip: reducerTrips,
  auth: authReducer,
=======
>>>>>>> refs/remotes/origin/master
  trips: userTrips,
  showtrip: showTrip,
  search: searchTrip,
  userid: userId,
  creator: tripCreator,
});

export default allReducers;
