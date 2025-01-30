import { useState } from "react"

export default function Header () {
  const [regData, setRegData] = useState({
    username: '',
    password: '',
  });
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
  console.log(regData)
  return (
    <div className='header'>
      <input type="text" onChange={handleRegDataLoginChange}></input>
      <input type="text" onChange={handleRegDataPasswordChange}></input>
      <button>Регистрация</button>
    </div>
  )
}