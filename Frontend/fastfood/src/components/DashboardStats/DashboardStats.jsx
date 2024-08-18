import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../Context/Storecontext';
import {CircularProgress } from '@mui/material';
import './style.css'
export default function DashboardStats() {
  const { user, UserOrders, GetOrders, food,getfood,loading,Orderloading } = useContext(StoreContext);

  const [totalFood, setTotalFood] = useState(0);
  const [cancelledOrders, setCancelledOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [outForDeliveryOrders, setOutForDeliveryOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);

  useEffect(() => {
    if (user) {
      GetOrders();
      getfood();
    }
  }, [user]);

  useEffect(() => {
    if (UserOrders.length) {
      // const totalFoodCount = UserOrders.reduce((acc, order) => acc + order.Items.length, 0);
      const cancelledCount = UserOrders.filter(order => order.Status === 'Cancelled').length;
      const pendingCount = UserOrders.filter(order => order.Status === 'Food Processing').length;
      const outForDeliveryCount = UserOrders.filter(order => order.Status === 'Out For Delivery').length;
      const deliveredCount = UserOrders.filter(order => order.Status === 'Delivered').length;

      // setTotalFood(totalFoodCount);
      setCancelledOrders(cancelledCount);
      setPendingOrders(pendingCount);
      setOutForDeliveryOrders(outForDeliveryCount);
      setDeliveredOrders(deliveredCount);
    }
  }, [UserOrders]);

  if (loading,Orderloading) {
    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
            <CircularProgress />
        </Container>
    );
}

  return (
    <div>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        <Card className='Card' sx={{ minWidth: 275, height: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <CardContent>
            <Box>
              <Typography  className='Cardtxt' sx={{ fontSize: 20, textAlign: 'center',fontFamily:'Outfit' }} color="text.secondary">
                Total orders: {UserOrders.length}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card className='Card' sx={{ minWidth: 275, height: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <CardContent>
            <Box>
              <Typography className='Cardtxt' sx={{ fontSize: 20, textAlign: 'center',fontFamily:'Outfit' }} color="text.secondary">
                Total Food:{food.length}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card className='Card' sx={{ minWidth: 275, height: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <CardContent>
            <Box>
              <Typography className='Cardtxt' sx={{ fontSize: 20, textAlign: 'center',fontFamily:'Outfit' }} color="text.secondary">
                Cancelled orders: {cancelledOrders}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card className='Card' sx={{ minWidth: 275, height: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <CardContent>
            <Box>
              <Typography className='Cardtxt' sx={{ fontSize: 20, textAlign: 'center',fontFamily:'Outfit' }} color="text.secondary">
                Pending orders: {pendingOrders}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card className='Card' sx={{ minWidth: 275, height: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <CardContent>
            <Box>
              <Typography className='Cardtxt' sx={{ fontSize: 20, textAlign: 'center',fontFamily:'Outfit' }} color="text.secondary">
                Out for Delivery orders: {outForDeliveryOrders}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card className='Card' sx={{ minWidth: 275, height: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <CardContent>
            <Box>
              <Typography className='Cardtxt' sx={{ fontSize: 20, textAlign: 'center',fontFamily:'Outfit' }} color="text.secondary">
                Delivered orders: {deliveredOrders}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
