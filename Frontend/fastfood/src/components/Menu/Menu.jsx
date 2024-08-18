import React, { useContext, useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Chip, Container } from '@mui/material';
import largsharwarma from '../../assets/largsharwarma.png'
// import { resourceUsage } from 'process';
import { StoreContext } from '../Context/Storecontext';
import { red } from '@mui/material/colors';
import './menu.css'
import {CircularProgress } from '@mui/material';
import axios from 'axios';


export default function Menu({category}) {
   
   
    const {addToCart,Message, id,user,url,food, getfood,loading} = useContext(StoreContext)
    
  
    // const food =[
    //     { id:1, name:'Burger',Desc:'Good Food', Img:largsharwarma, Price: 23},
    //     {id:2, name:'Pizza',Desc:'Good Food', Img:largsharwarma, Price: 23},
    //     {id:3, name:'Burger',Desc:'Good Food', Img:largsharwarma, Price: 23},
    //     {id:4, name:'Burger',Desc:'Good Food', Img:largsharwarma, Price: 23},
    // ]
   
    useEffect(()=>{
      getfood()
    },[])

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
    <Container id='Menu'>
    <Box sx={{textAlign:'center'}}> 
        <Typography sx={{fontFamily:'Outfit'}} variant='h5'>Menu</Typography>
        </Box>
        <Box mt={5} sx={{display:'flex', flexWrap:'wrap',gap:'30px', justifyContent:'center',}}>
 {food.map((item)=>{
    if(category === 'All' || category=== item.Category){
        return (
            <Card className='Card' key={item._id} sx={{ maxWidth: 300, textAlign:'center' }} >
            <CardMedia
              component="img"
              alt="green iguana"
              width="200"
              height="150"
              image={`${url}/images/`+item.Image}
            />
            <CardContent>
              <Typography sx={{fontFamily:'Outfit'}} gutterBottom variant="h5" component="div">
               ${item.Name}
              </Typography>
              <Typography sx={{fontFamily:'Outfit'}} variant="body2" color="text.secondary">
                {item.Description}
              </Typography>
              <Typography sx={{fontFamily:'Outfit',color:'tomato'}} variant="body2" color="text.secondary">
                {item.Price}
              </Typography>
            </CardContent>
            <Box sx={{display:'flex', justifyContent:'center'}}>
            <CardActions >
              
             {id === item._id?
             <Typography>{Message}</Typography>
            
              :
              <>
              <Chip className='btn' onClick={()=>addToCart(item, item.id)}  variant='outlined' label="Add to cart"
              sx={{
                cursor:'pointer',
                fontFamily:'Outfit',
                '&:hover':{
                    backgroundColor:'red',
                    color:'white',
                    fontWeight:'bold',
                    transition:'0.9s',
                }
              }}/></>}
            </CardActions>
            </Box>
          </Card>
        )
    }
 })}
  


        </Box>
    </Container>
    </div>
  )
}
