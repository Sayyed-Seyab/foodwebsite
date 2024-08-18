import { Divider, List, ListItem, ListItemButton, ListItemText, Paper, Toolbar } from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import React from 'react'
import './style.css';
import { Link } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import DonutSmallOutlinedIcon from '@mui/icons-material/DonutSmallOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';

export default function Sidebar() {
  return (
    <div  >
      <Paper className='Sidebar' >
      <Toolbar />
      <Divider />
      <List>
       
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
             <Link  to='Dashboard/addfood'>
             <AddOutlinedIcon /> 
             </Link>
              </ListItemIcon>
            <Link  to='Dashboard/addfood'>
            <ListItemText primary={'Add food'} />
            </Link>
            </ListItemButton>
          </ListItem>

          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
             <Link  to='Dashboard/food'>
             <RestaurantOutlinedIcon/> 
             </Link>
              </ListItemIcon>
             <Link  to='Dashboard/food'>
             <ListItemText primary={'Food'} />
             </Link>
            </ListItemButton>
          </ListItem>


          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
             <Link to='Dashboard/orders'>
             <AddBusinessOutlinedIcon /> 
             </Link>
              </ListItemIcon>
              <Link  to='Dashboard/orders'>
              <ListItemText primary={'Orders'} />
              </Link>
            </ListItemButton>
          </ListItem>


          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
            <Link  to='Dashboard/stats'>
            <DonutSmallOutlinedIcon /> 
            </Link>
              </ListItemIcon>
              <Link  to='Dashboard/stats'>
              <ListItemText primary={'Dashboard'} />
              </Link>
            </ListItemButton>
          </ListItem>
   
      </List>
      <Divider />
      </Paper>
    </div>
  )
}
