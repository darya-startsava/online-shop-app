import { PropTypes } from 'prop-types';
import React from 'react';
import ChangeCount from '../../changeCount/containers/changeCount';
import { productPropTypes } from '../../utils/propTypes';
import './cart-list-item.css';

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
      <div className="cart-list-item-wrapper">
        <div>
          <div>{product.brand}</div>
          <div>{product.name}</div>
          <div>{price.currency.symbol + price.amount}</div>
          {product.attributes &&
            product.attributes.map((i) => (
              <div key={i.id}>
                <div>{i.name}:</div>
                <div className="product-attribute-items">
                  {i.items &&
                    i.items.map((item) => (
                      <button
                        className={item.id === selectedAttributes[i.id] ? 'selected' : ''}
                        key={item.id}
                      >
                        {item.displayValue}
                      </button>
                    ))}
                </div>
              </div>
            ))}
        </div>
        <ChangeCount cartId={cartId} count={count} />
        <div>
          <img className="cart-list-item-product-image" src={this.state.imageUrl} alt="" />
          <button onClick={this.handleClickLeft}>&lt;</button>
          <button onClick={this.handleClickRight}>&gt;</button>
        </div>
      </div>
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
