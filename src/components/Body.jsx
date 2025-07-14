import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';



const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userData= useSelector((store)=>store.user);

const fetchUser= async()=>{
  if(userData) return;
  try{
    const result=await axios.get("http://localhost:3000/profile/view",{withCredentials:true});
    dispatch(addUser(result.data));


  }catch (error) {
  console.log("token missing:", error.response?.status); 

  if (error.response?.status === 401) {
    navigate("/login");
  }

  console.log("axios error:", error.message);
}


}

useEffect(()=>{

    fetchUser();

  
  
},[])
  return (
   <>
   <Navbar/>
   <Outlet/>

   </>
  )
}

export default Body;