import { PropTypes } from 'prop-types';
import React from 'react';
import { productsPropTypes } from '../../utils/propTypes';
import Button from '../../reusableComponents/button/button';
import CartList from './cartList';
import Overlay from '../../reusableComponents/overlay/overlay';
import './cartPopup.scss';
import { calculatePriceAndQuantity } from '../../utils/calculatePriceAndQuantity';

export default class CartPopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleContainer = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleHideCartPopup = this.handleHideCartPopup.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside, true);
  }

  handleClickOutside(event) {
    const openCartButton = document.getElementById('open-cart-button');
    const { hidePopup, showCartPopup } = this.props;
    if (
      showCartPopup &&
      !this.toggleContainer.current.contains(event.target) &&
      !openCartButton.current.contains(event.target)
    )
      hidePopup();
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
    const totalPrice = currentCurrency.symbol + result.totalPrice;
    return (
      showCartPopup && (
        <Overlay popup="cart">
          <div className="cart-popup-wrapper">
            <div className="cart-popup" ref={this.toggleContainer}>
              <div className="cart-popup-title">
                <b>My bag,</b> {result.quantity + ' ' + (result.quantity === 1 ? 'item' : 'items')}
              </div>
              <CartList products={products} page="cartPopup" />
              <div className="cart-popup-total">
                <span className="cart-popup-total-left">Total</span>
                <span className="cart-popup-total-right">{totalPrice || '0.00'}</span>
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
