import React from 'react';
import Categories from '../categories/containers/categories';
import { ReactComponent as CartLogo } from '../assets/cart.svg';
import './header.css';
import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
  render() {
    return (
      <div className="header-wrapper">
        <Categories />
        <Link to="/cart">
          <CartLogo />
        </Link>
      </div>
    );
  }
}
