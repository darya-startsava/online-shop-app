import { PropTypes } from 'prop-types';
import React from 'react';
import { productPropTypes } from '../../utils/propTypes';
import CartList from './cartList';
import Button from '../../reusableComponents/button';
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
            <div>{currentCurrency.symbol + Math.round(result.totalPrice * 21) / 100 || '0'}</div>
            <div> {result.quantity || '0'}</div>
            <div>{currentCurrency.symbol + Math.round(result.totalPrice * 100) / 100 || '0'}</div>
          </div>
          <Button page="cart">order</Button>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      product: PropTypes.shape(productPropTypes),
      count: PropTypes.number,
      selectedAttributes: PropTypes.object,
      cartId: PropTypes.string,
    })
  ),
  currentCurrency: PropTypes.shape({ label: PropTypes.string, symbol: PropTypes.string }),
};
