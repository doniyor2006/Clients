import React from 'react'
import { useState } from 'react'
import {Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
import http from '../axios';
import { Notification } from '../Plugins/Notify';
function EditedModal({editModal,EditModal,id,setEditModal,client}) {
        const [Name ,setName] = useState('')
        const [image ,setImage] = useState()
        const [Phone,setPhone] = useState('')
        const [address,setaddress] = useState('')
   const saveOptions =()=>{
          const form = new FormData() 
           form.append('image',image)
           form.append('name',Name)
           form.append('phone_number',Phone)
           form.append ('address', address)
           console.log(form)
           http.put(`/clients/${id}/` , form).then(res =>{
            console.log(res)
            if (res.status === 200) {
                EditModal()
                window.location.reload()
           }}).catch((err)=>{
              if(err.response.status === 403){
               Notification({text:'you have a mistake ! pay atention',type:'error'})
              }
           })
   }  
  return (
    <div>
          <Modal isOpen={editModal} toggle={EditModal} >
        <ModalHeader>
            <h1>Edit your Informations</h1>
        </ModalHeader>
        <ModalBody>
            <form id='form' >
             
                  <div>
                    <input defaultValue={client.name}  type="text" className='form-control my-2'  onChange={(e)=>setName(e.target.value)}  placeholder='Username...' />
                    <input  className='my-2 form-control' type="file" placeholder='image' onChange={(e)=>setImage(e.target.files[0])}/>
                    <input  Value={client.address}  type="text" className='form-control my-2' onChange={(e)=>setaddress(e.target.value)}  placeholder='Adress...' />
                    <input  Value={client.phone_number}  type="tel" className='form-control my-2'  onChange={(e)=>setPhone(e.target.value)} placeholder='Phone number...' />
                  </div>
                    

            </form>
        </ModalBody>
        <ModalFooter>
            <button  className='btn btn-primary mx-2' onClick={saveOptions}>Save</button>
            <button className='btn btn-danger mx-2' onClick={()=>setEditModal(!editModal)} >Close</button>
        </ModalFooter>
    </Modal>
    </div>
  )
}

export default EditedModal
