import React from 'react'
import { useState } from 'react'
import {Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
import http from '../axios';
import { Notification } from '../Plugins/Notify';
function SupModal({OpenModal,ModalVisible}) {
    
    const [userName ,setName] = useState('')
    const [Address ,setAdress] = useState('')
    const [FirstName ,setFirstname] = useState()
    const [LastName ,setLastname] = useState()
    const [email ,setemail] = useState()
    const [age ,setAge] = useState()
    const [Phone ,setPhone] = useState()
    const [Image,setImage] = useState('')
   const  AddUser=()=>{
    OpenModal()
    const form = new FormData()
    form.append("username", userName)
    form.append("first_name", FirstName)
    form.append("last_name",LastName)
    form.append("email", email)
    form.append("age", age)
    form.append("address", Address)
    form.append("image", Image)
    form.append("phone_number", Phone)
    http.post('/suppliers/', form).then(res => {
      if (res.status === 201) {
        setTimeout(() => {
              Notification({text:'You add supplier succesfully',type:'success'})
          window.location.reload()
        }, 10);
     }}).catch((err)=>{
        if(err.response.status === 403){
         Notification({text:'you have a mistake ! pay atention',type:'error'})
        }
      })
    }
  return (
    <Modal isOpen={ModalVisible} toggle={OpenModal} >
        <ModalHeader>
            <h1>Complete your Informations</h1>
        </ModalHeader>
        <ModalBody>
            <form id='form' >
                    <input  type="text" className='form-control my-2'  onChange={(e)=>setName(e.target.value)}  placeholder='Username...' />
                    <input  className='my-2 form-control' type="file" placeholder='image' onChange={(e)=>setImage(e.target.files[0])}/>
                    <input  type="text" className='form-control my-2' onChange={(e)=>setAdress(e.target.value)}  placeholder='Adress...' />
                    <input  type="email" className='form-control my-2'  onChange={(e)=>setemail(e.target.value)} placeholder='email...' />
                    <input  type="number" className='form-control my-2'  onChange={(e)=>setAge(e.target.value)} placeholder='Age...' />
                    <input  type="tel" className='form-control my-2'  onChange={(e)=>setPhone(e.target.value)} placeholder='Phone number...' />
                    <input  type="text" className='form-control my-2'  onChange={(e)=>setFirstname(e.target.value)} placeholder='Firstname...' />
                    <input  type="text" className='form-control my-2'  onChange={(e)=>setLastname(e.target.value)} placeholder='Lastname...' />
            </form>
        </ModalBody>
        <ModalFooter>
            <button  className='btn btn-primary mx-2' onClick={AddUser}>Save</button>
            <button className='btn btn-danger mx-2'>Close</button>
        </ModalFooter>
    </Modal>
  )
}
export default SupModal