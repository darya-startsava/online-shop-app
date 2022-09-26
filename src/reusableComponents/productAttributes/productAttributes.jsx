import PropTypes from 'prop-types';
import React from 'react';
import { productPropTypes } from '../../utils/propTypes';
import './productAttributes.scss';

export default class ProductAttributes extends React.PureComponent {
  handleClick(attribute, value) {
    const { handleAttributeClick } = this.props;
    handleAttributeClick(attribute, value);
  }

  render() {
    const { product, selectedAttributes, isDisabled, page } = this.props;
    const disabled = isDisabled ? 'disabled' : '';
    return (
      <>
        {product.attributes &&
          product.attributes.map((i) => (
            <div className={`product-attributes-wrapper-page-${page} ${disabled}`} key={i.id}>
              <div className="product-attribute-title">{i.name}:</div>
              <div className={`product-attribute-items-${i.type} ${i.type}-page-${page}`}>
                {i.items &&
                  i.items.map((item) => (
                    <button
                      className={
                        item.id === selectedAttributes[i.id] ? ' selected' : ' notSelected'
                      }
                      style={{ backgroundColor: item.value }}
                      key={item.id}
                      disabled={isDisabled}
                      onClick={() => this.handleClick(i.id, item.id)}
                    >
                      {i.type === 'text' && item.value}
                    </button>
                  ))}
              </div>
            </div>
          ))}
      </>
    );
  }
}

ProductAttributes.propTypes = {
  product: PropTypes.shape(productPropTypes),
  currentCurrency: PropTypes.shape({ label: PropTypes.string, symbol: PropTypes.string }),
  selectedAttributes: PropTypes.object,
  isDisabled: PropTypes.bool,
  page: PropTypes.string,
  handleAttributeClick: PropTypes.func,
};
