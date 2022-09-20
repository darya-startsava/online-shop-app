import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import categoriesReducer from './categories/reducer';
import productsReducer from './products/reducer';
import cartReducer from './product/reducer';
import currencyReducer from './header/reducer';
import { composeEnhancer } from './utils/compose';

const compose = composeEnhancer('App Store');
const store = createStore(
  combineReducers({
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
    currency: currencyReducer,
  }),
  compose(applyMiddleware(thunk))
);

export default store;
