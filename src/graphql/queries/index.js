import { merge } from 'lodash';
import { getCurrentTripDefault } from './getCurrentTrip';
import { getCurrentUserDefault } from './getCurrentUser';
import { searchStateDefault } from './searchState';
import { getChatBoxStateDefault } from './getChatBoxState';

export default merge(
  {},
  getCurrentTripDefault,
  searchStateDefault,
  getCurrentUserDefault,
  getChatBoxStateDefault,
);