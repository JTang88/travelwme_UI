import { merge } from 'lodash';
import { getCurrentTripDefault } from './getCurrentTrip';
import { getCurrentUserDefault } from './getCurrentUser';
import { searchStateDefault } from './searchState';

export default merge(
  {},
  getCurrentTripDefault,
  searchStateDefault,
  getCurrentUserDefault,
);