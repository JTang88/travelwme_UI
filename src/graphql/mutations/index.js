import { merge } from 'lodash';
import { updateCurrentTripResolver } from './updateCurrentTrip';
import { updateCurrentUserResolver } from './updateCurrentUser';

export default merge(
  {},
  updateCurrentTripResolver,
  updateCurrentUserResolver,
);