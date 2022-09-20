import Status from '../utils/status';
import { FETCH_CURRENCY_SUCCESS, FETCH_CURRENCY_PENDING, FETCH_CURRENCY_ERROR } from './actions';
import { CHANGE_CURRENCY } from '../currencyPopup/actions';

export default function reducer(
  state = { allValues: [], currentValue: {}, status: Status.INIT },
  action
) {
  switch (action.type) {
    case FETCH_CURRENCY_SUCCESS: {
      return {
        allValues: action.currencies,
        currentValue: action.currencies[0],
        status: Status.SUCCESS,
      };
    }
    case FETCH_CURRENCY_PENDING: {
      return { allValues: [], currentValue: {}, status: Status.PENDING };
    }
    case FETCH_CURRENCY_ERROR: {
      return { allValues: [], currentValue: {}, status: Status.ERROR };
    }
    case CHANGE_CURRENCY: {
      return { ...state, currentValue: action.currentCurrency };
    }
    default:
      return state;
  }
}
