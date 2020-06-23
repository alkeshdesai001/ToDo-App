import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import './Modal.scss';

const ModalOverlay = (props) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      {props.header && (
        <header className={`modal__header ${props.headerClass}`}>
          <h2>{props.header}</h2>
        </header>
      )}

      <div className={`modal__content ${props.contentClass}`}>
        {props.children}
      </div>
      {props.footer && (
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      )}
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.open && <Backdrop onClick={() => props.setOpen(false)} />}
      <CSSTransition
        in={props.open}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames='modal'
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
