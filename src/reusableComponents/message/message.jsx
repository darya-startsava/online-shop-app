import React from 'react';
import { PropTypes } from 'prop-types';
import Button from '../button';
import './message.scss';
import Overlay from '../overlay';

export default class Message extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { handleMessageClose } = this.props;
    handleMessageClose();
  }

  render() {
    const { children } = this.props;
    return (
      <Overlay popup="message">
        <div className="message-wrapper">
          <div className="message">
            <div className="message-text">{children}</div>
            <Button page="product" onClick={this.handleClick}>
              Close
            </Button>
          </div>
        </div>
      </Overlay>
    );
  }
}

Message.propTypes = {
  children: PropTypes.node,
  handleMessageClose: PropTypes.func,
};
