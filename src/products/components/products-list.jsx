import React from 'react';
import PropTypes from 'prop-types';
import Status from '../../utils/status';

class ProductsList extends React.PureComponent {
  async componentDidMount(prevProps) {
    const { category, fetchProducts } = this.props;
    if (category) {
      fetchProducts(category);
    }
  }

  async componentDidUpdate(prevProps) {
    const { category, fetchProducts } = this.props;
    if (category && category !== prevProps.category) {
      fetchProducts(category);
    }
  }

  render() {
    const { products, status } = this.props;
    console.log(products[0]?.prices.filter((item) => item?.currency?.symbol === '$')[0]);
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
              return (
                <div key={i.id}>
                  <div>{i.brand + ' ' + i.name}</div>
                  <div>{price?.currency?.symbol + price?.amount}</div>
                </div>
              );
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
