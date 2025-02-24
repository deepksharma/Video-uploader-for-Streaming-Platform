import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import CustomNavbar from './CustomNavbar'
import { Typography } from '@mui/material'

function Home() {
  const {token} = useAuth()

  if(!token){
    return ( 
   <Navigate to="/login" />
    );
  }
  return (
      <>
           <CustomNavbar />
        
           <Outlet />
      </>
  )
}

export default Home
