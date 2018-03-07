import { merge } from 'lodash';
import { updateCurrentTripResolver } from './updateCurrentTripObj';
import { updateCurrentUserResolver } from './updateCurrentUserObj';

export default merge(
  {},
  updateCurrentTripResolver,
  updateCurrentUserResolver,
);