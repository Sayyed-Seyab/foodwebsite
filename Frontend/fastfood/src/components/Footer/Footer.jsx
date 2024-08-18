import React from 'react';
import { Box, Typography, Grid, Link } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import './footer.css'

const Footer = () => {
  return (
    <Box id='footer'
      sx={{
        backgroundColor: '#323232', 
        color: 'white', 
        padding: '20px 0',
        marginTop: 'auto',
        textAlign: 'center'
      }}
    >
      <Grid container spacing={2} justifyContent="center" className='footer'>
        <Grid item xs={12} md={3} sm={4}>
        <AdbIcon sx={{ color:'red'  }} />
          <Typography
            variant="h6"
           
            sx={{
             
              
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'red',
              textDecoration: 'none',
            }}
          >
            FoOD
          </Typography>
          <Typography variant="body2">Food dishes provide one of the best service and quality 
            food with free delivery
          </Typography>
          <Typography variant="body2">© 2023 Company Name</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Quick Links</Typography>
          <Link href="/home" color="inherit" underline="none">
            Home
          </Link><br />
          <Link href="/about" color="inherit" underline="none">
            About
          </Link><br />
          <Link href="/contact" color="inherit" underline="none">
            Contact
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Follow Us</Typography>
          <Link href="https://facebook.com" color="inherit" underline="none">
            Facebook
          </Link><br />
          <Link href="https://twitter.com" color="inherit" underline="none">
            Twitter
          </Link><br />
          <Link href="https://instagram.com" color="inherit" underline="none">
            Instagram
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
