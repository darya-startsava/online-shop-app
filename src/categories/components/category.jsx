import React from 'react';
import PropTypes from 'prop-types';
import ProductsList from '../../products/containers/productsList';
import './category.scss';

class Category extends React.PureComponent {
  render() {
    const { params, defaultCategory } = this.props;
    const category = params?.category || defaultCategory;
    return (
      <>
        <div className="category-page-title">{category}</div>
        <ProductsList category={category} />
      </>
    );
  }
}

Category.propTypes = {
  defaultCategory: PropTypes.string,
  params: PropTypes.shape({
    category: PropTypes.string,
  }),
};

export default Category;
