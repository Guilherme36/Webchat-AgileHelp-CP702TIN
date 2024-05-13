import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = (props) => {
  const navigate = useNavigate()

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Bem Vindo!</div>
        <div id="subtitle">AgileHelp chat</div>
      </div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={() => navigate("/login")}
          value={'Entrar'}
        />
        <input
          className={'inputButton'}
          type="button"
          onClick={() => navigate("/signup")}
          value={'Cadastre-se'}
        />
      </div>
    </div>
  )
}

export default Home