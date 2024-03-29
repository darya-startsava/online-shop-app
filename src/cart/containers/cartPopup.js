import { connect } from 'react-redux';
import withNavigate from '../../utils/withNavigate';
import CartPopup from '../components/cartPopup';

const mapStateToProps = (state) => ({
  products: state.cart,
  currentCurrency: state.currency.currentValue,
});

export default withNavigate(connect(mapStateToProps)(CartPopup));
