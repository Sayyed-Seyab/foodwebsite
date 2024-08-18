import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Chip, Container, Paper, TextField } from '@mui/material';
import { Form, Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import axios from 'axios';
import { toast } from 'react-toastify';
import './style.css'
import { StoreContext } from '../Context/Storecontext';

const style = {
    //   position: 'absolute',
    //   top: '37%',
    //   left: '50%',
    //   transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid white',
    borderRadius: '10px',
    //   boxShadow: 24,
    p: 4,
};

export default function Addfood() {
   // Initial state values
   const initialState = {
    Name: "",
    Category: "",
    Description: "",
    Price: "",
    Image: null
};

const [AddFood, setAddFood] = useState(initialState);
const [error, setError] = useState(null);
const {url} = useContext(StoreContext)

// Handle input changes
const handlerChange = (event) => {
    const { name, value } = event.target;
    setAddFood({
        ...AddFood,
        [name]: value
    });
};

// Handle image change
const ChangeImage = (e) => {
    if (e.target.files && e.target.files[0]) {
        console.log(e.target.files[0]);
        setAddFood({
            ...AddFood,
            Image: e.target.files[0]
        });
    } else {
        console.log("No file selected or file input error.");
    }
};

// Validate form
const validateForm = () => {
    const { Name, Category, Description, Price, Image } = AddFood;
    if (!Name || !Category || !Description || !Price || !Image) {
        setError("All fields are required.");
        return false;
    }
    setError(null);
    return true;
};

// Handle form submission
const OnSubmithandler = (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const AddformData = new FormData();
    AddformData.append('Name', AddFood.Name);
    AddformData.append('Category', AddFood.Category);
    AddformData.append('Description', AddFood.Description);
    AddformData.append('Price', Number(AddFood.Price));
    AddformData.append('Image', AddFood.Image);

    axios.post(`${url}/api/food/add`, AddformData)
        .then((res) => {
            if (res.data) {
                // Reset form fields
                setAddFood(initialState);
              toast.success(res.data.Message);
            }
        }).catch(error => {
            console.log('Error: ' + error);
            toast.error(res.data.Message)
        });
};

useEffect(()=>{
    console.log(AddFood)
},[AddFood])

return (
    <div>
        <Box mt={2} component={Paper} sx={{ padding: 2 }}>
            <Typography  sx={{textAlign:'center'}} component="h1" variant="h5">
                Add Food
            </Typography>
            <Container maxWidth="xs">
                <Box component='form' onSubmit={OnSubmithandler}>
                    <Box>
                        <label htmlFor='img'>
                            {AddFood.Image ? <img style={{ width: "30%" }} src={URL.createObjectURL(AddFood.Image)} alt="Selected" /> : <CloudUploadOutlinedIcon sx={{ color: 'red', fontSize: '50px', "&:hover": { cursor: 'pointer', } }} />}
                        </label>
                        <TextField
                            sx={{
                                display: 'none',
                                '& label': { color: 'gray' },
                                '& label.Mui-focused': { color: 'red' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { border: 'none', borderColor: 'red' },
                                    '&:hover fieldset': { borderColor: 'green' },
                                    '&.Mui-focused fieldset': { borderColor: 'red' },
                                },
                            }}
                            size='small'
                            type='file'
                            id='img'
                            name='Image'
                            onChange={ChangeImage}
                            margin="normal"
                            required
                            fullWidth
                            autoComplete="Choose file"
                            autoFocus
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                sx={{
                                    '& label': { color: 'gray' },
                                    '& label.Mui-focused': { color: 'red' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: 'red' },
                                        '&:hover fieldset': { borderColor: 'green' },
                                        '&.Mui-focused fieldset': { borderColor: 'red' },
                                    },
                                }}
                                onChange={handlerChange}
                                value={AddFood.Name}
                                size='small'
                                margin="normal"
                                required
                                fullWidth
                                id="Name"
                                label="Name"
                                name="Name"
                                autoComplete="Name"
                                autoFocus
                            />
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'red' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'green' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'red' },
                                }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={AddFood.Category}
                                label="Category"
                                name='Category'
                                onChange={handlerChange}
                                required
                            >
                                <MenuItem value={'Pizza'}>Pizza</MenuItem>
                                <MenuItem value={'Burger'}>Burger</MenuItem>
                                <MenuItem value={'Shawarma'}>Shawarma</MenuItem>
                            </Select>
                            <TextField
                                sx={{
                                    '& label': { color: 'gray' },
                                    '& label.Mui-focused': { color: 'red' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: 'red' },
                                        '&:hover fieldset': { borderColor: 'green' },
                                        '&.Mui-focused fieldset': { borderColor: 'red' },
                                    },
                                }}
                                size='small'
                                margin="normal"
                                required
                                fullWidth
                                multiline
                                maxRows={10}
                                id="Description"
                                label="Description"
                                name="Description"
                                autoComplete="Description"
                                autoFocus
                                value={AddFood.Description}
                                onChange={handlerChange}
                            />
                            <TextField
                                sx={{
                                    '& label': { color: 'gray' },
                                    '& label.Mui-focused': { color: 'red' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: 'red' },
                                        '&:hover fieldset': { borderColor: 'green' },
                                        '&.Mui-focused fieldset': { borderColor: 'red' },
                                    },
                                }}
                                size='small'
                                margin="normal"
                                required
                                fullWidth
                                name="Price"
                                label="Price"
                                type="Number"
                                id="Price"
                                autoComplete="Price"
                                value={AddFood.Price}
                                onChange={handlerChange}
                            />
                            <Box sx={{ textAlign: 'center' }}>
                                <Chip
                                    className='btn'
                                    type="submit"
                                    label='Add Food'
                                    variant="outlined"
                                    clickable
                                    onClick={OnSubmithandler}
                                    sx={{ mt: 3, mb: 2 }}
                                />
                            </Box>
                            {error && <div style={{ color: 'red' }}>{error}</div>}
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    </div>
);
}
