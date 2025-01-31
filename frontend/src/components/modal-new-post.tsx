import { useState } from 'react';
import styles from './modal.module.css';
import { baseUrl, request } from '../utils/api';

type ModalProps = {
  onClose: () => void;
}

const ModalPostNew = (props: ModalProps) => {
  const [text, setText] = useState('Напиши что-нибудь скорее');
  const token = localStorage.getItem('accessToken');
  const handleSubmitPost = async (text: string) => {
    await request(`${baseUrl + '/post'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ text: text })
    });
    props.onClose();
  }
  return (
    <>
      <p className={styles.modalHeading}>Введите текс поста или прикрипите файл</p>
      <textarea name="postContent" value={text} rows={25} cols={40} onChange={e => setText(e.target.value)} />
      <button onClick={() => handleSubmitPost(text)}>Отправить</button>
    </>
  )
}

export default ModalPostNew;