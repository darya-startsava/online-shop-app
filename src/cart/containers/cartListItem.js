import { connect } from 'react-redux';
import CartListItem from '../components/cartListItem';

const mapStateToProps = (state) => ({
  currentCurrency: state.currency.currentValue,
});

export default connect(mapStateToProps)(CartListItem);
