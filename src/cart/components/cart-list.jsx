import { PropTypes } from 'prop-types';
import React from 'react';
import CartListItem from './cart-list-item';
import { productPropTypes } from '../../utils/propTypes';

export default class CartList extends React.PureComponent {
  render() {
    const { products } = this.props;
    return (
      <>
        {products.map((i) => (
          <CartListItem key={i.cartId} {...i} />
        ))}
      </>
    );
  }
}

CartList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      product: PropTypes.shape(productPropTypes),
      count: PropTypes.number,
      selectedAttributes: PropTypes.object,
      cartId: PropTypes.string,
    })
  ),
};
