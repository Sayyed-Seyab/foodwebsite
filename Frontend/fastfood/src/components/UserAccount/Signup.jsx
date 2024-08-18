import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Chip, Container, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { StoreContext } from '../Context/Storecontext';
import { useEffect, } from "react";
import { useContext } from 'react';

const style = {
  position: 'absolute',
  top: '37%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid white',
  borderRadius:'10px',
  boxShadow: 24,
  p: 4,
};

export default function Signup({opensingUpModal, setopensinUpModal}) {
  // const {signupdata,setsignupdata} = useContext(StoreContext)
  const [signupdata, setsignupdata] = useState({
    Name:'',
    Email:'',
    Password:''
  })
  const handleOpen = () => setopensinUpModal(true);
  const handleClose = () => setopensinUpModal(false);
  const initialState = {
    Name: "",
   Email: "",
   Password: "",
};
  
    const handlerChange = (event) => {
      const { name, value } = event.target;
      setsignupdata((prevData) => ({
        ...prevData,
        [name]: value
      }));
  };
  
  useEffect(() => {
    console.log(signupdata);
    console.log('Component mounted');
  }, [signupdata]);
  console.log('hello')

  return (
    <div>
     
     
        <Box
        open={opensingUpModal}
        onClose={handleClose}
         sx={style}>
        <Container component="main" maxWidth="xs">
      {/* <Box
       
        sx={{
         
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" Validate sx={{ mt: 1 }}>
        <TextField
          sx={{
            '& label': {
            color: 'gray', // Default label color
          },
          '& label.Mui-focused': {
            color: 'red', // Label color when focused
          },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'red', // Default border color
              },
              '&:hover fieldset': {
                borderColor: 'green', // Border color when hovered
              },
              '&.Mui-focused fieldset': {
                borderColor: 'red', // Border color when focused
              },
            },
          }}
            size='small'
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="Name"
            value={signupdata.Name}
            autoComplete="username"
            autoFocus
           onChange={ handlerChange}
          />


          <TextField
          sx={{
            '& label': {
            color: 'gray', // Default label color
          },
          '& label.Mui-focused': {
            color: 'red', // Label color when focused
          },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'red', // Default border color
              },
              '&:hover fieldset': {
                borderColor: 'green', // Border color when hovered
              },
              '&.Mui-focused fieldset': {
                borderColor: 'red', // Border color when focused
              },
            },
          }}
            size='small'
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="Email"
            autoComplete="email"
            autoFocus
            value={signupdata.Email}
           onChange={ handlerChange}
          />
          <TextField
           sx={{
            '& label': {
            color: 'gray', // Default label color
          },
          '& label.Mui-focused': {
            color: 'red', // Label color when focused
          },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'red', // Default border color
              },
              '&:hover fieldset': {
                borderColor: 'green', // Border color when hovered
              },
              '&.Mui-focused fieldset': {
                borderColor: 'red', // Border color when focused
              },
            },
          }}
          className='input'
            size='small'
            margin="normal"
            required
            fullWidth
            name="Password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={signupdata.Password}
            onChange={ handlerChange}
          />
         <Box sx={{textAlign:'center'}}>
         <Chip
         className='signup'
            type="submit"
            label=' Sign In'
            variant="outline"
            sx={{ mt: 3, mb: 2 }}
          />
           
          
         </Box>
         <Box sx={{display:'flex'}}>
            <Box>
               if you have already account click<Link style={{display:'inline', color:'red'}} href="">here</Link>
            </Box>
            
         </Box>
        </Box>
      </Box> */}
    </Container>
        </Box>
     
    </div>
  );
}
