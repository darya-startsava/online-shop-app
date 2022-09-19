import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.PureComponent {
  render() {
    const { children, onClick } = this.props;
    return <button onClick={onClick}>{children}</button>;
  }
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};
