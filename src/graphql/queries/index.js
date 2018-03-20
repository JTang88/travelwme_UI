import { merge } from 'lodash';
import { getCurrentTripDefault } from './getCurrentTrip';
import { getCurrentUserDefault } from './getCurrentUser';
import { getCurrentSearchTermsDefault } from './getCurrentSearchTerms';

export default merge(
  {},
  getCurrentTripDefault,
  getCurrentUserDefault,
  getCurrentSearchTermsDefault,
);