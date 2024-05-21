import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/home'
import Login from './Pages/login'
import SignUp from './Pages/singup'
import HomeLogged from './Pages/homeLogged'
import LandingPage from './Pages/landingPage'
import './App.css'
import { useState } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

    
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/home" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/signup" element={<SignUp />} />
         <Route path="/homeLogged" element={<HomeLogged />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App