import Status from '../utils/status';
import { FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR, FETCH_PRODUCTS_PENDING } from './actions';

export default function reducer(state = { data: {}, status: Status.INIT }, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS: {
      return { data: action.products, status: Status.SUCCESS };
    }
    case FETCH_PRODUCTS_ERROR: {
      return { data: {}, status: Status.ERROR };
    }
    case FETCH_PRODUCTS_PENDING: {
      return { data: {}, status: Status.PENDING };
    }
    default:
      return state;
  }
}
