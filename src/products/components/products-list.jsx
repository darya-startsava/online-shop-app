import React from 'react';
import PropTypes from 'prop-types';
import Status from '../../utils/status';
import ProductsListItem from '../containers/product-list-item';

class ProductsList extends React.PureComponent {
  componentDidMount(prevProps) {
    const { category, fetchProducts } = this.props;
    if (category) {
      fetchProducts(category);
    }
  }

  componentDidUpdate(prevProps) {
    const { category, fetchProducts } = this.props;
    if (category && category !== prevProps.category) {
      fetchProducts(category);
    }
  }

  render() {
    const { products, status } = this.props;
    if (status === Status.PENDING) {
      return <div>Loading...</div>;
    }
    if (status === Status.SUCCESS) {
      return (
        <>
          <div>
            Products:
            {products.map((i) => {
              const price = i?.prices?.filter((item) => item?.currency?.symbol === '$')[0];
              return <ProductsListItem key={i.id} product={i} price={price} />;
            })}
          </div>
        </>
      );
    }
  }
}

ProductsList.propTypes = {
  products: PropTypes.array,
  status: PropTypes.string,
  category: PropTypes.string,
  fetchProducts: PropTypes.func.isRequired,
};

export default ProductsList;
