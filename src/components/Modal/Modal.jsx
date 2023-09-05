import { useEffect } from 'react';
import { ModalDiv, Overlay } from './Modal.styled';

export const Modal = props => {
  useEffect(() => {
    window.addEventListener('keydown', props.onExitModal);

    return () => {
      window.removeEventListener('keydown', props.onExitModal);
    };
  }, [props.onExitModal]);

  return (
    <Overlay onClick={props.onExitModal}>
      <ModalDiv>
        <img src={props.modalUrl} alt={props.alt} />
      </ModalDiv>
    </Overlay>
  );
};
