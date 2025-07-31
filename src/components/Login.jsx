import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const[emailId,setEmailId]= useState("");
    const[password,setPassword]= useState("");
    const[errormessage,setErrormessage]=useState("");
    const dispatch=useDispatch();
    const navigate= useNavigate();

  const handleLogin = async () => {
   
    try {
        const result = await axios.post("http://localhost:3000/login", {
            emailId,
            password,
        },{withCredentials:true});
     
        dispatch(addUser(result.data));
        navigate('/');
        
    } catch (error) {
      setErrormessage(error.response.data);
     // console.log("Error:", error.response.data);
    
}
  }

  return (
    <div className='flex  justify-center my-10'>
<div className="card card-border bg-base-300 w-96">
  <div className="card-body">
    <h2 className="card-title  justify-center">Login</h2>
<fieldset className="fieldset">
       <legend className="fieldset-legend">Email ID</legend>
        <input type="text"
          value={emailId}
          onChange={(e)=>setEmailId(e.target.value)}
           className="input" placeholder="Type here" />
 </fieldset>
<fieldset className="fieldset">
     <legend className="fieldset-legend">Password</legend>
      <input type="text"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
       className="input" placeholder="Type here" />
</fieldset>
<p className='text-red-500'>{errormessage}</p>
    <div className="card-actions justify-center">

      <button onClick={handleLogin} className="btn btn-primary" >Log In</button>
      
    </div>
    <div><Link to="/Signup" className="link link-hover font-semibold">New here? Create an account</Link></div>
     
  </div>
</div>
</div>
  )
}

export default Login;
