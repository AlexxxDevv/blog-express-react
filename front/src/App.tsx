import { SetStateAction, useEffect, useState } from 'react';
import './App.css'
import Header from './mycomponents/Header'
import { baseUrl, request } from './utils/api';
import { Post, User } from './common/types';
import Posts from './mycomponents/Posts';
import MyButton from './shadcn/MyButton';
import Modal from './mycomponents/Modal';
import ModalPostNew from './mycomponents/ModalPostNew';
import ModalPostPatch from './mycomponents/ModalPostPatch';


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
  console.log(visible)
  return (
    <>
      <Header getUser={(user: User) => handleUser(user)} />
      <div className='mt-5 grid grid-cols-2  gap-2 justify-center'>
        <MyButton disabled={!user} title={'Сделать пост'} onClick={handleOpenModal} />
        <MyButton disabled={!user} title={'Выйти из аккаунта'} onClick={handleExit} />
        {user && (<p className='flex items-center gap-2 col-span-2 sm:col-span-1 justify-center'>Вы авторизованы как <span className='text-lg font-bold'>{user?.username}</span></p>)}
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
