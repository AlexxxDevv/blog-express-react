import { ChangeEvent, useEffect, useState } from 'react';
import styles from './modal.module.css';
import { baseUrl, request } from '../utils/api';
import { Post } from './posts';

type ModalProps = {
  onClose: () => void;
  postId: number;
  posts: Post[] | undefined;
}

const ModalPostPatch = (props: ModalProps) => {
  const [text, setText] = useState('Напиши что-нибудь скорее');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [showHiddenText, setShowHiddenText] = useState<boolean>(false);

  const formData = new FormData();
  formData.append('text', text);
  if (mediaFile) {
    formData.append('media', mediaFile);
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file && file.size < 1 * 1000 * 1024) {
      setMediaFile(file);
      setShowHiddenText(false);
    }
    if (file.size > 1 * 1000 * 1024) {
      setShowHiddenText(true)
    }
  };
  useEffect(() => {
    const post = props.posts?.find((post) => post.id === props.postId);
    if (post?.text) {
      setText(post.text)
    }
  }, [])
  const token = localStorage.getItem('accessToken');
  const handlePatchPost = async () => {
    await request(`${baseUrl + '/post/' + props.postId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    });
    props.onClose();
  }

  return (
    <>
      <p className={styles.modalHeading}>Отредактируйте ваше сообщение</p>
      <textarea name="postContent" value={text} rows={25} cols={40} onChange={e => setText(e.target.value)} />
      <input type="file" accept="image/png, image/jpeg, image/gif, video/mp4" onChange={e => handleFileChange(e)} />
      {showHiddenText && (<span>разрешены файлы меньше 1 МБ, jpeg, png gif, mp4</span>)}
      <button onClick={() => handlePatchPost()}>Редактировать</button>
    </>
  )
}

export default ModalPostPatch;