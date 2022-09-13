import React from 'react';
import PropTypes from 'prop-types';
import Status from '../../utils/status';

export default class Product extends React.PureComponent {
  async componentDidMount() {
    const { params, product, fetchProduct } = this.props;
    if (!product) {
      fetchProduct(params.product);
    }
  }

  render() {
    const { product, status } = this.props;
    if (status === Status.PENDING || status === Status.INIT) {
      return <div>Loading...</div>;
    }
    if (status === Status.SUCCESS) {
      console.log(this.props);
      console.log('product properties', product);
      return <div>Product</div>;
    }
  }
}
Product.propTypes = {
  product: PropTypes.shape({
    attributes: PropTypes.array,
    brand: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
    inStock: PropTypes.bool,
    gallery: PropTypes.array,
    name: PropTypes.string,
    prices: PropTypes.array,
  }),
  status: PropTypes.string,
  params: PropTypes.shape({ product: PropTypes.string }),
  fetchProduct: PropTypes.func,
  reset: PropTypes.func,
};
