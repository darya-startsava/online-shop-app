import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ReactComponent as EmptyCart } from '../../assets/emptyCart.svg';
import './productsListItem.scss';

export default class ProductsListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const { addProductToCart, product } = this.props;
    const selectedAttributes = {};
    product.attributes.forEach((i) => {
      selectedAttributes[i.id] = i.items[0].id;
    });
    const cartId = product.id + JSON.stringify(selectedAttributes);
    addProductToCart(product.id, product, selectedAttributes, cartId);
  }
  render() {
    const { product, price } = this.props;
    let classNameProductsListItemWrapper = 'products-list-item-wrapper';
    if (!product.inStock) classNameProductsListItemWrapper += ' products-list-item-out-of-stock';
    return (
      <div className={classNameProductsListItemWrapper}>
        <Link
          key={product.id}
          to={product.inStock ? `/product/${product.id}` : '#'}
          aria-label="open full product information"
        >
          <img className="products-list-item-image" src={product.gallery[0]} alt="" />
          <div className="products-list-item-out-of-stock-title">out of stock</div>
          <div className="products-list-item-title-wrapper">
            <div className="products-list-item-name">{product.brand + ' ' + product.name}</div>
            <div className="products-list-item-price">
              {price?.currency?.symbol + price?.amount}
            </div>
          </div>
        </Link>
        <button
          className="products-list-item-add-button"
          aria-label="add product to cart"
          onClick={this.handleClick}
        >
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
  addProductToCart: PropTypes.func,
};
