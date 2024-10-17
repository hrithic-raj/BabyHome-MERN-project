import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const AdminRoute = ({children}) =>{
//   const { user, admin } = useSelector((state)=>state.auth)
const user = localStorage.getItem('userId')
const admin = localStorage.getItem('adminId')
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