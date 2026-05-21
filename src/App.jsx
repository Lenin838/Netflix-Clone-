import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import MovieDetail from './pages/MovieDetail/MovieDetail'
import Watchlist from './pages/Watchlist/Watchlist'
import { useAuth } from './context/AuthContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    if(!loading){
      if(user){
        if(location.pathname === '/login') navigate('/')
      }else{
        if(location.pathname !== '/login') navigate('/login')
      }
    }
  },[user, loading, location.pathname, navigate])

  if(loading) return null;

  return (
    <div>
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>
        <Route path='/movie/:id' element={<MovieDetail/>}/>
        <Route path='/watchlist' element={<Watchlist/>}/>
      </Routes>
    </div>
  )
}

export default App
