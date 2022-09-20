import { connect } from 'react-redux';
import CartListItem from '../components/cart-list-item';

const mapStateToProps = (state) => ({
  currentCurrency: state.currency.currentValue,
});

export default connect(mapStateToProps)(CartListItem);
