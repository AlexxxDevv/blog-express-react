import { useEffect, useState } from 'react';
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
  useEffect(() => {
    const post = props.posts?.find((post) => post.id === props.postId);
    if (post?.text) {
      setText(post.text)
    }
  }, [])
  const token = localStorage.getItem('accessToken');
  const handlePatchPost = async (text: string) => {
    await request(`${baseUrl + '/post/' + props.postId}`, {
      method: 'PATCH',
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
      <p className={styles.modalHeading}>Отредактируйте ваше сообщение</p>
      <textarea name="postContent" value={text} rows={25} cols={40} onChange={e => setText(e.target.value)} />
      <button onClick={() => handlePatchPost(text)}>Редактировать</button>
    </>
  )
}

export default ModalPostPatch;