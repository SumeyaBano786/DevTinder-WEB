import React from 'react'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './components/Body';
//import Login from './Login';
import Login from './components/Login';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Connections from './components/Connections';
import Request from './components/Request';
import Signup from './components/Signup';
import Chat from './components/Chat';

const App = () => {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter>
    <Routes>
     
   <Route path='/' element={<Body/>}>
   <Route path='/' element={<Feed/>}/>
    <Route path='/login' element={<Login/>}/>
   <Route path='/profile' element={<Profile/>}/>
   <Route path='/connections' element={<Connections/>}/>
   <Route path='/requests' element={<Request/>}/>
   <Route path='/signup' element={<Signup/>} />
   <Route path='/chat/:targetUserId' element={<Chat/>}/>


   </Route> 
    </Routes>
   </BrowserRouter>
   </Provider>
  
   
  

    </>
  )
}

export default App