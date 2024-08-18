import { Box, Container, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react';
import './style.css'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import axios from 'axios';
import { StoreContext } from '../Context/Storecontext';
import {CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

export default function Orders() {
    const { UserId, user, UserOrders,GetOrders,Orderloading,setOrders,url } = useContext(StoreContext);
    const [_id, setid] = useState();
    const [Status, setStatus] = useState();


    const UpdtUserStatus = async (status, _id) => {
        const response = await axios.post(`${url}/api/order/updateorder`, { _id, Status: status });
        if (response.data.success) {
            console.log(response.data);
            GetOrders();
            toast.success("Status Updated Successfully")
        } else {
            console.log('not updated');
            toast.error('Error')
        }
    };

    const handlerChange = (event, id) => {
        const newStatus = event.target.value;
        const _id = id;
        // setid(id)
        // setStatus(newStatus);
        UpdtUserStatus(newStatus, _id);
    };

    const DltOrder = (id) => {

        axios.delete(`${url}/api/order/delete/${id}`)
            .then((res) => {
                console.log(res.data.Message);
                setOrders(UserOrders.filter(item => item._id !== id))
               toast.success(res.data.Message)
               GetOrders()
            }).catch((error) => {
                console.log(error)
                toast.error(error)
            })
    }

    useEffect(() => {
        if (user) {
            GetOrders();
        }
    }, [user]);

    //   useEffect(()=>{
    //     console.log(_id)
    //     console.log(Status)
    //   },[Status])

    if (Orderloading) {
        return (
            <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (UserOrders.length == 0) {
        return (
            <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
              <Typography>processing... no data</Typography>
            </Container>
        );
    }

    return (
        <div className='cart'>
            <TableContainer component={Paper} sx={{ height: '85vh', overflow: 'auto' }} className='hide-scrollbar'>
                <Table stickyHeader sx={{ minWidth: 650, padding: '15px' }} aria-label="simple table">
                    <TableBody  sx={{ position: 'relative', overflow: 'auto' }}>
                        {UserOrders.map((item) => (
                            <TableRow
                            
                                key={item._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <Box mt={2} sx={{ border: '1px solid gray', width: '100%', display: "flex", gap: 11 }}>
                                    <TableCell sx={{ background: 'white', width: 100, color: 'gray' }} component="th" scope="row">
                                        <Box sx={{ width: "100%",  display: 'flex', gap: 2 }}>
                                            <Box>
                                                <ShoppingBagIcon sx={{ color: 'gray', fontSize: "50px" }} />
                                            </Box>
                                            <Box sx={{ width: 200, display: 'flex', flexDirection: 'column' }}>
                                                <ul style={{ padding: 0, margin: 0, listStyleType: 'none' }}>
                                                    {item.Items.map((product, index) => (
                                                        <li key={index} style={{ fontSize: "0.8rem", fontFamily: 'Outfit' }}>
                                                            {product.Name + "x" + product.quantity}
                                                            {index !== item.Items.length - 1 && ","}
                                                        </li>
                                                    ))}
                                                    <li style={{ fontSize: "0.8rem", fontFamily: 'Outfit' }}>{item.UserName}</li>
                                                    <li style={{ fontSize: "0.8rem", fontFamily: 'Outfit' }}>{item.Date}</li>
                                                </ul>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ background: 'white', width: 20, color: 'gray' }} align="right">${item.Amount}.00</TableCell>
                                    <TableCell sx={{ background: 'white', width: 0, color: 'gray', display: 'flex', gap: '10px', height: '50px' }} align="right">
                                        Items:{item.Items.length}
                                    </TableCell>
                                    <TableCell sx={{ background: 'white', width: 10, color: 'gray' }} align="right">{item.Status}</TableCell>
                                    <TableCell sx={{ background: 'white', width: 110, color: 'gray' }} align="right">
                                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                        <Select
                                            sx={{
                                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'red' },
                                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'green' },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'red' },
                                            }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={Status}
                                            label="Status"
                                            name='Status'
                                            size='small'
                                            onChange={(event) => handlerChange(event, item._id)}
                                            //   onClick={() => GetId(item._id)}
                                            required
                                        >
                                            <MenuItem value={'Cancelled'}>Cancelled</MenuItem>
                                            <MenuItem value={'Out For Delivery'}>Out For Delivery</MenuItem>
                                            <MenuItem value={'Delivered'}>Delivered</MenuItem>
                                        </Select>
                                    </TableCell>

                                    <DeleteForeverOutlinedIcon
                                          onClick={() => DltOrder(item._id)}
                                          sx={{
                                              color: 'tomato',
                                              cursor: 'pointer',
                                          }} />
                                </Box>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
