import React from 'react'
import http from '../axios';
import { useState,useEffect } from 'react'
import Sidebar from '../Pages/Sidebar';
import ModalAction from './ModalAction';
import EditedModal from './EditedModal';
function ClientsPage() {
  const [clients , setClients] = useState([])
  const [ModalVisible ,setModal] = useState(false)
  const [editModal ,setEditModal] = useState(false)
  const [client , setClient] = useState({})
  const [id , setId] = useState()
  useEffect(() => {
    http.get('/clients/', {
        headers: {
            'Authorization': 'Basic YWRtaW46MTIz'
        }
    }).then(res => {
        setClients(res.data)
        console.log(res)
    })
}, [])
const OpenMOdal =()=>{
  setModal(!ModalVisible)
}
const EditModal =(item,id)=>{
  setEditModal(!editModal)
 setClient(item)
 setId(id)
}
const DeleteClient =(id)=>{            
  console.log(id)
  http.delete(`/clients/${id}`,{
  }).then((res)=>{
       window.location.reload()
  }
  )
}
  return (
    <div className='row'>
      <div className="col-md-2">

      <Sidebar/>
      </div>
    <div className='col-md-10'>
      <button className='btn btn-success my-4' onClick={OpenMOdal}>Add Clients</button>
      <table className='table table-bordered table-striped table-hover text-center my-4' >
        <thead>
          <th>N/0</th>
          <th>Name</th>
          <th>Phone_number</th>
          <th>Address</th>
          <th>Image</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {
            clients?.map((item,index)=>{
              return <tr key={index}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.phone_number}</td>
                <td>{item.address}</td>
                <td><img src={item.image} width='100px' height={40} alt="Image" /></td>
                <td><button className='btn btn-secondary ' onClick={()=>EditModal(item,item.id)} >Edit </button><button className='btn btn-danger mx-2' onClick={()=>DeleteClient(item.id)}>delete</button></td>
              </tr>
            })
          }
        </tbody>
      </table>
      <ModalAction ModalVisible={ModalVisible} OpenModal={OpenMOdal}/>
     <EditedModal editModal={editModal} setEditModal={setEditModal} client={client} id={id} EditModal={EditModal}/>
    </div>

    </div>
  )
}

export default ClientsPage
