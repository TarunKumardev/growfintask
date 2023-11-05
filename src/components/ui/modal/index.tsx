import React, { ReactNode, FC, useContext } from 'react';

interface ModalContextProps {
  onClose: (value: number | undefined) => void;
}

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: (value: number | undefined) => void;
  children: ReactNode;
}

export const ModalComponentContext = React.createContext<ModalContextProps | undefined>(undefined);

const Modal: FC<ModalProps> & {
  Header: FC<React.HTMLAttributes<HTMLDivElement>>;
  Body: FC<React.HTMLAttributes<HTMLDivElement>>;
  Footer: FC<React.HTMLAttributes<HTMLDivElement>>;
} = ({ onClose, children, ...props } ) => {
  return (
    <ModalComponentContext.Provider value={{ onClose }}>
      <div {...props} className='modal-content' onClick={(e) => e.stopPropagation()}>
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child);
          }
          return child;
        })}
      </div>
    </ModalComponentContext.Provider>
  );
}

Modal.Header = ({ children, ...props }) => (
  <div className="modal-header" {...props}  >{children}</div>
);

Modal.Body = ({ children, ...props }) => (
  <div  className="modal-body" {...props}  >{children}</div>
);

Modal.Footer = ({ children, ...props }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { onClose } = useContext(ModalComponentContext) || {};  
  return (
    <div  className="modal-footer" {...props}>
      <button className='closebutton' onClick={() => onClose(null)}>Close</button>
      {children}
    </div>
  );
}

export default Modal;
