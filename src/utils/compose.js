import { compose } from 'redux';

export const composeEnhancer = (name) => {
  if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name });
  }
  return compose;
};
