import  { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalProps {
  children: ReactNode;
}

const ModalPortal = ({ children } : ModalPortalProps) => {
  let modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.id = 'modal-root';
    document.body.appendChild(modalRoot);
  }

  return createPortal(children, modalRoot);
};

export default ModalPortal;
