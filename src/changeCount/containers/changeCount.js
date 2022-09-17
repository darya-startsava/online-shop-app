import { connect } from 'react-redux';
import { INCREMENT_PRODUCT_IN_CART, DECREMENT_PRODUCT_IN_CART } from '../actions';
import ChangeCount from '../components/changeCount';

const mapDispatchToProps = (dispatch) => ({
  incrementProductCount: (cartId) => dispatch({ type: INCREMENT_PRODUCT_IN_CART, cartId }),
  decrementProductCount: (cartId) => dispatch({ type: DECREMENT_PRODUCT_IN_CART, cartId }),
});

export default connect(null, mapDispatchToProps)(ChangeCount);
