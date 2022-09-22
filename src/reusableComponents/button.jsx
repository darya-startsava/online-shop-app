import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

export default class Button extends React.PureComponent {
  render() {
    const { children, onClick } = this.props;
    return (
      <button className="button-reusable" onClick={onClick}>
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};
