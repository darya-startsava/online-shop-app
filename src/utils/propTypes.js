import { PropTypes } from 'prop-types';

export const productPropTypes = {
  attributes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          displayValue: PropTypes.string,
          value: PropTypes.string,
          id: PropTypes.string,
        })
      ),
    })
  ),
  brand: PropTypes.string,
  category: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  inStock: PropTypes.bool,
  gallery: PropTypes.array,
  name: PropTypes.string,
  prices: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number,
      currency: PropTypes.shape({ label: PropTypes.string, symbol: PropTypes.string }),
    })
  ),
};

export const productsPropTypes = {
  id: PropTypes.string,
  product: PropTypes.shape(productPropTypes),
  count: PropTypes.number,
  selectedAttributes: PropTypes.object,
  cartId: PropTypes.string,
};
