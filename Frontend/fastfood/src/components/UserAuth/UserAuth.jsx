import React, { useState, useEffect, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { StoreContext } from '../Context/Storecontext';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';


const UserAuth = () => {
    const [loading, setLoading] = useState(true);
    const { user, role } = useContext(StoreContext);

    useEffect(() => {
        // Simulating an async check, you can replace it with actual async operations if needed
        setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust the delay as per your needs
    }, [role,user]);

    if (loading) {
        // Render a loading component or spinner
        return  <Box 
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
        <CircularProgress />
    </Box>
    }

    // Once loading is complete, check the user's role and navigate accordingly
   if( role == 'user' || role =='admin'){
    return  <Outlet />  ;
   }else{
   return  <Navigate to="/" />
   }
   
   
};

export default UserAuth;

