import React from 'react';
import Categories from '../categories/containers/categories';
import { ReactComponent as CartLogo } from '../assets/cart.svg';
import './header.css';
import CartPopup from '../cart/containers/cart-popup';

export default class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { showPopup: false };
    this.handleOpenPopup = this.handleOpenPopup.bind(this);
    this.handleHidePopup = this.handleHidePopup.bind(this);
  }
  handleOpenPopup() {
    this.setState((state) => {
      return {
        showPopup: !state.showPopup,
      };
    });
  }

  handleHidePopup() {
    this.setState({ showPopup: false });
  }

  render() {
    return (
      <div className="header-wrapper">
        <Categories />
        <button onClick={this.handleOpenPopup}>
          <CartLogo />
        </button>

        <CartPopup showPopup={this.state.showPopup} hidePopup={this.handleHidePopup} />
      </div>
    );
  }
}
