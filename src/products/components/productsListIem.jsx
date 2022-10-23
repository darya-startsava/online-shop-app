import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ReactComponent as EmptyCart } from '../../assets/emptyCart.svg';
import './productsListItem.scss';
import Message from '../../reusableComponents/message/message';
import constants from '../../constants';

export default class ProductsListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { showMessage: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleMessageClose = this.handleMessageClose.bind(this);
  }
  handleClick() {
    const { addProductToCart, data, rowIndex, columnIndex } = this.props;
    const product = data[rowIndex][columnIndex];
    const selectedAttributes = {};
    product.attributes.forEach((i) => {
      selectedAttributes[i.id] = i.items[0].id;
    });
    const cartId = product.id + JSON.stringify(selectedAttributes);
    addProductToCart(product.id, product, selectedAttributes, cartId);
    this.setState({ showMessage: true });
  }

  handleMessageClose() {
    this.setState({ showMessage: false });
  }

  render() {
    const { columnIndex, data, rowIndex, style, currentCurrency } = this.props;

    const product = data[rowIndex][columnIndex];
    if (!product) return <div></div>;

    const price = product?.prices?.filter(
      (item) => item?.currency?.symbol === currentCurrency.symbol
    )[0];
    let classNameProductsListItemWrapper = 'products-list-item-wrapper';
    if (!product?.inStock) classNameProductsListItemWrapper += ' products-list-item-out-of-stock';
    const productPrice =
      price?.currency?.symbol + (Math.round(price?.amount * 100) / 100).toFixed(2);
    return (
      <div
        className={classNameProductsListItemWrapper}
        style={{
          ...style,
          left: style.left + constants.COLUMN_GAP,
          top: style.top + constants.ROW_GAP,
          width: style.width - 2 * constants.COLUMN_GAP,
          height: style.height - constants.ROW_GAP,
        }}
      >
        {this.state.showMessage && (
          <Message handleMessageClose={this.handleMessageClose}>
            Product was added to the cart
          </Message>
        )}
        <Link
          key={product?.id}
          to={`/product/${product.id}`}
          aria-label="open full product information"
        >
          <div className="products-list-item-image-wrapper">
            <img className="products-list-item-image" src={product?.gallery[0]} alt="" />
          </div>
          <div className="products-list-item-out-of-stock-title">out of stock</div>
          <div className="products-list-item-title-wrapper">
            <div className="products-list-item-name">{product?.brand + ' ' + product?.name}</div>
            <div className="products-list-item-price">{productPrice || ' '}</div>
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
  style: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  data: PropTypes.array,
  rowIndex: PropTypes.number,
  columnIndex: PropTypes.number,
  addProductToCart: PropTypes.func,
  currentCurrency: PropTypes.shape({ label: PropTypes.string, symbol: PropTypes.string }),
};
