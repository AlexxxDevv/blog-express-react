import { SetStateAction, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header'
import Posts from './components/posts'
import styles from './components/buttonModal.module.css'
import Modal from './components/modal.tsx';
import { baseUrl, request } from './utils/api.ts'
import ModalPostNew from './components/modal-new-post.tsx'

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
  owner: User;
}

function App() {
  const [posts, setPosts] = useState<Post[]>()
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [opened, setOpened] = useState(false);
  const [postNumber, setPostNumber] = useState<number>();

  const fetchData = () => {
    request(`${baseUrl + '/post'}`)
      .then(data => {
        setPosts(data)
      });
  }
  useEffect(() => {
    fetchData()
  }, [visible])
  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  function handleOpenModalForPatch(val: SetStateAction<number | undefined>){
    setOpened(true);
    setPostNumber(val);
}
console.log(postNumber, opened);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <button value={'createBtn'} className={styles.button} onClick={handleOpenModal}>Сделать пост</button>
        <button className={styles.accountExitButton}>Выйти из аккаунта</button>
      </div>
      <Posts sendData={(val) => handleOpenModalForPatch(val)} post={posts} handleOpenModal={() => handleOpenModal()}/>
      {visible && (
        <Modal onClose={handleCloseModal}>
         < ModalPostNew onClose={handleCloseModal} />
        </Modal>
      )}
      {opened && postNumber && (
        <Modal onClose={handleCloseModal}>
         <span>{postNumber}</span>
        </Modal>
      )}
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
