import { combineReducers } from 'redux';
import reducerTrips from './reducerTrips';
 
const allReducers = combineReducers({
  testReducer: reducerTrips,
});

export default allReducers;
