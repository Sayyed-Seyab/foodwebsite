import React from 'react'
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Box, Container, MenuList, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import './caterogy.css';
import largpizza from '../../assets/largpizza.png';
import Burger from '../../assets/Burger.png';
import MenuShakes from '../../assets/MenuShakes.png';
import largsharwarma from '../../assets/largsharwarma.png';
import { getSystemErrorName } from 'util';

const DemoPaper = styled(Box)(({ theme }) => ({
    width: 120,
    height: '20vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(2),

    textAlign: 'center',

}));

export default function Topcategory({ category, setcategory }) {
    const categories = [
        { name: 'Pizza', Img: largpizza },
        { name: 'Burger', Img: Burger },
        { name: 'Shawarma', Img: largsharwarma },
        { name: 'Milk Shake', Img: MenuShakes },
    ]
    const getname = (name) => {
        setcategory(prev => prev === name ? 'All' : name)
    }
    return (
        <div >
            <Container  id='categories' sx={{display:'flex', flexDirection:'column'}}>

               <Box mb={5}>
               <Typography variant='h5'
                    sx={{
                        fontFamily: 'Outfit',
                        textAlign: 'center'
                    }}>
                    Explore our Mune
                </Typography>

                <Typography variant='h6'
                    sx={{
                        fontFamily: 'Outfit',
                        textAlign: 'center',
                        fontSize: '0.9rem',
                        color: 'gray',
                    }}>
                    Choose from a diverse menu featuring a delectable array of dishes.
                </Typography>
               </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',

                }}>
                    <Paper>
                        <Stack mt={5} direction={'row'}

                            className='Categorystack'>
                            {categories.map((cat) => {
                                return (
                                    <DemoPaper onClick={() => getname(cat.name)} square={false}>
                                        <Box className='category' sx={{width:'100px',background:'wheat',padding:1,borderRadius:15,}}>
                                            <img
                                                className={category === cat.name ? 'Active' : ''}
                                                style={{
                                                    // borderRadius:'50%',
                                                    // border:'1px solid red',
                                                    height:100,
                                                    
                                                    width: '100%',
                                                }} alt="Remy Sharp" src={cat.Img} />
                                        </Box>
                                        <Box>
                                            <Typography

                                                sx={{
                                                    fontFamily: 'Outfit'
                                                }}>
                                                {cat.name}
                                            </Typography>
                                        </Box>
                                    </DemoPaper>

                                )
                            })}












                        </Stack>

                    </Paper>
                </Box>

            </Container>
        </div>
    )
}
