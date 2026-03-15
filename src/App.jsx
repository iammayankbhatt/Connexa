import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup' 
import Feed from './pages/feed/Feed'
import Match from './pages/match/Match'
import MainLayout from './layout/MainLayout'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Signup' element={<Signup/>} />

        <Route element={<MainLayout/>} >
          <Route path='/feed' element={<Feed /> } />
          <Route path='/Match' element={<Match/> } />
        </Route>
        
      </Routes>
    </div>
  )
}

export default App
