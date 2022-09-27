import { PropTypes } from 'prop-types';
import React from 'react';
import { productsPropTypes } from '../../utils/propTypes';
import Button from '../../reusableComponents/button';
import CartList from './cartList';
import Overlay from '../../reusableComponents/overlay';
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
    const totalPrice = currentCurrency.symbol + Math.round(result.totalPrice * 100) / 100;
    return (
      showCartPopup && (
        <Overlay popup="cart">
          <div className="cart-popup-wrapper">
            <div className="cart-popup">
              <div className="cart-popup-title">
                <b>My bag,</b> {result.quantity} items
              </div>
              <CartList products={products} page="cartPopup" />
              <div className="cart-popup-total">
                <span className="cart-popup-total-left">Total</span>
                <span className="cart-popup-total-right">{totalPrice || 0}</span>
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
          </div>
        </Overlay>
      )
    );
  }
}

CartPopup.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape(productsPropTypes)),
  showCartPopup: PropTypes.bool,
  currentCurrency: PropTypes.shape({ label: PropTypes.string, symbol: PropTypes.string }),
  navigate: PropTypes.func,
  hidePopup: PropTypes.func,
};
