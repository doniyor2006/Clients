import React from 'react'
import { useState } from 'react'
import { Notification } from '../Plugins/Notify';
import http from '../axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
function Register() {
    const navigate = useNavigate();
    const [UserName,setName] = useState('')
    const [Password,setPasword] = useState('')
    const [Confirmation,setConfirmation] = useState('')
    const [Image,setImage] = useState('')
    const UserRegister=()=>{
        const form = new FormData() 
        form.append('username',UserName)
        form.append('password',Password)
        form.append ('password2', Confirmation)
        form.append('image',Image)
        console.log(form)
        http.post('/register/' , form).then(res=>{
        console.log(res.status)
        if(res.status === 201){
            Notification({text:'You registered successfully',type:'success'})
            setTimeout(()=>{
                navigate("/login");
            },3000)
        }

     }).catch((err)=>{
       if(err.response.status !== 201){
        Notification({text:'you have a mistake ! pay atention',type:'error'})
       }
     })
    }
  return (
    
    <div className="row">
        <ToastContainer/>
        <div className="col-md-6 offset-3 mt-5" >
            <div className="card">
                <div className="card-header">
                    <h1 className='text-center'>Register</h1>
                </div>
                <div className="card-body d-flex  flex-column">
                    <input className='my-2 form-control' type="text" placeholder='Username' onChange={(e)=>setName(e.target.value)} />
                    <input className='my-2 form-control' type="file" placeholder='Image' onChange={(e)=>setImage(e.target.files[0])} />
                    <input className='my-2 form-control' type="password" placeholder='Password..' onChange={(e)=>setPasword(e.target.value)} />
                    <input className='my-2 form-control ' type="password" placeholder='Pasword..'onChange={(e)=>setConfirmation(e.target.value)}  />
                </div>
                <div className="card-footer text-center">
                    <useNavigate to={'/Login'} className='btn btn-success px-4 py-2' onClick={UserRegister} >Register</useNavigate>
                </div>
            </div>
        </div>
        <Link className='mx-auto mt-4' style={{textDecoration:'none'}} to={'/login'}>I have already registered and I have got Account</Link>
    </div>

  )
}

export default Register
