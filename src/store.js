import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import categoriesReducer from './categories/reducer';
import productsReducer from './products/reducer';
import { composeEnhancer } from './utils/compose';

const compose = composeEnhancer('App Store');
const store = createStore(
  combineReducers({
    categories: categoriesReducer,
    products: productsReducer,
  }),
  compose(applyMiddleware(thunk))
);

export default store;
