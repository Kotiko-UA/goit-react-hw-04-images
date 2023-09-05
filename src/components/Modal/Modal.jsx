import { Component } from 'react';
import { ModalDiv, Overlay } from './Modal.styled';

class Modal extends Component {
  state = {};
  componentDidMount() {
    window.addEventListener('keydown', this.props.onExitModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.onExitModal);
  }

  render() {
    return (
      <Overlay onClick={this.props.onExitModal}>
        <ModalDiv>
          <img src={this.props.modalUrl} alt={this.props.alt} />
        </ModalDiv>
      </Overlay>
    );
  }
}

export default Modal;
