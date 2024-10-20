import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore';

const PrivateRoute = () => {
    const authUser = useAuthStore((state) => state.authUser)

  return authUser ? <Outlet/> : <Navigate to='/login/:redirect?'/>
}

export default PrivateRoute