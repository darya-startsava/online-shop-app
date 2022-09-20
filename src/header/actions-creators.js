import { queryCurrencies } from '../queries';
import { FETCH_CURRENCY_ERROR, FETCH_CURRENCY_SUCCESS, FETCH_CURRENCY_PENDING } from './actions';

export const fetchCurrencies = async (dispatch) => {
  try {
    dispatch({
      type: FETCH_CURRENCY_PENDING,
    });
    const { currencies } = await queryCurrencies();
    dispatch({
      type: FETCH_CURRENCY_SUCCESS,
      currencies,
    });
    return currencies;
  } catch {
    dispatch({ type: FETCH_CURRENCY_ERROR });
  }
};
