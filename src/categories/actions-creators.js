import { queryCategories } from '../queries';
import { FETCH_CATEGORIES_ERROR, FETCH_CATEGORIES_SUCCESS } from './actions';

export const fetchCategories = async (dispatch) => {
  try {
    const { categories } = await queryCategories();
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, categories: categories.map((i) => i.name) });
  } catch {
    dispatch({ type: FETCH_CATEGORIES_ERROR });
  }
};
