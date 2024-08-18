import express from 'express'
import { Addfood, DeleteFood, GetFood } from '../Controllers/FoodController.js'
import multer from 'multer'

const Foodrouter = express.Router()
//Image Storage Engine
const Storage = multer.diskStorage({
    destination : 'Uploads',
    filename : (req, file, cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
const Upload = multer({storage: Storage})

Foodrouter.post('/add',Upload.single('Image'),Addfood)
Foodrouter.get('/list', GetFood);
Foodrouter.delete('/delete/:id', DeleteFood);

export default Foodrouter;