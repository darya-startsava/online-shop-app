import Status from '../utils/status';
import { FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_ERROR } from './actions';

export default function reducer(state = { data: [], status: Status.PENDING }, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS: {
      return { data: action.categories, status: Status.SUCCESS };
    }
    case FETCH_CATEGORIES_ERROR: {
      return { data: [], status: Status.ERROR };
    }
    default:
      return state;
  }
}
