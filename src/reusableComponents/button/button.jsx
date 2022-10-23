import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

export default class Button extends React.PureComponent {
  render() {
    const { isDisabled, children, onClick, page } = this.props;
    const isDisabledClassName = isDisabled ? 'button-disabled' : '';
    return (
      <button
        className={`button-reusable button-reusable-page-${page} ${isDisabledClassName}`}
        onClick={onClick}
        disabled={isDisabled}
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  page: PropTypes.string,
  isDisabled: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
};
