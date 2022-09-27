import { PropTypes } from 'prop-types';
import React from 'react';
import Overlay from '../../reusableComponents/overlay';
import './currencyPopup.scss';

export default class CurrencyPopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }
  closePopup() {
    const { hidePopup } = this.props;
    hidePopup();
  }

  handleClick(currency) {
    const { changeCurrency } = this.props;
    changeCurrency(currency);
    this.closePopup();
  }

  render() {
    const { currencies, showCurrencyPopup } = this.props;
    return (
      showCurrencyPopup && (
        <Overlay popup="currency" closePopup={this.closePopup}>
          <div className="currency-popup-wrapper">
            <div className="currency-popup-items-wrapper">
              {currencies?.map((currency) => (
                <button key={currency.label} onClick={() => this.handleClick(currency)}>
                  {currency.symbol + ' ' + currency.label}
                </button>
              ))}
            </div>
          </div>
        </Overlay>
      )
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
