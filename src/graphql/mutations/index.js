import { merge } from 'lodash';
import { updateCurrentTripResolver } from './updateCurrentTrip';
import { updateCurrentUserRelationToTripResolver } from './updateCurrentUserRelationToTrip';
import { deleteAMemberFromCacheResolver } from './deleteAMemberFromCache';
import { invalidateATripInCacheResolver } from './invalidateATripInCache';
import { addNewlyInterestedTripToListResolver } from './addNewlyInterestedTripToList';
import { moveAJoinedTripToGoingListResolver } from './moveAJoinedTripToGoingList';
import { updateCurrentSearchTermsResolver } from './updateCurrentSearchTerms';
import { addFoundTripToListResolver } from './addFoundTripToList';
import { updateSearchStateResolver } from './updateSearchState';
import { updateChatBoxStateResolver } from './updateChatBoxState';
import { updateNewMessageStateCacheResolver } from './updateNewMessageStateCache';

export default merge(
  {},
  updateCurrentTripResolver,
  updateCurrentUserRelationToTripResolver,
  deleteAMemberFromCacheResolver,
  invalidateATripInCacheResolver,
  addNewlyInterestedTripToListResolver,
  moveAJoinedTripToGoingListResolver,
  updateCurrentSearchTermsResolver,
  addFoundTripToListResolver,
  updateSearchStateResolver,
  updateChatBoxStateResolver,
  updateNewMessageStateCacheResolver,
);
