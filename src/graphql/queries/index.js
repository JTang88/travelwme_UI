import { merge } from 'lodash';
// import { getCurrentTripDefault } from './getCurrentTrip';
// import { getCurrentUserDefault } from './getCurrentUser';
import { getCurrentTripDefault } from './getCurrentTripObj';
import { getCurrentUserDefault } from './getCurrentUserObj';

export default merge(
  {},
  { getCurrentTripDefault },
  { getCurrentUserDefault },
);