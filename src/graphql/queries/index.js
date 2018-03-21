import { merge } from 'lodash';
import { getCurrentTripDefault } from './getCurrentTrip';
import { getCurrentUserDefault } from './getCurrentUser';
import { getCurrentSearchTermsDefault } from './getCurrentSearchTerms';
import { searchStateDefault } from './searchState';

export default merge(
  {},
  getCurrentTripDefault,
  searchStateDefault,
  getCurrentUserDefault,
  getCurrentSearchTermsDefault,
);