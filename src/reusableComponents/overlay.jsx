import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './overlay.scss';

const overlayRoot = document.getElementById('overlay-root');

export default class Overlay extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { closePopup } = this.props;
    if (closePopup) closePopup();
  }

  render() {
    const { children, popup } = this.props;
    return ReactDOM.createPortal(
      <div className={`overlay overlay-popup-${popup}`} id="overlay" onClick={this.handleClick}>
        {children}
      </div>,
      overlayRoot
    );
  }
}

Overlay.propTypes = {
  popup: PropTypes.string,
  children: PropTypes.node,
  closePopup: PropTypes.func,
};
