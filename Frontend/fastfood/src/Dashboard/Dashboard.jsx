import { Box, Grid, Switch } from '@mui/material'
import React, { useContext } from 'react'
import Sidebar from '../components/DashboardSidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import DashboardStats from '../components/DashboardStats/DashboardStats'
import Orders from '../components/Dashboardorders/Orders'
import Food from '../components/DashboardFood/Food'
import DashboardNav from '../components/DashboardNav/DashboardNav'
import Addfood from '../components/DashAddfood/Addfood'
import AdminAuth from '../components/AdminAuth/AdminAuth'
import { StoreContext } from '../components/Context/Storecontext'
import './style.css'


export default function Dashboard() {
  const { user, role } = useContext(StoreContext);
  return (
    <div className='Dash'>
        <Box>
        </Box>
        <Box >
           <Grid container gap={7}>
           <Grid xs={12} sm={3} md={3} lg={3} xl={4}>
               {role == 'admin'?  <Sidebar/> : null}
            </Grid>

            <Grid xs={12} sm={9} md={8} lg={8} xl={8}>
          {role == 'admin'?   <DashboardNav/> : null}
           <Box mt={3}>
           <Routes>
              <Route element={<AdminAuth/>}>
                <Route>
              <Route path="/Dashboard/addfood" element={<Addfood/>} />
              <Route path="/Dashboard/orders" element={<Orders/>} />
              <Route path="/Dashboard/food" element={<Food/>} />
        {/* <Route path="/Dashboard/users" element={DashboardUsers} /> */}
        <Route path="/Dashboard/stats" element={<DashboardStats/>} />
        </Route>
              </Route>
             </Routes>
           </Box>
            </Grid>
           </Grid>
        </Box>
    </div>
  )
}
