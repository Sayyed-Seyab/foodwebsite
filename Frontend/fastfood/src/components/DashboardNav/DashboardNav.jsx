import React, { useContext, useEffect, useState } from 'react'
import AdbIcon from '@mui/icons-material/Adb';
import { AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Paper, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from "react-router-dom";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { StoreContext } from '../Context/Storecontext';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import jwtEncode from 'jwt-encode';
import './style.css';


const pages = ['Home', 'Cart', 'Order', 'category'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function DashboardNav() {
  const {
    UserId,
    setUser,
    setRole,
    UserImage,
    setImage,
    food,
    setfood,
    getfood,
    UserOrders,
    GetOrders,
    setOrders,
    getToken,
    url } = useContext(StoreContext)
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const location = useLocation();
  const Dashboardfood = location.pathname.startsWith('/Dashboard/food');
  const Dashboardorders = location.pathname.startsWith('/Dashboard/orders');
  const DashboardAddfood = location.pathname.startsWith('/Dashboard/addfood');
  const DashboardAstats = location.pathname.startsWith('/Dashboard/stats');


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const AdminLogout = () => {
    localStorage.removeItem('token');
    handleCloseUserMenu();
    const token = localStorage.getItem('token')
    if (!token) {
      setUser(null)
      setRole(null)
    }
  }

  const filteredFood = (e) => {
    const value = e.target.value

    if (Dashboardfood) {
      if (value) {
        const search = food.filter(item =>
          item.Name.toLowerCase().includes(value.toLowerCase()))
        setfood(search)
      } else {
        getfood();
      }
    }

    if (Dashboardorders) {
      if (value) {
        const search = UserOrders.filter(item =>
          item.Status.toLowerCase().includes(value.toLowerCase())
        )
        setOrders(search)
      } else {
        GetOrders();
      }

    }

  }

  const handleImageChange = (e) => {
    const Image = e.target.files[0]

    //   SetUpdateImage({
    //     Image: e.target.files[0]
    // });
    if (Image) {
      updateImage(Image)
    }
  };
  const updateImage = async (Image) => {
    console.log(Image)
    const formData = new FormData();
    formData.append('Image', Image);
    formData.append('_id', UserId); // Ensure '_id' is included
    formData.forEach((value, key) => {
      console.log(key + ': ' + value);
    });


    try {
      const response = await axios.post(`${url}/api/user/update`, formData);

      if (response.data.success) {
        console.log(response.data.message);
        // Retrieve and decode the token
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);

          // Update the token in localStorage with the new image URL
          const updatedUser = {
            ...decodedToken,
            Image: response.data.message, // Assuming 'message' contains the new image filename or URL
          };

          // Save the updated token back to localStorage
          const updatedToken = jwtEncode(updatedUser, 'randam#secret'); // Re-encode the token with the new data
          localStorage.setItem('token', updatedToken);

          // Update state to reflect the new image
          setImage(response.data.message);
        }
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };




  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    getToken();
  })
  return (
    <AppBar className='nav' position="static" sx={{ background: 'none', color: 'gray', boxShadow: 'none' }}>
      <Container component={Paper} maxWidth="xl" >
        <Toolbar >
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex', color: 'red' }, mt: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'red',
                textDecoration: 'none',
              }}
            >
              FoOD
            </Typography>
          </Box>





          <Box sx={{ flexGrow: 0 }}>

            <Box sx={{ display: 'flex', gap: '20px' }}>
              <Box>
                <SearchOutlinedIcon sx={{
                  fontSize: '30px',
                  marginTop: '5px',
                  '&:hover': {
                    color: 'red',
                  },
                }} />

              </Box>
              <Box>
                {DashboardAddfood || DashboardAstats ? null : (
                  Dashboardorders ? (
                    <TextField
                      variant="outlined"
                      size="small"
                      placeholder="Search order status"
                      onChange={filteredFood}  // Function to filter orders
                      sx={{ width: '100%' }}
                    />
                  ) : (
                    <TextField
                      variant="outlined"
                      size="small"
                      placeholder="Search food items"
                      onChange={filteredFood}  // Function to filter food items
                      sx={{ width: '100%' }}
                    />
                  )
                )}
              </Box>


              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Box sx={{ position: 'absolute', top: '25px', right: '0px', zIndex: 2 }}>
                  <label htmlFor='image'>
                    <AddOutlinedIcon sx={{ background: 'white', cursor: 'pointer', fontSize: '15px', borderRadius: 10 }} />
                  </label>
                  <TextField
                    id='image'
                    type='file'
                    onChange={handleImageChange}
                    sx={{ display: 'none' }}
                  />
                </Box>
                <Tooltip title="Open settings" >
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, }}>
                    {/* src={`${url}/images/`+UserImage} */}
                    {UserImage ? <Avatar alt="Remy Sharp" src={`${url}/images/` + UserImage} /> : <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />}
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={AdminLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
