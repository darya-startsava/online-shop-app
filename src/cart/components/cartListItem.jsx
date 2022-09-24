import { PropTypes } from 'prop-types';
import React from 'react';
import ChangeCount from '../../changeCount/containers/changeCount';
import { productPropTypes } from '../../utils/propTypes';
import { ReactComponent as ArrowLeft } from '../../assets/arrowLeft.svg';
import { ReactComponent as ArrowRight } from '../../assets/arrowRight.svg';
import './cartListItem.scss';
import ProductAttributes from '../../reusableComponents/productAttributes/productAttributes';

export default class CartListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { imageUrl: this.props.product.gallery[0] };
    this.handleClickLeft = this.handleClickLeft.bind(this);
    this.handleClickRight = this.handleClickRight.bind(this);
  }

  handleClickLeft() {
    const { product } = this.props;
    this.setState((state) => {
      const index = product.gallery.findIndex((i) => i === state.imageUrl);
      if (!index) {
        return { imageUrl: product.gallery[product.gallery.length - 1] };
      } else {
        return { imageUrl: product.gallery[index - 1] };
      }
    });
  }

  handleClickRight() {
    const { product } = this.props;
    this.setState((state) => {
      const index = product.gallery.findIndex((i) => i === state.imageUrl);
      if (index === product.gallery.length - 1) {
        return { imageUrl: product.gallery[0] };
      } else {
        return { imageUrl: product.gallery[index + 1] };
      }
    });
  }

  render() {
    const { product, cartId, count, selectedAttributes, currentCurrency } = this.props;
    const price = product.prices.filter((i) => i.currency.label === currentCurrency.label)[0];
    return (
      <>
        <div className="cart-list-item-wrapper">
          <div className="cart-list-item-info-wrapper">
            <div className="cart-list-item-brand">{product.brand}</div>
            <div className="cart-list-item-name">{product.name}</div>
            <div className="cart-list-item-price">{price.currency.symbol + price.amount}</div>
            <ProductAttributes
              product={product}
              selectedAttributes={selectedAttributes}
              isDisabled={true}
              page="cart"
            />
          </div>
          <div className="cart-list-item-right-wrapper">
            <ChangeCount cartId={cartId} count={count} />
            <div className="cart-list-item-product-image-wrapper">
              <img className="cart-list-item-product-image" src={this.state.imageUrl} alt="" />
              <div className="cart-list-item-arrow-wrapper">
                <button className="cart-list-item-arrow" onClick={this.handleClickLeft}>
                  <ArrowLeft />
                </button>
                <button className="cart-list-item-arrow" onClick={this.handleClickRight}>
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </>
    );
  }
}

CartListItem.propTypes = {
  id: PropTypes.string,
  product: PropTypes.shape(productPropTypes),
  count: PropTypes.number,
  selectedAttributes: PropTypes.object,
  cartId: PropTypes.string,
  currentCurrency: PropTypes.shape({ label: PropTypes.string, symbol: PropTypes.string }),
};
