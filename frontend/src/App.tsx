import { SetStateAction, useEffect, useState } from 'react'
import './App.css'
import Header from './components/header'
import Posts from './components/posts'
import styles from './components/buttonModal.module.css'
import Modal from './components/modal.tsx';
import { baseUrl, request } from './utils/api.ts'
import ModalPostNew from './components/modal-new-post.tsx'
import ModalPostPatch from './components/modal-patch-post.tsx'

export type User = {
  id: number;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export type Post = {
  id: number;
  createdAt: string;
  updatedAt: string;
  text: string;
  media: string;
  owner: User;
}

function App() {
  const [posts, setPosts] = useState<Post[]>()
  const [visible, setVisible] = useState(false);
  const [opened, setOpened] = useState(false);
  const [postNumber, setPostNumber] = useState<number>();
  const [user, setUser] = useState<User>();
  const token = localStorage.getItem('accessToken');
  const fetchUser = async () => {
    try {
      const res = await request(`${baseUrl + '/profile'}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Bearer ${token}`,
        },
      });
      setUser(res);
    }
    catch (err) { console.log(err) }
  }
  const fetchData = () => {
    request(`${baseUrl + '/post'}`)
      .then(data => {
        setPosts(data)
      });
  }
  useEffect(() => {
    if (token) {
      fetchUser();
    }
    fetchData()
  }, [visible, opened, token])
  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
    setOpened(false);
  };

  function handleOpenModalForPatch(val: SetStateAction<number | undefined>) {
    setOpened(true);
    setPostNumber(val);
  }

  const handleUser = (user: SetStateAction<User | undefined>) => {
    setUser(user);
  }

  const handleExit = () => {
    localStorage.removeItem('accessToken');
    setUser(undefined);
  }

  return (
    <>
      <Header getUser={(user: User) => handleUser(user)} />
      <div className={styles.container}>
        <button disabled={!user} className={styles.button} onClick={handleOpenModal}>Сделать пост</button>
        <button disabled={!user} className={styles.accountExitButton} onClick={handleExit}>Выйти из аккаунта</button>
        {user && (<p>Вы авторизованы как <span>{user?.username}</span></p>)}
      </div>
      <Posts sendData={(val) => handleOpenModalForPatch(val)} post={posts} user={user} />
      {visible && (
        <Modal onClose={handleCloseModal}>
          < ModalPostNew onClose={handleCloseModal} />
        </Modal>
      )}
      {opened && postNumber && (
        <Modal onClose={handleCloseModal}>
          <  ModalPostPatch onClose={handleCloseModal} postId={postNumber} posts={posts} />
        </Modal>
      )}
    </>
  )
}

export default App
