import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Chip, Container, Grid, TextField, Typography } from '@mui/material';
import './table.css'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { StoreContext } from '../Context/Storecontext';
import largsharwarma from '../../assets/largsharwarma.png'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function createData(
    Img, name, quantity, Price, action,
) {
    return { Img, name, quantity, Price, action };
}

const rows = [
    createData('Img', 'Burger', 6, '$20', 'x',),
    createData('Img', 'Burger', 6, '$20', 'x',),
    createData('Img', 'Burger', 6, '$20', 'x',),
    createData('Img', 'Burger', 6, '$20', 'x',),
    createData('Img', 'Burger', 6, '$20', 'x',),
];

export default function Cart() {
    const { incQuantity, cartItems, decQuantity, removecarItem, getCart } = React.useContext(StoreContext)
    const url = 'http://localhost:4000'
    let total = 0
    let subtotal = 0
    const navigate = useNavigate();
    const handleClick = () => {
        if(cartItems.length > 0){
            navigate('/PlaceOrder');
            console.log(Cart.length)
        }else{
            toast.warn('Cart is empty')
        }
      
       
    }

    if(cartItems.length == 0){
        return <Typography sx={{textAlign:'center',height:'90vh',marginTop:8}}>Cart is empty</Typography>
    }
    return (
        <div className='cart'>
            <Container  >
                <TableContainer component={Paper} sx={{ height: '40vh' }} >
                    <Table stickyHeader sx={{ minWidth: 650, }} aria-label="simple table">
                        <TableHead>
                            <TableRow >
                                <TableCell className='bg'>Image</TableCell>
                                <TableCell className='bg' align="right">Name</TableCell>
                                <TableCell className='bg' align="right">Quantity</TableCell>
                                <TableCell className='bg' align="right">Price</TableCell>
                                <TableCell className='bg' align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ position: 'relative', overflow: 'auto' }}>
                            {cartItems.map((item) => (

                                <TableRow
                                    key={item._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <Typography sx={{ display: 'none' }}>{subtotal += item.Price * item.quantity}</Typography>
                                    <TableCell sx={{ background: 'white' }} component="th" scope="row">
                                        <Box sx={{ width: "50px", height:50 }}>
                                            <img src={`${url}/Images/`+item.Image} style={{ width: '100%',borderRadius:'10px' }} alt="" />
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ background: 'white' }} align="right">{item.Name}</TableCell>
                                    <TableCell sx={{
                                         background: 'white',
                                          display: 'flex',
                                           gap: '10px',
                                           height:'50px'
                                          }} align="right">
                                        <AddOutlinedIcon onClick={() => incQuantity(item)} sx={{ color: 'red', marginTop: '7px', cursor: 'pointer' }} />
                                        <Typography mt={1}> {item.quantity} </Typography>
                                        <RemoveOutlinedIcon onClick={() => decQuantity(item)} sx={{ color: 'red', marginTop: '7px', cursor: 'pointer' }} />
                                    </TableCell>
                                    <TableCell sx={{ background: 'white' }} align="right">${total = item.Price * item.quantity}</TableCell>
                                    <TableCell sx={{ background: 'white' }} align="right">
                                        <DeleteForeverOutlinedIcon
                                            onClick={() => removecarItem(item)}
                                            sx={{
                                                color: 'tomato',
                                                cursor: 'pointer',
                                            }} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>


            <Container>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={6} sm={6}>
                        <TableContainer component={Paper} sx={{ width: 300 }}>
                            <Table sx={{ maxWidth: 300 }} aria-label="simple table">
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
                                            <Typography className='border'>${subtotal}</Typography>
                                            <Typography className='border'>  ${subtotal + 2}</Typography>
                                            <Typography className='border'> ${subtotal + 2}</Typography>
                                        </TableCell>


                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Box mt={1}>
                            <Button onClick={handleClick} className='proceed' variant='contained'>Proceed to check</Button>
                        </Box>
                    </Grid>


                    <Grid item xs={12} md={6} sm={6}>
                        <Box sx={{ float: 'right', display: 'flex', gap: '10px' }}>
                            <Box>
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
                                    title='enter'
                                    label='enter code' />
                            </Box>
                            <Box>
                                <Button variant='contained' sx={{ background: 'tomato', '&:hover': { background: 'red', fontWeight: 'bold' }, }}>code</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

