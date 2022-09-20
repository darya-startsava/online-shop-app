import { connect } from 'react-redux';
import CurrencyPopup from '../components/currencyPopup';
import { CHANGE_CURRENCY } from '../actions';

const mapDispatchToProps = (dispatch) => ({
  changeCurrency: (currentCurrency) => dispatch({ type: CHANGE_CURRENCY, currentCurrency }),
});

export default connect(null, mapDispatchToProps)(CurrencyPopup);
