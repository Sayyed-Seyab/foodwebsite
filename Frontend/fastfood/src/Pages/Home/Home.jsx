import React, { useState } from 'react'
import Header from '../../components/Header/Header'

import { Box,  } from '@mui/material'
import Topcategory from '../../components/Category/Topcategory'
import Menu from '../../components/Menu/Menu'
import Footer from '../../components/Footer/Footer'
import Login from '../../components/UserAccount/Login'

export default function Home() {
    const  [category, setcategory] = useState('All');
  return (
   
    <div>
        {/* <Login/> */}
       <div id='Home'>
       <Header/>
       </div>

        <Box mt={5} id='category'>
            <Topcategory category={category} setcategory={setcategory}/>
        </Box>

        <Box mt={5}>
            <Menu category={category}/>
        </Box>

        <Box mt={5}>
            <Footer/>
        </Box>
    </div>
  )
}
