import { PropTypes } from 'prop-types';
import React from 'react';
import Overlay from '../../reusableComponents/overlay/overlay';
import './currencyPopup.scss';

export default class CurrencyPopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleContainer = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside, true);
  }

  handleClickOutside(event) {
    const { hidePopup, showCurrencyPopup } = this.props;
    if (showCurrencyPopup && !this.toggleContainer.current.contains(event.target)) hidePopup();
  }

  handleClick(currency) {
    const { hidePopup, changeCurrency } = this.props;
    changeCurrency(currency);
    hidePopup();
  }

  render() {
    const { currencies, showCurrencyPopup } = this.props;
    return (
      showCurrencyPopup && (
        <Overlay popup="currency">
          <div className="currency-popup-wrapper">
            <div className="currency-popup-items-wrapper" ref={this.toggleContainer}>
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
