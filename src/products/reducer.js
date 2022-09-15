import Status from '../utils/status';
import { FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR, FETCH_PRODUCTS_PENDING } from './actions';
import {
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_ERROR,
  FETCH_PRODUCT_PENDING,
} from '../product/actions';

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
    case FETCH_PRODUCT_SUCCESS: {
      return { data: action.product, status: Status.SUCCESS };
    }
    case FETCH_PRODUCT_ERROR: {
      return { data: {}, status: Status.ERROR };
    }
    case FETCH_PRODUCT_PENDING: {
      return { data: {}, status: Status.PENDING };
    }
    default:
      return state;
  }
}
