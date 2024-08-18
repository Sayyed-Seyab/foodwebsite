import express from 'express';
import { isAdmin, loginUser, registerUser, UpdateUser } from '../Controllers/UserController.js';
import multer from 'multer';

const UserRouter = express.Router()

//Image Storage Engine
const Storage = multer.diskStorage({
    destination : 'Uploads',
    filename : (req, file, cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
const Upload = multer({storage: Storage})

UserRouter.post('/update',Upload.single('Image'), UpdateUser)
UserRouter.post('/register', registerUser);
UserRouter.post('/login',loginUser);
UserRouter.get('/role',isAdmin);


export default UserRouter;