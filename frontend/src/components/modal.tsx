import React, { ReactNode, useState } from 'react';
import styles from './modal.module.css';
import { createPortal } from 'react-dom';
import ModalOverlay from './modal-overlay';
import { baseUrl, request } from '../utils/api';

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
}

const Modal = (props: ModalProps) => {
  const modalRoot: HTMLElement | null = document.getElementById("modals");
  const [text, setText] = useState('Напиши что-нибудь скорее');
  const token = localStorage.getItem('accessToken');
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

  const handleSubmitPost = async (text: string) => {
    const response = await request(`${baseUrl + '/post'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ text: text })
    });
    console.log(response);
    props.onClose();
  }
  return (
    <>
      {modalRoot !== null && createPortal(
        <>
          <div className={styles.modal}>
            <span onClick={props.onClose} className={`${styles.modalCloseIcon}`}></span>
            <div className={styles.formContainer}>
              <p className={styles.modalHeading}>Введите текс поста или прикрипите файл</p>
              <textarea name="postContent" value={text} rows={25} cols={40} onChange={e => setText(e.target.value)} />
              <button onClick={() => handleSubmitPost(text)}>Отправить</button>
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