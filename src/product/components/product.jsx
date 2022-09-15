import React from 'react';
import PropTypes from 'prop-types';
import Status from '../../utils/status';
import './product.css';
import Button from '../../button/button';
import { productPropTypes } from '../../utils/propTypes';

export default class Product extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { imageUrl: '', selectedAttributes: [] };
    this.handleClick = this.handleClick.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
  }
  async componentDidMount() {
    const { params, product, fetchProduct } = this.props;
    if (!product) {
      const product = await fetchProduct(params.product);
      const selectedAttributes = {};
      product.attributes.forEach((i) => {
        selectedAttributes[i.id] = i.items[0].id;
      });
      this.setState({ imageUrl: product?.gallery[0], selectedAttributes });
    } else {
      const selectedAttributes = {};
      product.attributes.forEach((i) => {
        selectedAttributes[i.id] = i.items[0].id;
      });
      this.setState({ imageUrl: product?.gallery[0], selectedAttributes });
    }
  }
  handleClick() {
    const { addProductToCart, product } = this.props;
    addProductToCart({
      id: product.id,
      product,
      selectedAttributes: this.state.selectedAttributes,
    });
  }

  handleImageClick(url) {
    this.setState({ imageUrl: url });
  }

  handleAttributeClick(attribute, value) {
    this.setState((state) => {
      return { selectedAttributes: { ...state.selectedAttributes, [attribute]: value } };
    });
  }
  render() {
    const { product, status } = this.props;

    if (status === Status.PENDING || status === Status.INIT) {
      return <div>Loading...</div>;
    }

    if (status === Status.SUCCESS) {
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
                    {i.items &&
                      i.items.map((item) => (
                        <button
                          className={
                            item.id === this.state.selectedAttributes[i.id] ? 'selected' : ''
                          }
                          key={item.id}
                          onClick={() => this.handleAttributeClick(i.id, item.id)}
                        >
                          {item.displayValue}
                        </button>
                      ))}
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
  product: PropTypes.shape(productPropTypes),
  status: PropTypes.string,
  params: PropTypes.shape({ product: PropTypes.string }),
  fetchProduct: PropTypes.func,
  addProductToCart: PropTypes.func,
};
