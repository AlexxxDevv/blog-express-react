import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from './ModalOverlay';

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
}

const Modal = (props: ModalProps) => {
  const modalRoot: HTMLElement | null = document.getElementById("modals");
  React.useEffect(() => {
    const escFunction = (e: { key: string; }): void => {
      if (e.key === "Escape") {
        props.onClose()
      }
    }
    document.addEventListener("keydown", escFunction);
    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [])

  return (
    <>
      {modalRoot !== null && createPortal(
        <>
          <div className='w-[90vw] h-[539px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#f4f5f9] z-10 border border-[#4C4CFF33] rounded-[40px] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.04)] md:w-[720px]'>
            <span onClick={props.onClose} className='absolute top-13 right-10 cursor-pointer'></span>
            <div className="flex flex-col items-center p-4">
              {props.children}
            </div>
          </div>
          <ModalOverlay onClick={props.onClose} />
        </>,
        modalRoot
      )}
    </>
  )
}

export default Modal;