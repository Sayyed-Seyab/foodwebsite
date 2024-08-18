import { useContext, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home/Home'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Topcategory from './components/Category/Topcategory'
import Cartpage from './Pages/Cartpage/Cartpage'
import PlaceOrders from './components/PlaceOrder/PlaceOrders'
import Orders from './components/Dashboardorders/Orders'
import Food from './components/DashboardFood/Food'
import DashboardStats from './components/DashboardStats/DashboardStats'
import Dashboard from './Dashboard/Dashboard'
import DashboardNav from './components/DashboardNav/DashboardNav'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import UserAuth from './components/UserAuth/UserAuth'
import Dash from './Dashboard/Dash'
import AdminAuth from './components/AdminAuth/AdminAuth'
import Myorders from './components/Myorders/Myorders'
import Verify from './components/Verify/Verify'
import Addfood from './components/DashAddfood/Addfood'
import { Box, Grid } from '@mui/material'
import Sidebar from './components/DashboardSidebar/Sidebar'
import { StoreContext } from './components/Context/Storecontext'



function App() {
  const {role}= useContext(StoreContext)
  const [count, setCount] = useState(0)
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/Dashboard');

  return (
    <>
      <div className='bgcolor'>
        <ToastContainer/>
      {!isDashboardRoute ? <Navbar /> : <Dashboard/>}

       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route element={<UserAuth/>}>
        <Route path='/Cart' element={<Cartpage/>}/>
        <Route path='/PlaceOrder' element={<PlaceOrders/>}/>
        <Route path='/myorders' element={<Myorders/>}/>
        <Route path='/verify' element={<Verify/>}/>

        </Route>
      
        <Route path='/Order' element={<PlaceOrder/>}/>
        <Route path='/category' element={<Topcategory/>}/>
        {!isDashboardRoute ?  <Route path='*' element={<div>Page not found</div>}/> : null}
        <Route element={<AdminAuth/>}>
       <Route path="/Dashboard" element={<Dash/>} /> 
     </Route> 
        </Routes>

       

      
        

       
        
     
      </div>
    </>
  )
}

export default App
