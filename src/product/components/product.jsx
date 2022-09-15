import React from 'react';
import PropTypes from 'prop-types';
import Status from '../../utils/status';
import './product.css';
import Button from '../../button/button';

export default class Product extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { imageUrl: '' };
    this.handleClick = this.handleClick.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
  }
  async componentDidMount() {
    const { params, product, fetchProduct } = this.props;
    if (!product) {
      fetchProduct(params.product);
    }
    this.setState({ imageUrl: product.gallery[0] });
  }

  handleClick() {
    console.log('CLICK!');
  }

  handleImageClick(url) {
    this.setState({ imageUrl: url });
  }

  render() {
    const { product, status } = this.props;

    if (status === Status.PENDING || status === Status.INIT) {
      return <div>Loading...</div>;
    }

    if (status === Status.SUCCESS) {
      console.log('product properties', product);
      const currentCurrency = 'USD';
      const price = product.prices.filter((i) => i.currency.label === currentCurrency)[0];
      return (
        <div className="product-info-wrapper">
          <div className="product-image-preview-list">
            {product.gallery.map((i) => (
              <img
                className="product-image-preview"
                key={i}
                src={i}
                alt=""
                onClick={() => {
                  this.handleImageClick(i);
                }}
              />
            ))}
          </div>
          <img className="product-image" src={this.state.imageUrl} alt="" />
          <div>
            <div>Brand: {product.brand}</div>
            <div>Name: {product.name}</div>
            {product.attributes &&
              product.attributes.map((i) => (
                <div key={i.id}>
                  <div>{i.name}:</div>
                  <div className="product-attribute-items">
                    {i.items && i.items.map((item) => <div key={item.id}>{item.displayValue}</div>)}
                  </div>
                </div>
              ))}
            <div>Price:</div>
            <div>{price.currency.symbol + price.amount}</div>
            <Button name={'add to cart'} onClick={this.handleClick} />
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        </div>
      );
    }
  }
}
Product.propTypes = {
  product: PropTypes.shape({
    attributes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            displayValue: PropTypes.string,
            value: PropTypes.string,
            id: PropTypes.string,
          })
        ),
      })
    ),
    brand: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
    inStock: PropTypes.bool,
    gallery: PropTypes.array,
    name: PropTypes.string,
    prices: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number,
        currency: PropTypes.shape({ label: PropTypes.string, symbol: PropTypes.string }),
      })
    ),
  }),
  status: PropTypes.string,
  params: PropTypes.shape({ product: PropTypes.string }),
  fetchProduct: PropTypes.func,
};
