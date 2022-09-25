import { PropTypes } from 'prop-types';
import React from 'react';
import { productPropTypes } from '../../utils/propTypes';
import Button from '../../reusableComponents/button';
import CartList from './cartList';
import './cartPopup.scss';
import { calculatePriceAndQuantity } from '../../utils/calculatePriceAndQuantity';

export default class CartPopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleHideCartPopup = this.handleHideCartPopup.bind(this);
  }

  handleClick() {
    const { navigate, hidePopup } = this.props;
    navigate('/cart');
    hidePopup();
  }

  handleHideCartPopup() {
    const { hidePopup } = this.props;
    hidePopup();
  }

  render() {
    const { currentCurrency } = this.props;
    const { products, showCartPopup } = this.props;
    const result = calculatePriceAndQuantity(products, currentCurrency);
    let cartPopup = 'cart-popup';
    if (showCartPopup) cartPopup += ' cart-popup-show';
    return (
      <div className={cartPopup}>
        <div className="cart-popup-title">
          <b>My bag,</b> {result.quantity} items
        </div>
        <CartList products={products} page="cartPopup" />
        <div className="cart-popup-total">
          <span className="cart-popup-total-left">Total</span>
          <span className="cart-popup-total-right">
            {currentCurrency.symbol + Math.round(result.totalPrice * 100) / 100}
          </span>
        </div>
        <div className="cart-popup-buttons-wrapper">
          <Button onClick={this.handleClick} page="cartPopup">
            view bag
          </Button>
          <Button onClick={this.handleHideCartPopup} page="cartPopup">
            check out
          </Button>
        </div>
      </div>
    );
  }
}

CartPopup.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      product: PropTypes.shape(productPropTypes),
      count: PropTypes.number,
      selectedAttributes: PropTypes.object,
      cartId: PropTypes.string,
    })
  ),
  showCartPopup: PropTypes.bool,
  currentCurrency: PropTypes.shape({ label: PropTypes.string, symbol: PropTypes.string }),
  navigate: PropTypes.func,
  hidePopup: PropTypes.func,
};
