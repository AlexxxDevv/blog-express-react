import { ChangeEvent, useState } from 'react';
import styles from './modal.module.css';
import { baseUrl, request } from '../utils/api';

type ModalProps = {
  onClose: () => void;
}

const ModalPostNew = (props: ModalProps) => {
  const [text, setText] = useState('Напиши что-нибудь скорее');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [showHiddenText, setShowHiddenText] = useState<boolean>(false)
  const token = localStorage.getItem('accessToken');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file && file.size < 1 * 1000 * 1024) {
      setMediaFile(file);
      setShowHiddenText(false);
    }
    if(file.size > 1 * 1000 * 1024) {
      setShowHiddenText(true)
    }
  };

  const formData = new FormData();
  formData.append('text', text);
  if (mediaFile) {
    formData.append('media', mediaFile);
  }

  const handleSubmitPost = async () => {
    await request(`${baseUrl + '/post'}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    });
    props.onClose();
  }
  return (
    <>
      <p className={styles.modalHeading}>Введите текс поста или прикрипите файл</p>
      <textarea name="postContent" value={text} rows={25} cols={40} onChange={e => setText(e.target.value)} />
      <input  type="file" accept="image/png, image/jpeg, image/gif, video/mp4" onChange={e => handleFileChange(e)} />
      {showHiddenText && (<span>разрешены файлы меньше 1 МБ, jpeg, png gif, mp4</span>)}
      <button disabled={showHiddenText} onClick={() => handleSubmitPost()}>Отправить</button>
    </>
  )
}

export default ModalPostNew;