import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const AdminRoute = ({children}) =>{
//   const { user, admin } = useSelector((state)=>state.auth)
const user = localStorage.getItem('role') ==="user"
const admin = localStorage.getItem('role') === "admin"
  if(!user && !admin){
    return <Navigate to={'/login'} />
  }

  if(user){
    return <Navigate to={'/home'} />
  }

  if(admin){
    return children
  }

  return <Navigate to={'/login'} />
}

export default AdminRoute