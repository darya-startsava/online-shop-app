import { PropTypes } from 'prop-types';
import React from 'react';
import Categories from '../../categories/containers/categories';
import { ReactComponent as CartLogo } from '../../assets/cart.svg';
import { ReactComponent as ShowDropdown } from '../../assets/arrowDown.svg';
import { ReactComponent as HideDropdown } from '../../assets/arrowUp.svg';
import './header.css';
import CartPopup from '../../cart/containers/cart-popup';
import CurrencyPopup from '../../currencyPopup/containers/currencyPopup';

export default class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showCartPopup: false,
      showCurrencyPopup: false,
    };
    this.handleOpenCartPopup = this.handleOpenCartPopup.bind(this);
    this.handleHideCartPopup = this.handleHideCartPopup.bind(this);
    this.handleOpenCurrencyPopup = this.handleOpenCurrencyPopup.bind(this);
    this.handleHideCurrencyPopup = this.handleHideCurrencyPopup.bind(this);
  }

  componentDidMount() {
    this.props.fetchCurrencies();
  }

  handleOpenCartPopup() {
    this.setState((state) => {
      return {
        showCartPopup: !state.showCartPopup,
      };
    });
  }

  handleHideCartPopup() {
    this.setState({ showCartPopup: false });
  }

  handleOpenCurrencyPopup() {
    this.setState((state) => {
      return {
        showCurrencyPopup: !state.showCurrencyPopup,
      };
    });
  }

  handleHideCurrencyPopup(currentCurrency) {
    this.setState({ showCurrencyPopup: false, currentCurrency });
  }

  render() {
    const { currentCurrency, currencies } = this.props;
    return (
      <div className="header-wrapper">
        <Categories />
        <button onClick={this.handleOpenCurrencyPopup}>
          {currentCurrency?.symbol}
          {this.state.showCurrencyPopup ? <HideDropdown /> : <ShowDropdown />}
        </button>
        <button onClick={this.handleOpenCartPopup}>
          <CartLogo />
        </button>

        <CartPopup showCartPopup={this.state.showCartPopup} hidePopup={this.handleHideCartPopup} />
        <CurrencyPopup
          currencies={currencies}
          currentCurrency={currentCurrency}
          showCurrencyPopup={this.state.showCurrencyPopup}
          hidePopup={this.handleHideCurrencyPopup}
        />
      </div>
    );
  }
}

Header.propTypes = {
  currentCurrency: PropTypes.shape({ label: PropTypes.string, symbol: PropTypes.string }),
  currencies: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, symbol: PropTypes.string })
  ),
  fetchCurrencies: PropTypes.func,
};
