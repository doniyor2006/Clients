import React from 'react'
import { Link} from 'react-router-dom';
import { useState} from 'react'

function Sidebar() {
  const [pages,setPages] = useState('Clients')
  return (
    <div className='wrapper text-center p-4'>
      <h1 className='text-white'> Pages </h1>
      <Link to={'/clientsPage'} className={`form-control px-5 mt-5 ${pages ==='Clients' ? 'bg-primary text-white' :'' } `} onClick={(e)=>setPages(e.target.textContent)} style={{textDecoration:'none',border:'none',transition:'all 0.1s linear'}}>Clients</Link>
      <Link to={'/suppliers'} className={`form-control px-5 mt-2 ${pages ==='Suppliers' ? 'bg-primary text-white' :'' } `}  onClick={(e)=>setPages(e.target.textContent)} style={{textDecoration:'none',border:'none'}}>Suppliers</Link>
    </div>
  )
}

export default Sidebar
