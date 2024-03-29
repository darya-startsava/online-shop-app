import React from 'react';
import PropTypes from 'prop-types';
import Status from '../../utils/status';
import './product.scss';
import Button from '../../reusableComponents/button/button';
import { productPropTypes } from '../../utils/propTypes';
import Loading from '../../reusableComponents/loading/loading';
import ProductAttributes from '../../reusableComponents/productAttributes/productAttributes';
import Message from '../../reusableComponents/message/message';
import parse from 'html-react-parser';

export default class Product extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { imageUrl: '', selectedAttributes: {}, showMessage: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleAttributeClick = this.handleAttributeClick.bind(this);
    this.handleMessageClose = this.handleMessageClose.bind(this);
  }
  async componentDidMount() {
    const { params, product, currentCurrency, fetchProduct, fetchCurrencies } = this.props;
    if (!product) {
      const product = await fetchProduct(params.product);
      if (!Object.keys(currentCurrency).length) fetchCurrencies();
      const selectedAttributes = {};
      product.attributes.forEach((i) => {
        selectedAttributes[i.id] = i.items[0].id;
      });
      this.setState({ imageUrl: product?.gallery[0], selectedAttributes, showMessage: false });
    } else {
      const selectedAttributes = {};
      product.attributes.forEach((i) => {
        selectedAttributes[i.id] = i.items[0].id;
      });
      this.setState({ imageUrl: product?.gallery[0], selectedAttributes, showMessage: false });
    }
  }
  handleClick() {
    const { addProductToCart, product } = this.props;
    const selectedAttributes = this.state.selectedAttributes;
    const cartId = product.id + JSON.stringify(this.state.selectedAttributes);
    addProductToCart(product.id, product, selectedAttributes, cartId);
    this.setState({ showMessage: true });
  }

  handleMessageClose() {
    this.setState({ showMessage: false });
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
    const { product, status, currentCurrency } = this.props;

    if (status === Status.PENDING || status === Status.INIT) {
      return <Loading />;
    }

    if (status === Status.SUCCESS) {
      const price = product.prices.filter((i) => i.currency.label === currentCurrency?.label)[0];
      const productPrice =
        price?.currency?.symbol + (Math.round(price?.amount * 100) / 100).toFixed(2);
      return (
        <div className="product-wrapper">
          {this.state.showMessage && (
            <Message handleMessageClose={this.handleMessageClose}>
              Product was added to the cart
            </Message>
          )}
          <div className="product-image-preview-list">
            {product.gallery.map((i) => (
              <div className="product-image-preview-wrapper" key={i}>
                <img
                  className="product-image-preview"
                  key={i}
                  src={i}
                  alt=""
                  onClick={() => {
                    this.handleImageClick(i);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="product-image-wrapper">
            <img className="product-image" src={this.state.imageUrl} alt="" />
          </div>
          <div className="product-information-wrapper">
            <div className="product-brand">{product.brand}</div>
            <div className="product-name">{product.name}</div>
            <ProductAttributes
              product={product}
              selectedAttributes={this.state.selectedAttributes}
              handleAttributeClick={this.handleAttributeClick}
              isDisabled={false}
              page="product"
            />
            <div className="product-attribute-title">Price:</div>
            <div className="product-price">{productPrice || ' '}</div>
            <Button onClick={this.handleClick} page="product" isDisabled={!product.inStock}>
              add to cart
            </Button>
            <div className="product-description">{parse(product.description)}</div>
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
  currentCurrency: PropTypes.shape({ label: PropTypes.string, symbol: PropTypes.string }),
  showMessage: PropTypes.bool,
  fetchProduct: PropTypes.func,
  fetchCurrencies: PropTypes.func,
  addProductToCart: PropTypes.func,
};
