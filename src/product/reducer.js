import { ADD_PRODUCT_TO_CART } from './actions';

function shallowComparison(obj1, obj2) {
  return Object.keys(obj1).every((key) => obj1[key] === obj2[key]);
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: {
      const similarProducts = state.filter((i) => i.id === action.product.id);
      let sameProduct;
      for (let i = 0; i < similarProducts.length; i++) {
        if (
          shallowComparison(
            similarProducts[i].selectedAttributes,
            action.product.selectedAttributes
          )
        )
          sameProduct = similarProducts[i];
      }
      if (sameProduct) {
        const index = state.findIndex(
          (i) => shallowComparison(i.selectedAttributes, sameProduct.selectedAttributes) === true
        );
        state[index] = {
          ...state[index],
          count: state[index].count + 1,
        };
      } else {
        state.push({ ...action.product, count: 1 });
      }
      return state;
    }

    default:
      return state;
  }
}
