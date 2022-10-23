import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './overlay.scss';

const overlayRoot = document.getElementById('overlay-root');

export default class Overlay extends React.PureComponent {
  render() {
    const { children, popup } = this.props;
    return ReactDOM.createPortal(
      <div className={`overlay overlay-popup-${popup}`} id="overlay">
        {children}
      </div>,
      overlayRoot
    );
  }
}

Overlay.propTypes = {
  popup: PropTypes.string,
  children: PropTypes.node,
};
