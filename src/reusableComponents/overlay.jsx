import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './overlay.scss';

const overlayRoot = document.getElementById('overlay-root');

export default class Overlay extends React.PureComponent {
  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(<div className="overlay">{children}</div>, overlayRoot);
  }
}

Overlay.propTypes = {
  children: PropTypes.node,
};
