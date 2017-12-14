import { combineReducers } from 'redux';
import userTrips from './reducerTrips';

const allReducers = combineReducers({
  trips: userTrips,
});

export default allReducers;
