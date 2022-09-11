import { queryProductsByCategory } from '../queries';
import { FETCH_PRODUCTS_ERROR, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_PENDING } from './actions';

export const fetchProducts = (category) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_PRODUCTS_PENDING,
    });
    const response = await queryProductsByCategory(category);
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      products: response.category.products.reduce(
        (prev, current) => ({ ...prev, [current.id]: current }),
        {}
      ),
    });
  } catch {
    dispatch({ type: FETCH_PRODUCTS_ERROR });
  }
};
