import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Notification } from '../Plugins/Notify';
import http from '../axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
function Login() {
    const navigate = useNavigate();
    const [UserName,setName] = useState('')
    const [Password,setPasword] = useState('')
    const LoginUSer=()=>{
     http.post('/login/',{
        username:UserName,
        password:Password,
     }).then(res=>{
        console.log(res.status)
        if(res.status === 200){
            Notification({text:'You logged in successfully',type:'success'})
            setTimeout(()=>{
                navigate("/clientsPage");
            },3500)
            console.log(res)
        }
        if (res.data.access_token){
            localStorage.setItem('token' , res.data.access_token)
        }

     }).catch((err)=>{
       if(err.response.status === 403){
        Notification({text:'you have a mistake ! pay atention',type:'error'})
       }
     })
    }
  return (
    <div className="row d-flex flex-column">
               <ToastContainer/>
        <p className='text-center mt-5'>You should complete your personal informations</p>
        <div className="col-md-6 offset-3 mt-1" >
            <div className="card">
                <div className="card-header">
                    <h1 className='text-center'>Login</h1>
                </div>
                <div className="card-body d-flex  flex-column">
                    <input className='my-2 form-control' type="text" onChange={(e)=>setName(e.target.value)} placeholder='Username...'  />
                    <input className='my-2 form-control' type="password" onChange={(e)=>setPasword(e.target.value)} placeholder='Password...' />
                </div>
                <div className="card-footer text-center">
                    <button className='btn btn-primary' onClick={LoginUSer} >Login</button>
                </div>
            </div>
        </div>
        <Link className='mx-auto mt-4' style={{textDecoration:'none'}} to={'/'}>I want to register</Link>
    </div>
  )
}

export default Login
