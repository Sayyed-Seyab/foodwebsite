import { Box, Chip, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react';
import './style.css'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import axios from 'axios';
import { StoreContext } from '../Context/Storecontext';

export default function Myorders() {
  const { UserId, user, url } = useContext(StoreContext)
  const [Orders, setOrders] = useState([])

  const GetOrders = async () => {
    const response = await axios.post(`${url}/api/order/userorders`, { UserId })
    if (response.data.success) {
      console.log(response.data.data)
      setOrders(response.data.data);
    }
  }

  useEffect(() => {
    if (user) {
      GetOrders()
    }
  }, [])
  return (
    <div className='cart'>
      <Container sx={{marginTop:'50px'}}>
        <TableContainer  component={Paper} sx={{ height: '85vh',width:'100%',overflow:'auto'}} className='hide-scrollbar'  >
          <Table stickyHeader sx={{ minWidth: 650, padding: '15px', }} aria-label="simple table">
            {/* <TableHead>
                            <TableRow >
                                <TableCell className='bg'>Image</TableCell>
                                <TableCell className='bg' align="right">Orders</TableCell>
                                <TableCell className='bg' align="right">Date</TableCell>
                                <TableCell className='bg' align="right">Price</TableCell>
                                <TableCell className='bg' align="right">Action</TableCell>
                            </TableRow>
                        </TableHead> */}
            <TableBody sx={{ position: 'relative', overflow: 'auto', }}>
              {Orders.map((item) => (

                <>
                  <TableRow
                 
                    key={item._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}
                  >
                    <Box mt={2} sx={{ border: '1px solid gray', width: '100%', display: "flex", gap: 13 }}>

                      <TableCell sx={{ background: 'white', color: 'gray' }} component="th" scope="row">
                        <Box sx={{ width: "100%", height: 50, display: 'flex', gap: 2 }}>
                          {/* <img src={`${url}/Images/`+item.Image} style={{ width: '100%',borderRadius:'10px' }} alt="" /> */}
                          <Box>
                            <ShoppingBagIcon sx={{ color: 'gray', fontSize: "50px" }} />
                          </Box>

                          <Box sx={{ width: 200,display:'flex' }}>
                          {item.Items.map((product, index) => {
                            return (
                            <>
                                {index === item.Items.length - 1 ? (
                                 <Box>
                                   <Typography sx={{ fontSize: "0.8rem", fontFamily: 'Outfit',display:'inline' }}>
                                    {product.Name + "x" + product.quantity}
                                  </Typography>
                                 </Box>
                                ) : (
                                  <Box>
                                    <Typography sx={{ fontSize: "0.8rem", fontFamily: 'Outfit' }}>
                                    {product.Name + "x" + product.quantity + ","}
                                  </Typography>
                                  </Box>
                                )
                                }
                             </>
                            );
                          })}
                           </Box>



                        </Box>
                      </TableCell>
                      <TableCell sx={{ background: 'white', color: 'gray' }} align="right">${item.Amount}.00</TableCell>
                      <TableCell sx={{
                        background: 'white',
                        color: 'gray',
                        display: 'flex',
                        gap: '10px',
                        height: '50px'
                      }} align="right">
                        Items:{item.Items.length}
                      </TableCell>
                      <TableCell sx={{ background: 'white', color: 'gray' }} align="right">{item.Status}</TableCell>
                      <TableCell sx={{ background: 'white', color: 'gray' }} align="right">

                        <Chip
                          className='signup'
                          type="submit"
                          label='Track Order'
                          variant="outline"
                          clickable
                          onClick={GetOrders}
                          sx={{ mt: 0, mb: 2 }}

                        />
                      </TableCell>
                    </Box>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>


    </div>
  )
}
