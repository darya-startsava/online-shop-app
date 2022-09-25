import { PropTypes } from 'prop-types';
import React from 'react';
import { ReactComponent as Plus } from '../../assets/plus.svg';
import { ReactComponent as Minus } from '../../assets/minus.svg';
import './changeCount.scss';

export default class ChangeCount extends React.PureComponent {
  constructor(props) {
    super(props);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    const { cartId, incrementProductCount } = this.props;
    incrementProductCount(cartId);
  }
  decrement() {
    const { cartId, decrementProductCount } = this.props;
    decrementProductCount(cartId);
  }
  render() {
    const { count, page } = this.props;
    return (
      <div className={`change-count-wrapper change-count-wrapper-page-${page}`}>
        <button className="change-count-button" onClick={this.increment}>
          <Plus />
        </button>
        <div className="change-count-counter">{count}</div>
        <button className="change-count-button" onClick={this.decrement}>
          <Minus />
        </button>
      </div>
    );
  }
}

ChangeCount.propTypes = {
  count: PropTypes.number,
  cartId: PropTypes.string,
  page: PropTypes.string,
  incrementProductCount: PropTypes.func,
  decrementProductCount: PropTypes.func,
};
