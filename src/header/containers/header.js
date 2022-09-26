import { connect } from 'react-redux';
import Header from '../components/header';
import { fetchCurrencies } from '../actions-creators';

const mapStateToProps = (state) => ({
  currentCurrency: state.currency.currentValue,
  currencies: state.currency.allValues,
  products: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrencies),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
