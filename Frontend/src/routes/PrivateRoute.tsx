import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const currentUser  = localStorage.getItem('soulUser')

  return currentUser ? <Outlet/> : <Navigate to='/login/:redirect?'/>
}

export default PrivateRoute