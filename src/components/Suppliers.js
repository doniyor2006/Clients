import React from 'react'
import { useState,useEffect } from 'react'
import http from '../axios';
import Sidebar from '../Pages/Sidebar';
import SupModal from './SupModal';
import SubEditedModal from './SubEditModal';
function ProductPage() {
    const [ModalVisible ,setModal] = useState(false)
    const [Supplier ,setSupplier] = useState([])
    const [editModal ,setEditModal] = useState(false)
    const [client , setClient] = useState({})
    const [id , setId] = useState()
  useEffect(()=>{
      http.get('/suppliers/',{
      }).then((res)=>
      setSupplier(res.data))
    },[])
    const OpenModal =()=>{
        setModal(!ModalVisible)
    }
    const DeleteUser =(id)=>{            
        console.log(id)
        http.delete(`/suppliers/${id}`,{
        }).then((res)=>{
             window.location.reload()
        }
        )
     }
     const EditModal =(item,id)=>{
     setEditModal(!editModal)
     setClient(item)
     setId(id)
    }
  return (
    <div className='row'>
      <div className="col-md-2">
    <Sidebar />
      </div>
      <div className="col-md-10">
        <button className='btn btn-success my-3' onClick={OpenModal} >Add product</button>
              <table className='table table-bordered table-striped table-hover text-center my-4' >
        <thead>
          <th>N/0</th>
          <th>Username</th>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Email</th>
          <th>Age</th>
          <th>Image</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {
            Supplier?.map((item,index)=>{
              return <tr key={index}>
                <td>{index+1}</td>
                <td>{item.username}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.phone_number}</td>
                <td>{item.address}</td>
                <td>{item.email}</td>
                <td>{item.age}</td>
                <td><img src={item.image} width='100px' height={40} alt="Image" /></td>
                <td><button className='btn btn-secondary' onClick={()=>EditModal(item,item.id)}>Edit </button><button className='btn btn-danger mx-2' onClick={()=>DeleteUser(item.id)}>delete</button></td>
              </tr>
            })
          }
        </tbody>
      </table>
      <SupModal ModalVisible={ModalVisible} OpenModal={OpenModal}/>
      <SubEditedModal editModal={editModal} setEditModal={setEditModal} client={client} id={id} EditModal={EditModal}/>
      </div>
         </div>
       
  )
}

export default ProductPage
