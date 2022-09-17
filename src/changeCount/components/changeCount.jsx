import { PropTypes } from 'prop-types';
import React from 'react';

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
    const { count } = this.props;
    return (
      <div>
        <button onClick={this.increment}>+</button>
        <div>{count}</div>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}

ChangeCount.propTypes = {
  count: PropTypes.number,
  cartId: PropTypes.string,
  incrementProductCount: PropTypes.func,
  decrementProductCount: PropTypes.func,
};
