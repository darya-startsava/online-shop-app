import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductsListItem extends React.PureComponent {
  render() {
    const { product, price } = this.props;
    return (
      <Link key={product.id} to={`/product/${product.id}`}>
        <div>{product.brand + ' ' + product.name}</div>
        <div>{price?.currency?.symbol + price?.amount}</div>
      </Link>
    );
  }
}

ProductsListItem.propTypes = {
  product: PropTypes.shape({
    attributes: PropTypes.array,
    brand: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
    inStock: PropTypes.bool,
    gallery: PropTypes.array,
    name: PropTypes.string,
    prices: PropTypes.array,
  }),
  price: PropTypes.shape({
    amount: PropTypes.number,
    currency: PropTypes.shape({ label: PropTypes.string, symbol: PropTypes.string }),
  }),
};
