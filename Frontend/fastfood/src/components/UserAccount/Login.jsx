import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Chip, Container, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import './login.css'
import { red } from '@mui/material/colors';
import Signup from './Signup';
import { useContext } from 'react';
import { StoreContext } from '../Context/Storecontext';

const style = {
  position: 'absolute',
  top: '37%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid white',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function Login({ open, setOpen,  }) {
  const {
    signupdata,
    setsignupdata,
    Signup,
    error,
    opensingUpModal,
    setopensinUpModal,
    signindata,
    setsignindata,
    SignIn,
    SignUpObj,
    SignInObj,
    openModal,
    setopnModal, } = useContext(StoreContext);


  const handlerChange = (event) => {
    const { name, value } = event.target;
    setsignupdata((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleOpenLogin = (event) => {
    const { name, value } = event.target;
    setsignindata((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  React.useEffect(() => {
    console.log(signupdata);
    console.log(signindata)
    console.log('Component mounted');
  }, [signupdata]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setopnModal(false)
  };
  const openSinup = () => {
    setopensinUpModal(true);
    setOpen(false)
    setsignupdata(SignUpObj)
  }

  const openLogin = () => {
    setopensinUpModal(false);
    setOpen(true)
    setsignindata(SignInObj)
  }

  return (
    <div>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {opensingUpModal === true ?
          <>
            <Box
              open={opensingUpModal}
              onClose={handleClose}
              sx={style}>
              <Container component="main" maxWidth="xs">
                <Box
                  sx={{

                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Sign in
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
                      onChange={handlerChange}
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
                      onChange={handlerChange}
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
                      onChange={handlerChange}
                    />
                    <Box sx={{ textAlign: 'center' }}>
                      <Chip
                        className='signup'
                        type="submit"
                        label=' Sign Up'
                        variant="outline"
                        clickable
                        onClick={Signup}
                        sx={{ mt: 3, mb: 2 }}
                      />
                      <Typography color={'red'}>{error}</Typography>

                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Box>
                        already have account click?<Link onClick={openLogin} style={{ display: 'inline', color: 'red' }} href="">login</Link>
                      </Box>

                    </Box>
                  </Box>
                </Box>
              </Container>
            </Box>
          </> :
          <>
            <Box sx={style}>
              <Container component="main" maxWidth="xs">
                <Box
                  sx={{

                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Sign in
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
                      id="email"
                      label="Email Address"
                      name="Email"
                      autoComplete="email"
                      autoFocus
                      value={signindata.Name}
                      onChange={handleOpenLogin}
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
                      value={signindata.Password}
                      onChange={handleOpenLogin}
                    />
                    <Box sx={{ textAlign: 'center' }}>
                      <Chip
                        className='login'
                        type="submit"
                        label=' Sign In'
                        variant="outline"
                        onClick={SignIn}
                        sx={{ mt: 3, mb: 2 }}
                      />
                      <Typography color={'red'}>{error}</Typography>

                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Box>
                        No account<Link onClick={openSinup} style={{ display: 'inline', color: 'red' }} href="">Sing up</Link>
                      </Box>

                    </Box>
                  </Box>
                </Box>
              </Container>
            </Box>
          </>}

      </Modal>
    </div>
  );
}

