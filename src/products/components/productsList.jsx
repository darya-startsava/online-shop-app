import React from 'react';
import PropTypes from 'prop-types';
import Status from '../../utils/status';
import ProductsListItem from '../containers/productsListItem';
import './productsList.scss';

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
    const { products, status, currentCurrency } = this.props;
    if (status === Status.PENDING) {
      return <div>Loading...</div>;
    }
    if (status === Status.SUCCESS) {
      return (
        <>
          <div className="products-list-wrapper">
            {products.map((i) => {
              const price = i?.prices?.filter(
                (item) => item?.currency?.symbol === currentCurrency.symbol
              )[0];
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
  currentCurrency: PropTypes.shape({ label: PropTypes.string, symbol: PropTypes.string }),
};

export default ProductsList;
