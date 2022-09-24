import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

export default class Button extends React.PureComponent {
  render() {
    const { children, onClick, page } = this.props;
    return (
      <button className={`button-reusable button-reusable-page-${page}`} onClick={onClick}>
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  page: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};
