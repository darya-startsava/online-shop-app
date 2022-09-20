import { PropTypes } from 'prop-types';
import React from 'react';
import './currencyPopup.css';

export default class CurrencyPopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(currency) {
    const { changeCurrency, hidePopup } = this.props;
    changeCurrency(currency);
    hidePopup(currency);
  }
  render() {
    const { currencies, showCurrencyPopup } = this.props;
    let currencyPopup = 'currency-popup';
    if (showCurrencyPopup) currencyPopup += ' currency-popup-show';
    return (
      <div className={currencyPopup}>
        <div className="currency-popup-wrapper">
          {currencies?.map((currency) => (
            <button key={currency.label} onClick={() => this.handleClick(currency)}>
              {currency.label + '' + currency.symbol}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

CurrencyPopup.propTypes = {
  currentCurrency: PropTypes.shape({ label: PropTypes.string, symbol: PropTypes.string }),
  currencies: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, symbol: PropTypes.string })
  ),
  showCurrencyPopup: PropTypes.bool,
  changeCurrency: PropTypes.func,
  hidePopup: PropTypes.func,
};
