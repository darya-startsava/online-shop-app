import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import categoriesReducer from './categories/reducer';
import productsReducer from './products/reducer';
import cartReducer from './product/reducer';
import currencyReducer from './header/reducer';
import { composeEnhancer } from './utils/compose';
import storeSynchronize from 'redux-localstore';

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

storeSynchronize(store);

export default store;
