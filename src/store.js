import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import categoriesReducer from './categories/reducer';
import { composeEnhancer } from './utils/compose';

const compose = composeEnhancer('App Store');
const store = createStore(
  combineReducers({
    categories: categoriesReducer,
  }),
  compose(applyMiddleware(thunk))
);

export default store;
