import { connect } from 'react-redux';
import withNavigate from '../../utils/withNavigate';
import CartPopup from '../components/cart-popup';

const mapStateToProps = (state) => ({
  products: state.cart,
});

export default withNavigate(connect(mapStateToProps)(CartPopup));
