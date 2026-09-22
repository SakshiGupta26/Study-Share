import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const { user,loading} = useAuth();

  if(loading){
    return <div>Loading...</div>
  }

  if(!user){
    return <Navigation to="/login" replace />
  }

  if(user.role !== "admin"){
    return <Navigate to="/" replace />
  }
  return <Outlet />
}

export default AdminRoute
