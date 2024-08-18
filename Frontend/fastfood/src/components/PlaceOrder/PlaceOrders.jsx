import { Box, Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { StoreContext } from '../Context/Storecontext';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function PlaceOrders() {
  const InitialState = {
    Firstname: '',
    Lastname: '',
    Email: '',
    Street: '',
    City: '',
    State: '',
    Country: '',
    Zipcode: '',
    Phone: '',
  }
  const { cartItems, user, UserId, url } = React.useContext(StoreContext)
  const [total, setTotal] = useState(0)
  const [Subtotal, setSubtotal] = useState(0)
  const [data, setdata] = useState(InitialState)
  const [error, setError] = useState()

  const subtotal = (Subtotal, total) => {
    let newSubtotal = 0;
    cartItems.forEach((item) => {
      newSubtotal += item.Price * item.quantity;
    });
    setSubtotal(newSubtotal);
    setTotal(newSubtotal + 2); // Assuming $2 is a fixed delivery fee
  }

  const handlerChanger = (event) => {
    const { name, value } = event.target;
    setdata({ ...data, [name]: value });
  }

  const validateOrderForm = () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+\d{1,3}\s?\d{4,14}$/;

    if (!data.Firstname) {
      setError("Firstname field is required.");
      return false;
    }
    if (!data.Lastname) {
      setError("Lastname field is required.");
      return false;
    }
    if (!data.Email) {
      setError("Email field is required.");
      return false;
    }
    if (!emailRegex.test(data.Email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!data.Street) {
      setError("Street field is required.");
      return false;
    }
    if (!data.City) {
      setError("City field is required.");
      return false;
    }
    if (!data.State) {
      setError("State field is required.");
      return false;
    }
    if (!data.Zipcode) {
      setError("Zip Code field is required.");
      return false;
    }
    if (!data.Country) {
      setError("Country field is required.");
      return false;
    }
    if (!data.Phone) {
      setError("Phone field is required.");
      return false;
    }
    if (!phoneRegex.test(data.Phone)) {
      setError("Please enter a valid phone number with the country code (e.g., +1 1234567890).");
      return false;
    }
    setError(null);
    return true;
  }





  const Order = async () => {
    if (!validateOrderForm()) {
      return;
    }

    const OrderData = {
      UserId: UserId,
      UserName: user,
      Address: data,
      Items: cartItems,
      Amount: total,
    }
    const response = await axios.post(`${url}/api/order/place`, OrderData)
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url)

    } else {
      alert('Error')
    }

  }



  const CashOnDeliveryOrder = async () => {
    if (!validateOrderForm()) {
      return;
    }

    const OrderData = {
      UserId: UserId,
      UserName: user,
      Address: data,
      Items: cartItems,
      Amount: total,
    }
    const response = await axios.post(`${url}/api/order/cashondelivery`, OrderData)
    if (response.data.success) {
      window.location.replace('/myorders')
      toast.success(response.data)

    } else {
      alert('Error')
    }

  }

  useEffect(() => {
    subtotal(Subtotal)
    console.log(data)
    console.log(cartItems)
    console.log(UserId)
  }, [data])
  return (
    <div>

      <Container>
        <Grid mt={5} sx={{height:'91vh'}} container spacing={2} justifyContent="center">

          <Grid item xs={12} md={6} lg={6} xl={6} sm={6}>
            <Box
              sx={{

                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box component="form" onSubmit={Order} Validate sx={{ mt: 1 }}>
                <Typography sx={{ color: 'red', }} >{error}</Typography>
                <Box sx={{
                  display: 'flex',
                  gap: '10px',
                }}>
                  <TextField
                    sx={{
                      '& label': {
                        color: 'gray', // Default label color
                      },
                      '& label.Mui-focused': {
                        color: 'red', // Label color when focused
                      },
                      '& .MuiOutlinedInput-root': {
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
                    id="Firstname"
                    label="Firstname"
                    name="Firstname"
                    autoComplete="Firstname"
                    autoFocus
                    value={data.Firstname}
                    onChange={handlerChanger}
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
                    id="Lastname"
                    label="Lastname"
                    name="Lastname"
                    autoComplete="Lastname"
                    autoFocus
                    value={data.Lastname}
                    onChange={handlerChanger}
                  />
                </Box>
                <TextField
                  sx={{
                    '& label': {
                      color: 'gray', // Default label color
                    },
                    '& label.Mui-focused': {
                      color: 'red', // Label color when focused
                    },
                    '& .MuiOutlinedInput-root': {
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
                  name="Email"
                  label="Email"
                  type="Email"
                  id="Email"
                  autoComplete="current-Email"
                  value={data.Email}
                  onChange={handlerChanger}
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
                  name="Street"
                  label="Street"
                  type="Street"
                  id="Street"
                  autoComplete="current-Street"
                  value={data.Street}
                  onChange={handlerChanger}
                />
                <Box sx={{
                  display: 'flex',
                  gap: '10px',
                }}>
                  <TextField
                    sx={{
                      '& label': {
                        color: 'gray', // Default label color
                      },
                      '& label.Mui-focused': {
                        color: 'red', // Label color when focused
                      },
                      '& .MuiOutlinedInput-root': {
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
                    id="City"
                    label="City"
                    name="City"
                    autoComplete="City"
                    autoFocus
                    value={data.City}
                    onChange={handlerChanger}
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
                    id="State"
                    label="State"
                    name="State"
                    autoComplete="State"
                    autoFocus
                    value={data.State}
                    onChange={handlerChanger}
                  />
                </Box>

                <Box sx={{
                  display: 'flex',
                  gap: '10px',
                }}>
                  <TextField
                    sx={{
                      '& label': {
                        color: 'gray', // Default label color
                      },
                      '& label.Mui-focused': {
                        color: 'red', // Label color when focused
                      },
                      '& .MuiOutlinedInput-root': {
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
                    id="Zip Code"
                    label="Zip Code"
                    name="Zipcode"
                    autoComplete="Zip Code"
                    autoFocus
                    value={data.Zipcode}
                    onChange={handlerChanger}
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
                    id="Country"
                    label="Country"
                    name="Country"
                    autoComplete="Country"
                    autoFocus
                    value={data.Country}
                    onChange={handlerChanger}
                  />
                </Box>
                <TextField
                  sx={{
                    '& label': {
                      color: 'gray', // Default label color
                    },
                    '& label.Mui-focused': {
                      color: 'red', // Label color when focused
                    },
                    '& .MuiOutlinedInput-root': {
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
                  name="Phone"
                  label="Phone"
                  type="Phone"
                  id="Phone"
                  autoComplete="current-Phone"
                  value={data.Phone}
                  onChange={handlerChanger}
                />
                <Box sx={{ textAlign: 'center' }}>


                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item
            xs={12}
            md={12}
            lg={6}
            xl={6}
            sm={12}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', sm: 'center', md: 'center', lg: 'flex-end', xl: 'flex-end' },
              alignItems: 'center',
            }}>
            <Box mt={3} sx={{ float: 'right', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <TableContainer component={Paper} sx={{ width: 500 }}>
                <Table sx={{ maxWidth: 500 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className='bg'>Cart Total</TableCell>
                      <TableCell className='bg' align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    <TableRow

                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align='left'>
                        <Typography className='border'>  Subtotal</Typography>
                        <Typography className='border'>  Delivery Fee</Typography>
                        <Typography className='border'> Total</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography className='border'> ${Subtotal}</Typography>
                        <Typography className='border'>  ${total}</Typography>
                        <Typography className='border'> ${total}</Typography>
                      </TableCell>


                    </TableRow>

                  </TableBody>
                </Table>
              </TableContainer>
              <Box mt={1}>
                <Button onClick={CashOnDeliveryOrder} className='proceed' variant='contained'>Cash On Delivery</Button>
              </Box>
              {/* CashOnDeliveryOrder */}
              <Box mt={1}>
                <Button onClick={Order} className='proceed' variant='contained'>Proceed to check</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
