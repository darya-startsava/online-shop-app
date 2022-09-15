import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.PureComponent {
  render() {
    const { name, onClick } = this.props;
    return <button onClick={onClick}>{name}</button>;
  }
}

Button.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
};
