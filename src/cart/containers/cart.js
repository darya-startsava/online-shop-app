import { connect } from 'react-redux';
import Cart from '../components/cart';

const mapStateToProps = (state) => ({
  products: state.cart,
  currentCurrency: state.currency.currentValue,
});

export default connect(mapStateToProps)(Cart);
