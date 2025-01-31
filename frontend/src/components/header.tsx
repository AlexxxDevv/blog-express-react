import { FC, useState } from "react";
import { baseUrl, request } from "../utils/api";
import styles from './header.module.css';
import { User } from "../App";

type AuthRespons = {
  token: string;
  user: User;
}

type HeaderProps = {
  getUser: (user: User) => void;
}

const Header: FC<HeaderProps> = ({getUser}) => {
  const [regData, setRegData] = useState({
    username: '',
    password: '',
  });
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  })
  const handleRegDataLoginChange = (e: { target: { value: string; }; }) => {
    setRegData({
      ...regData,
      username: e.target.value
    })
  }
  const handleRegDataPasswordChange = (e: { target: { value: string; }; }) => {
    setRegData({
      ...regData,
      password: e.target.value
    })
  }
  const handleLoginDataLoginChange = (e: { target: { value: string; }; }) => {
    setLoginData({
      ...loginData,
      username: e.target.value
    })
  }
  const handleLoginDataPasswordChange = (e: { target: { value: string; }; }) => {
    setLoginData({
      ...loginData,
      password: e.target.value
    })
  }

  const handleRegButtonClick = async (endpoint: string, data: { username: string; password: string; }) => {
    const response = await request(`${baseUrl + '/' + endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    });
    console.log(response)
  }
  const handleAuthButtonClick = async (endpoint: string, data: { username: string; password: string; }) => {
    const response: AuthRespons = await request(`${baseUrl + '/' + endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    });
    getUser(response.user)
    localStorage.setItem("accessToken", response.token)
  }
  return (
    <div className={styles.header}>
      <div className={styles.form}>
        <div className={styles.dataContainer}>
          <div className={styles.inputContainer}>
            <input className={styles.input} type="text" onChange={handleRegDataLoginChange}></input>
          </div>
          <div className={styles.inputContainer}>
            <input className={styles.input} type="text" onChange={handleRegDataPasswordChange}></input>
          </div>
        </div>
        <button className={styles.button} onClick={() => { handleRegButtonClick('signup', regData) }}>Регистрация</button>
      </div>
      <div className={styles.form}>
        <div className={styles.dataContainer}>
          <div className={styles.inputContainer}>
            <input className={styles.input} type="text" onChange={handleLoginDataLoginChange}></input>
          </div>
          <div className={styles.inputContainer}>
            <input className={styles.input} type="text" onChange={handleLoginDataPasswordChange}></input>
          </div>
        </div>
        <button className={styles.button} onClick={() => { handleAuthButtonClick('signin', loginData) }}>Авторизация</button>
      </div>
    </div>
  )
}

export default Header;