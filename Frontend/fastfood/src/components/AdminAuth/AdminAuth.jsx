import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../Context/Storecontext'
import CircularProgress from '@mui/material/CircularProgress';
import { Navigate, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const  AdminAuth = () =>{
    const [loading, setloading] = useState(true);
    const {user, role} = useContext(StoreContext);

    useEffect(() => {
        // Simulating an async check, you can replace it with actual async operations if needed
        setTimeout(() => {
            setloading(false);
        }, 1000); // Adjust the delay as per your needs
    }, [role]);

        if(loading){
            return  <Box 
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
        >
            <CircularProgress />
        </Box>
        }

    
 
    return  role === 'admin'? <Outlet/> : <Navigate to='/'/>
  
  
}

export default AdminAuth
