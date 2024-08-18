import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import { StoreContext } from '../Context/Storecontext';

export default function Verify() {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true); // New loading state
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {url} = useContext(StoreContext)
    const navigate = useNavigate(); // useNavigate hook for navigation

    const verifyPayment = async () => {
        try {
            const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
            if (response.data.success) {
                // console.log(response.data);
                // Redirect after payment verification
                navigate('/myorders');
                localStorage.removeItem('cart');
            } else {
                console.log('Payment verification failed');
                // Redirect even if verification fails
                navigate('/');
            }
        } catch (error) {
            console.error('Error verifying payment:', error);
            // Handle error and redirect
            navigate('/');
        } finally {
            setLoading(false); // Set loading to false when done
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    if (loading) {
        return (
            <Box 
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return null; // or any other fallback UI
}
