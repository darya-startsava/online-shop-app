import { queryProductById } from '../queries';
import { FETCH_PRODUCT_ERROR, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_PENDING } from './actions';

export const fetchProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_PRODUCT_PENDING,
    });
    const { product } = await queryProductById(id);
    dispatch({
      type: FETCH_PRODUCT_SUCCESS,
      product: { [product.id]: product },
    });
    return product;
  } catch {
    dispatch({ type: FETCH_PRODUCT_ERROR });
  }
};
