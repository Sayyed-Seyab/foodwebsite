import { Box, Button, Chip, Container, Typography } from '@mui/material'
import React from 'react'
import largepizza from '../../assets/largpizza.png'
import './header.css'

export default function Header() {
   const [menu, setmenu] = React.useState('Home');

   const handleCloseNavMenu = (page) => {
      setmenu(page)
      // setAnchorElNav(null);
    };
  return (
   <Container>
     <Box  sx={{display:'flex',gap:'20px',fontFamily:'outfit', display:{xs:'colunm', md:'flex', xl:'flex'} }} mt={5}>
        <Box mt={5} sx={{animation:'fadeIn 3s'}}>
            <Typography sx={{display:'inline',fontFamily:'outfit'}} variant='h2'>Enjoy</Typography>
            <Typography ml={5} sx={{ color:'red', fontFamily:'outfit',  fontWeight:'bold', fontSize:'70px'}} variant='h2'>Delicious</Typography>
            <Typography  sx={{ color:'red',fontFamily:'outfit',  fontWeight:'bold', fontSize:'70px'}} variant='h2'>food </Typography>
         <Typography sx={{fontFamily:'outfit', color:'gray' }}> There are variations of food available consist of many categories ,
             your choice food</Typography>
             <a href="#Menu"
              
                onClick={() => handleCloseNavMenu('Menu')}
              >
             <Chip  className='btn'  variant='outlined' label="Order Now " />
             </a>
        </Box>

        <Box>
             
           <img src={largepizza} style={{width:'70%', float:'right',marginTop:'20px'}} alt="" />
        </Box>

    </Box>
   </Container>
  )
}
