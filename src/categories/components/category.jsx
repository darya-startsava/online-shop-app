import React from 'react';
import PropTypes from 'prop-types';
import ProductsList from '../../products/containers/products-list';

class Category extends React.PureComponent {
  render() {
    const { params, defaultCategory } = this.props;
    const category = params?.category || defaultCategory;
    return (
      <>
        <div>Category: {category}</div>
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
