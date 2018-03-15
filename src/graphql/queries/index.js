import { merge } from 'lodash';
import { getCurrentTripDefault } from './getCurrentTrip';
import { getCurrentUserDefault } from './getCurrentUser';

export default merge(
  {},
  getCurrentTripDefault,
  getCurrentUserDefault,
);