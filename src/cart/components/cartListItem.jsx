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
    const { product, cartId, count, selectedAttributes, currentCurrency, page } = this.props;
    const price = product.prices.filter((i) => i.currency.label === currentCurrency.label)[0];
    return (
      <>
        <div className="cart-list-item-wrapper">
          <div className="cart-list-item-info-wrapper">
            <div className={`cart-list-item-brand-page-${page}`}>{product.brand}</div>
            <div className={`cart-list-item-name-page-${page}`}>{product.name}</div>
            <div className={`cart-list-item-price-page-${page}`}>
              {price.currency.symbol + (Math.round(price.amount * 100) / 100).toFixed(2)}
            </div>
            <ProductAttributes
              product={product}
              selectedAttributes={selectedAttributes}
              isDisabled={true}
              page={page}
            />
          </div>
          <div className={`cart-list-item-right-wrapper cart-list-item-right-wrapper-page-${page}`}>
            <ChangeCount cartId={cartId} count={count} page={page} />
            <div
              className={`cart-list-item-product-image-wrapper cart-list-item-product-image-page-${page}-wrapper`}
            >
              <img
                className={`cart-list-item-product-image-page-${page}`}
                src={this.state.imageUrl}
                alt=""
              />
              {page === 'cart' && product.gallery.length > 1 && (
                <div className="cart-list-item-arrow-wrapper">
                  <button className="cart-list-item-arrow" onClick={this.handleClickLeft}>
                    <ArrowLeft />
                  </button>
                  <button className="cart-list-item-arrow" onClick={this.handleClickRight}>
                    <ArrowRight />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {page === 'cart' && <hr />}
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
  page: PropTypes.string,
};
