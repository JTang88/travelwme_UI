import { merge } from 'lodash';
import { updateCurrentTripResolver } from './updateCurrentTrip';
import { updateCurrentUserResolver } from './updateCurrentUser';
import { updateCurrentUserRelationToTripResolver } from './updateCurrentUserRelationToTrip';
import { deleteAMemberFromCacheResolver } from './deleteAMemberFromCache';
import { invalidateAWaitingTripInCacheResolver } from './invalidateAWaitingTripInCache';

export default merge(
  {},
  updateCurrentTripResolver,
  updateCurrentUserResolver,
  updateCurrentUserRelationToTripResolver,
  deleteAMemberFromCacheResolver,
  invalidateAWaitingTripInCacheResolver,
);
