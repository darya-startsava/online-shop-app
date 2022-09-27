import { PropTypes } from 'prop-types';
import React from 'react';
import Categories from '../../categories/containers/categories';
import { ReactComponent as CartLogo } from '../../assets/cart.svg';
import { ReactComponent as ShowDropdown } from '../../assets/arrowDown.svg';
import { ReactComponent as HideDropdown } from '../../assets/arrowUp.svg';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import './header.scss';
import CartPopup from '../../cart/containers/cartPopup';
import CurrencyPopup from '../../currencyPopup/containers/currencyPopup';
import { productsPropTypes } from '../../utils/propTypes';
import { calculateQuantity } from '../../utils/calculatePriceAndQuantity';

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
    const { currencies } = this.props;
    if (!currencies.length) this.props.fetchCurrencies();
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
    const { currentCurrency, currencies, products } = this.props;
    const productCount = calculateQuantity(products);
    return (
      <div className="header-wrapper">
        <Categories />
        <Logo className="header-logo" />
        <div className="header-buttons-wrapper">
          <button
            className="header-button header-change-currency-button"
            onClick={this.handleOpenCurrencyPopup}
            aria-label="change currency"
          >
            {currentCurrency?.symbol}{' '}
            {this.state.showCurrencyPopup ? <HideDropdown /> : <ShowDropdown />}
          </button>
          <button
            className="header-button header-open-cart-button"
            onClick={this.handleOpenCartPopup}
            aria-label="open cart"
          >
            <CartLogo />
            {productCount && (
              <div className="header-open-cart-button-product-count">{productCount}</div>
            )}
          </button>

          <CartPopup
            showCartPopup={this.state.showCartPopup}
            hidePopup={this.handleHideCartPopup}
          />
          <CurrencyPopup
            currencies={currencies}
            currentCurrency={currentCurrency}
            showCurrencyPopup={this.state.showCurrencyPopup}
            hidePopup={this.handleHideCurrencyPopup}
          />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape(productsPropTypes)),
  currentCurrency: PropTypes.shape({ label: PropTypes.string, symbol: PropTypes.string }),
  currencies: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, symbol: PropTypes.string })
  ),
  fetchCurrencies: PropTypes.func,
};
