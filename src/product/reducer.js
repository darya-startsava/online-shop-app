import { INCREMENT_PRODUCT_IN_CART, DECREMENT_PRODUCT_IN_CART } from '../changeCount/actions';
import { ADD_PRODUCT_TO_CART } from './actions';
import { defineState } from 'redux-localstore';

const defaultState = [];

const initialState = defineState(defaultState)('cart');

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: {
      const index = state?.findIndex((i) => i.cartId === action.cartId);
      if (index === -1) {
        return [
          ...state,
          {
            id: action.id,
            product: action.product,
            selectedAttributes: action.selectedAttributes,
            cartId: action.cartId,
            count: 1,
          },
        ];
      } else {
        const newState = [];
        state.forEach((i, ind) => {
          if (ind !== index) newState.push(i);
          else newState.push({ ...state[index], count: state[index].count + 1 });
        });
        return newState;
      }
    }
    case INCREMENT_PRODUCT_IN_CART: {
      const index = state.findIndex((i) => i.cartId === action.cartId);
      const newState = [];
      state.forEach((i, ind) => {
        if (ind !== index) newState.push(i);
        else newState.push({ ...state[index], count: state[index].count + 1 });
      });
      return newState;
    }
    case DECREMENT_PRODUCT_IN_CART: {
      const index = state.findIndex((i) => i.cartId === action.cartId);
      if (state[index].count === 1) {
        return state.filter((i, ind) => ind !== index);
      } else {
        const newState = [];
        state.forEach((i, ind) => {
          if (ind !== index) newState.push(i);
          else newState.push({ ...state[index], count: state[index].count - 1 });
        });
        return newState;
      }
    }

    default:
      return state;
  }
}
