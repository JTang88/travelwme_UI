import { merge } from 'lodash';
import { updateCurrentTripResolver } from './updateCurrentTrip';
import { updateCurrentUserResolver } from './updateCurrentUser';
import { updateCurrentUserRelationToTripResolver } from './updateCurrentUserRelationToTrip';
import { deleteAMemberFromCacheResolver } from './deleteAMemberFromCache';
import { invalidateATripInCacheResolver } from './invalidateATripInCache';
import { addNewlyInterestedTripToListResolver } from './addNewlyInterestedTripToList';

export default merge(
  {},
  updateCurrentTripResolver,
  updateCurrentUserResolver,
  updateCurrentUserRelationToTripResolver,
  deleteAMemberFromCacheResolver,
  invalidateATripInCacheResolver,
  addNewlyInterestedTripToListResolver,
);
