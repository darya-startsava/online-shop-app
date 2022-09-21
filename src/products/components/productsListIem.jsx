import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ReactComponent as EmptyCart } from '../../assets/emptyCart.svg';
import './productsListItem.scss';

export default class ProductsListItem extends React.PureComponent {
  render() {
    const { product, price } = this.props;
    return (
      <div className="products-list-item-wrapper">
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          aria-label="open full product information"
        >
          <img className="products-list-item-image" src={product.gallery[0]} alt="" />
          <div className="products-list-item-title-wrapper">
            <div className="products-list-item-name">{product.brand + ' ' + product.name}</div>
            <div className="products-list-item-price">
              {price?.currency?.symbol + price?.amount}
            </div>
          </div>
        </Link>
        <button className="products-list-item-add-button" aria-label="add product to cart">
          <EmptyCart />
        </button>
      </div>
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
