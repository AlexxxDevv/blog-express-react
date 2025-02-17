import { FC, useState } from 'react';
import MyButton from '../shadcn/MyButton'
import MyInput from '../shadcn/MyInput'
import { AuthRespons, User } from '@/common/types';
import { baseUrl, request } from '@/utils/api';

type HeaderProps = {
  getUser: (user: User) => void;
}

const Header: FC<HeaderProps> = ({ getUser }) => {
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
    await request(`${baseUrl + '/' + endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    });
    setRegData({
      username: '',
      password: '',
    })
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
    setLoginData({
      username: '',
      password: '',
    })
  }
  return (
    <div className="grid grid-cols-1 grid-rows-2 gap-4">
      <div className="grid grid-cols-3 grid-rows-1 gap-2">
        <MyInput value={regData.username} type={'text'} placeholder={'придумайте логин'} onChange={(e) => { handleRegDataLoginChange(e) }} />
        <MyInput value={regData.password}  type={'text'} placeholder={'придумайте пароль'} onChange={(e) => { handleRegDataPasswordChange(e) }} />
        <MyButton title={'Регистрация'} onClick={() => handleRegButtonClick('signup', regData)} />
      </div>
      <div className="grid grid-cols-3 grid-rows-1 gap-2">
        <MyInput value={loginData.username} type={'text'} placeholder={'Ваш логин'} onChange={(e) => { handleLoginDataLoginChange(e) }} />
        <MyInput value={loginData.password} type={'text'} placeholder={'Ваш пароль'} onChange={(e) => { handleLoginDataPasswordChange(e) }} />
        <MyButton title={'Авторизация'} onClick={() => { handleAuthButtonClick('signin', loginData) }} />
      </div>
    </div>
  )
}

export default Header
