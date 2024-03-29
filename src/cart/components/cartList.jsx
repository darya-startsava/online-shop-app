import { PropTypes } from 'prop-types';
import React from 'react';
import CartListItem from '../containers/cartListItem';
import { productsPropTypes } from '../../utils/propTypes';

export default class CartList extends React.PureComponent {
  render() {
    const { products, page } = this.props;
    return (
      <>
        {products.map((i) => (
          <CartListItem key={i.cartId} {...i} page={page} />
        ))}
      </>
    );
  }
}

CartList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape(productsPropTypes)),
  page: PropTypes.string,
};
