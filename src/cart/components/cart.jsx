import { PropTypes } from 'prop-types';
import React from 'react';
import { productsPropTypes } from '../../utils/propTypes';
import CartList from './cartList';
import Button from '../../reusableComponents/button/button';
import { calculatePriceAndQuantity } from '../../utils/calculatePriceAndQuantity';
import './cart.scss';

export default class Cart extends React.PureComponent {
  render() {
    const { products, currentCurrency } = this.props;
    const result = calculatePriceAndQuantity(products, currentCurrency);

    return (
      <div className="cart-wrapper">
        <div className="cart-title">Cart</div>
        <hr />
        <CartList products={products} page="cart" />
        <div className="cart-total-information-wrapper">
          <div className="cart-total-information-wrapper-left">
            <div>Tax 21%:</div>
            <div>Quantity:</div>
            <div className="cart-total">Total:</div>
          </div>
          <div className="cart-total-information-wrapper-right">
            <div>
              {currentCurrency.symbol + (Math.round(result.totalPrice * 21) / 100).toFixed(2) ||
                '0.00'}
            </div>
            <div> {result.quantity || '0'}</div>
            <div>{currentCurrency.symbol + result.totalPrice || '0.00'}</div>
          </div>
          <Button page="cart">order</Button>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape(productsPropTypes)),
  currentCurrency: PropTypes.shape({ label: PropTypes.string, symbol: PropTypes.string }),
};
