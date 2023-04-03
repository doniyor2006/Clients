import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login';
import ClientsPage from './components/ClientsPage';
import Suppliers from './components/Suppliers';
import Sidebar from './Pages/Sidebar';
import './../src/Main.css'
export default function App() { 

  return (
 <div className='container'>
  <Routes>
    <Route path='/'  element={ <Register/>} />
    <Route path='/login' element={<Login/>}/>
    <Route path='/clientsPage' element={<ClientsPage/>}/>
    <Route path='/suppliers' element={<Suppliers/>}/>
    <Route path='/sidebar' element={<Sidebar/>}/>
  </Routes>

 </div>
  )
}
