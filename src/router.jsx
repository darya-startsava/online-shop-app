import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Cart from './cart/cart';
import Product from './product/product';
import Category from './categories/containers/category';

export default class Router extends React.PureComponent {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Category />} />
        <Route path="category/:category" element={<Category />} />
        <Route path="product" element={<Product />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    );
  }
}
