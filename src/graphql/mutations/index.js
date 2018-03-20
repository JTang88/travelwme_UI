import { merge } from 'lodash';
import { updateCurrentTripResolver } from './updateCurrentTrip';
import { updateCurrentUserResolver } from './updateCurrentUser';
import { updateCurrentUserRelationToTripResolver } from './updateCurrentUserRelationToTrip';
import { deleteAMemberFromCacheResolver } from './deleteAMemberFromCache';
import { invalidateATripInCacheResolver } from './invalidateATripInCache';
import { addNewlyInterestedTripToListResolver } from './addNewlyInterestedTripToList';
import { moveAJoinedTripToGoingListResolver } from './moveAJoinedTripToGoingList';
import { updateCurrentSearchTermsResolver } from './updateCurrentSearchTerms';

export default merge(
  {},
  updateCurrentTripResolver,
  updateCurrentUserResolver,
  updateCurrentUserRelationToTripResolver,
  deleteAMemberFromCacheResolver,
  invalidateATripInCacheResolver,
  addNewlyInterestedTripToListResolver,
  moveAJoinedTripToGoingListResolver,
  updateCurrentSearchTermsResolver,
);
