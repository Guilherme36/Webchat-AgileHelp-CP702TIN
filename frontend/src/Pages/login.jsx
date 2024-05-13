import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import app from '../config/firebase';
import { getFirestore, collection, getDocs } from "firebase/firestore";

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loginError, setLoginError] = useState('')

  const navigate = useNavigate()

  const getAccounts = async () => {
    const db = getFirestore(app)
    const accounts = collection(db, 'Accounts')
    const docs = await getDocs(accounts)

    docs.forEach(doc => {
      const data = doc.data()
      if (data.email !== email || data.password !== password) {
        setLoginError('Email ou senha inválidos!')
      }
      if (data.email === email && data.password === password) {
        setLoginError("")
        navigate("/homeLogged");
        console.log("Entrou");
      }
    });

  }

  const validateInput = () => {
    setEmailError('')
    setPasswordError('')

    if ('' === email) {
      setEmailError('Please enter your email')
      return
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }

    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }

    else { getAccounts() }
  }

  const onButtonClick = () => {
    validateInput()
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Entrar</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Entre com seu email..."
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Entre com sua senha..."
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />

      <label className="errorLabel">{loginError}</label>

      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={() => navigate("/")} value={'Voltar'} />
      </div>
    </div>
  )
}

export default Login