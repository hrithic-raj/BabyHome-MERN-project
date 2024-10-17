import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


function UserRoute({children}) {
//   const { user } = useSelector((state)=>state.auth)
    const user =localStorage.getItem('userId')
    
    if(!user){
        return <Navigate to={'/login'} />
    }

  return children
}

export default UserRoute