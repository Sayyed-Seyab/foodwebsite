
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import { Link, useLocation } from "react-router-dom";
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import './nav.css'
import { Chip, colors, rgbToHex, TextField } from '@mui/material';
import Login from '../UserAccount/Login';
import Signup from '../UserAccount/Signup';
import { StoreContext } from '../Context/Storecontext';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import axios from 'axios';
import jwtEncode from 'jwt-encode';
import jwtDecode from 'jwt-decode';



const pages = ['Home', 'Cart', 'Order', 'category'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [menu, setmenu] = React.useState('Home');
  const [open, setOpen] = React.useState(false);
  const {
    cartItems,
    opensingUpModal,
    setopensinUpModal,
    user,
    role,
    openModal,
    setopnModal,
    getToken,
    setUser,
    setRole,
    UserId,
    UserImage,
    setImage,
    url,
    food,
    setfood,
    getfood,
    setOrders,
    UserOrders,
    GetOrders,
    setcartItems,
    getCart,
  } = React.useContext(StoreContext);
  const location = useLocation();
  const Home = location.pathname.startsWith('/');
  const Cart = location.pathname.startsWith('/Cart');
  const Myorders = location.pathname.startsWith('/myorders');
  const filteredFood = (e) => {
    const value = e.target.value

    if (Home) {

      if (value) {

        // console.log(food)
        const search = food.filter(item =>
          item.Name.toLowerCase().includes(value.toLowerCase()))
        setfood(search)
        console.log(food)
      } else {
        getfood();
      }
    }

    // if (Myorders) {
    //   if (value) {
    //     const search = UserOrders.filter(item =>
    //       item.Status.toLowerCase().includes(value.toLowerCase())
    //     )
    //     setOrders(search)

    //   } else {
    //     GetOrders();
    //   }






    // }

    // if (Cart) {
    //   if (value) {
    //     const search = cartItems.filter(item =>
    //       item.Name.toLowerCase().includes(value.toLowerCase())
    //     )
    //     setcartItems(search)
    //    console.log(search)

    //   } else {
      
    //     getCart()
    //   }

    // }
  }

    const handleOpen = () => setopnModal(true);
    const handleClose = () => setopnModal(false);


    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (page) => {
      setmenu(page)
      setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    const UserLogout = () => {
      localStorage.removeItem('token');
      handleCloseUserMenu();
      const token = localStorage.getItem('token')
      if (!token) {
        setUser(null)
        setRole(null)
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
          console.log(response.data);
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
    React.useEffect(() => {
      getToken();
    }, [])

    return (
      <div >
        <AppBar className='nav' position='fixed' >
          <Container maxWidth="xl" >
            <Toolbar >
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex', color: 'red' }, mr: 1 }} />
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

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                
                 
                   <MenuItem onClick={handleCloseNavMenu}>
                   <Link to={'/'}>  <Typography textAlign="center">Home</Typography> </Link>
                    </MenuItem>
                  
                   
                   <MenuItem onClick={handleCloseNavMenu}>
                   <Link to={'/Cart'}>   <Typography textAlign="center">Cart</Typography>  </Link>
                    </MenuItem>
                 
                  
                   <MenuItem onClick={handleCloseNavMenu}>
                   <Link to={'/myorders'}>  <Typography textAlign="center">order</Typography> </Link>
                    </MenuItem>
                  
                 
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                FoOD
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>

                <Link
                  style={{
                    textDecoration: 'none',
                    padding: '10px',
                    cursor: 'pointer',
                    color: 'gray'
                  }}
                  className={menu === 'Home' ? 'active' : ''}

                  to='/'
                  onClick={() => handleCloseNavMenu('Home')}

                >
                  Home
                </Link>
                <a href="#category"
                  className={menu === 'Category' ? 'active' : ''}
                  onClick={() => handleCloseNavMenu('Category')}
                >Categories</a>

                <a href="#Menu"
                  className={menu === 'Menu' ? 'active' : ''}
                  onClick={() => handleCloseNavMenu('Menu')}
                >Menu</a>

                <a href="#footer"
                  className={menu === 'footer' ? 'active' : ''}
                  onClick={() => handleCloseNavMenu('footer')}
                >Contact</a>



              </Box>

              <Box sx={{ flexGrow: 0 }}>

                <Box sx={{ display: 'flex', gap: '20px' }}>
                  {Cart || Myorders ? 
                    null
                  :
                  <Box sx={{display:'flex',gap:2}}>
                    <SearchOutlinedIcon sx={{
                      fontSize: '30px',
                      marginTop: '5px',
                      '&:hover': {
                        color: 'red',
                      },
                    }} />
                
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search order status"
                    onChange={filteredFood}  // Function to filter orders
                    sx={{ width: '100%' }}
                  />
                    </Box>
                  }
                  {role === "user" ?
                    <>
                      <Box className="Notification">
                        <Link to='/Cart'>
                          {cartItems.length > 0 ? <> <Box className="Dot"></Box> </> : null}
                          <ShoppingBasketOutlinedIcon
                            sx={{
                              fontSize: '25px',
                              // marginTop: '5px',
                              '&:hover': {
                                color: 'red',
                              },
                            }} />
                        </Link>
                      </Box>
                    </> : null}
                  {!user ?
                    <>
                      <Box>
                        <Chip className='signin' onClick={handleOpen} variant='outlined' label="Sign in"
                        />
                      </Box>
                    </> : null}
                  {role === "user" ?
                    <>
                      <Box sx={{ position: 'relative', display: 'inline-block' }}>
                        <Box sx={{ position: 'absolute', top: '25px', right: '0px', zIndex: 2 }}>
                          <label htmlFor='image'>
                            <AddOutlinedIcon sx={{ background: 'white', cursor: 'pointer', fontSize: '15px', borderRadius: 10 }} />
                          </label>
                          <TextField
                            id='image'
                            type='file'
                            name='Image'
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
                    </>
                    : null}

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

                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link to={'/myorders'}> <Typography textAlign="center">Orders</Typography></Link>
                  </MenuItem>
                  <MenuItem onClick={UserLogout}>
                    <Link>   <Typography textAlign="center">Logout</Typography></Link>
                  </MenuItem>

                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Login openModal={openModal} setopenModal={setopnModal} open={open} setOpen={setOpen} opensingUpModal={opensingUpModal} setopensinUpModal={setopensinUpModal} />

      </div>
    );
  }
  export default Navbar;

