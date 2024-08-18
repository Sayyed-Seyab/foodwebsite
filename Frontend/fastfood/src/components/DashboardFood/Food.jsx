import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../Context/Storecontext'
import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {CircularProgress } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
export default function Food() {
 
  
  const {loading, getfood,food, setfood,url } = useContext(StoreContext)

 

  const Dltfood = (id) => {

    axios.delete(`${url}/api/food/delete/${id}`)
        .then((res) => {
            console.log(res.data.Message);
           setfood(food.filter(item => item._id !== id))
           toast.success(res.data.Message)
        }).catch((error) => {
            console.log(error)
            toast.error(res.data.Message)
        })
}

  useEffect(()=>{
    getfood()
  }, [])

  if (loading) {
    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
            <CircularProgress />
        </Container>
    );
}

if (food.length == 0) {
    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
           <Typography sx={{fontFamily:'Outfit',fontSize:'1.5rem'}}>processing.... No data</Typography>
        </Container>
    );
}
  return (
    <div>
      
                <TableContainer component={Paper} sx={{ height: '80vh' }} >
                    <Table stickyHeader sx={{ minWidth: 650, background: 'red', }} aria-label="simple table">
                        <TableHead>
                            <TableRow >
                                <TableCell className='bg'>Image</TableCell>
                                <TableCell className='bg' align="right">Name</TableCell>
                                <TableCell className='bg' align="right">Category</TableCell>
                                <TableCell className='bg' align="right">Price</TableCell>
                                <TableCell className='bg' align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ position: 'relative', overflow: 'auto' }}>
                            {food.map((item) => (
                                <>
                                 <TableRow
                                  // key={item._id}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                 
                                  <TableCell sx={{ background: 'white' }} component="th" scope="row">
                                      <Box sx={{ width: "50px", height: '50px' }}>
                                          <img src={`${url}/images/`+item.Image} style={{ width: '100%' }} alt="" />
                                      </Box>
                                  </TableCell>
                                  <TableCell sx={{ background: 'white' }} align="right">{item.Name}</TableCell>
                                  <TableCell sx={{ background: 'white'}} align="right">
                                     {item.Category}
                                      {/* <AddOutlinedIcon onClick={() => incQuantity(item)} sx={{ color: 'red', marginTop: '7px', cursor: 'pointer' }} />
                                      <Typography mt={1}> {item.quantity} </Typography>
                                      <RemoveOutlinedIcon onClick={() => decQuantity(item)} sx={{ color: 'red', marginTop: '7px', cursor: 'pointer' }} /> */}
                                  </TableCell>
                                  <TableCell sx={{ background: 'white' }} align="right">${item.Price }</TableCell>
                                  <TableCell sx={{ background: 'white' }} align="right">
                                      <DeleteForeverOutlinedIcon
                                          onClick={() => Dltfood(item._id)}
                                          sx={{
                                              color: 'tomato',
                                              cursor: 'pointer',
                                          }} />
                                  </TableCell>
                              </TableRow>
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
           
    </div>
  )
}
