import { PropTypes } from 'prop-types';
import React from 'react';
import { productPropTypes } from '../../utils/propTypes';

export default class CartListItem extends React.PureComponent {
  render() {
    const { product } = this.props;
    return (
      <div>
        <div>{product.product.brand}</div>
        <div>{product.product.name}</div>
      </div>
    );
  }
}

CartListItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    product: PropTypes.shape(productPropTypes),
    count: PropTypes.number,
  }),
};
