import React from 'react';
import PropTypes from 'prop-types';
import Status from '../../utils/status';
import './product.scss';
import Button from '../../reusableComponents/button';
import { productPropTypes } from '../../utils/propTypes';
import Loading from '../../reusableComponents/loading';
import ProductAttributes from '../../reusableComponents/productAttributes/productAttributes';

export default class Product extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { imageUrl: '', selectedAttributes: {} };
    this.handleClick = this.handleClick.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleAttributeClick = this.handleAttributeClick.bind(this);
  }
  async componentDidMount() {
    const { params, product, fetchProduct, fetchCurrencies } = this.props;
    if (!product) {
      const product = await fetchProduct(params.product);
      fetchCurrencies();
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
    const selectedAttributes = this.state.selectedAttributes;
    const cartId = product.id + JSON.stringify(this.state.selectedAttributes);
    addProductToCart(product.id, product, selectedAttributes, cartId);
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
      return (
        <div className="product-wrapper">
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
            <div className="product-price">{price?.currency?.symbol + price?.amount}</div>
            <Button onClick={this.handleClick} page="product">
              add to cart
            </Button>
            <div
              className="product-description"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
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
  fetchProduct: PropTypes.func,
  fetchCurrencies: PropTypes.func,
  addProductToCart: PropTypes.func,
};
