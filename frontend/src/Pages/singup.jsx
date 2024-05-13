import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import app from '../config/firebase';
import { getFirestore, addDoc, collection } from "firebase/firestore";

const SignUp = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordConfirmationError, setPasswordConfirmationError] = useState('')

  const navigate = useNavigate()

  const validateInput = () => {
    setEmailError('')
    setPasswordError('')
    setPasswordConfirmationError('')

    if ('' === email) {
      setEmailError('Por favor, entre com um email')
      return
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('O email precisa ser válido')
      return
    }

    if ('' === password) {
      setPasswordError('Por favor, entre com uma senha')
      return
    }

    if (passwordConfirm !== password) {
      setPasswordConfirmationError('As senhas devem ser iguais')
    }

    else {
      signup().then(navigate("/"))
    }

  }

  const signup = async () => {
    const db = getFirestore(app)
    const data = {
      email,
      password
    }
    try {
      await addDoc(collection(db, "/Accounts"), data)
    } catch (e) {
      console.log(e.message);
    }
  }


  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Crie sua conta</div>
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
          placeholder="Crie uma senha"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
        <br />
        <input
          value={passwordConfirm}
          placeholder="Confirme a senha"
          onChange={(ev) => setPasswordConfirm(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordConfirmationError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={validateInput} value={'Cadastrar'} />
      </div>

    </div>
  )
}

export default SignUp