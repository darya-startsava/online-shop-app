import { PropTypes } from 'prop-types';
import React from 'react';
import { productPropTypes } from '../../utils/propTypes';
import CartList from './cart-list';
import Button from '../../reusableComponents/button';
import { calculatePriceAndQuantity } from '../../utils/calculatePriceAndQuantity';

export default class Cart extends React.PureComponent {
  render() {
    const { products, currentCurrency } = this.props;
    const result = calculatePriceAndQuantity(products, currentCurrency);

    return (
      <>
        <div>Cart</div>
        <CartList products={products} />
        <div>Tax 21%: {Math.round(result.otalPrice * 21) / 100 || 0}</div>
        <div>Quantity: {result.quantity}</div>
        <div>Total:{currentCurrency.symbol + Math.round(result.totalPrice * 100) / 100}</div>
        <Button>order</Button>
      </>
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
