import React from 'react'
import { useState } from 'react'
import {Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
import http from '../axios';
import { Notification } from '../Plugins/Notify';
function ModalAction({OpenModal,ModalVisible,clients}) {
    const [userName ,setName] = useState('')
    const [Address ,setAdress] = useState('')
    const [Phone ,setPhone] = useState()
    const [Image,setImage] = useState('')
   const  AddUser=()=>{
    OpenModal()
    const form = new FormData()
    form.append("name", userName)
    form.append("address", Address)
    form.append("image", Image)
    form.append("phone_number", Phone)
    http.post('/clients/', form).then(res => {
      if (res.status === 201) {
        setTimeout(() => {
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
                    <input  type="tel" className='form-control my-2'  onChange={(e)=>setPhone(e.target.value)} placeholder='Phone number...' />
                
            </form>
        </ModalBody>
        <ModalFooter>
            <button  className='btn btn-primary mx-2' onClick={AddUser} >Save</button>
            <button className='btn btn-danger mx-2' onClick={OpenModal} >Close</button>
        </ModalFooter>
    </Modal>
  )
}

export default ModalAction
