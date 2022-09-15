import { PropTypes } from 'prop-types';
import React from 'react';
import { productPropTypes } from '../../utils/propTypes';
import CartList from './cart-list';

export default class Cart extends React.PureComponent {
  render() {
    const { products } = this.props;
    return (
      <>
        <div>Cart</div>
        <CartList products={products} />
      </>
    );
  }
}

Cart.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      products: PropTypes.arrayOf({
        id: PropTypes.string,
        product: PropTypes.shape(productPropTypes),
        count: PropTypes.number,
      }),
    })
  ),
};
