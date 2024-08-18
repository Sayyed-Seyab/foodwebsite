import UserModel from "../Models/UserModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import validator from "validator";



// Password validation regex
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]{8,}$/;

const creatToken = (id, Name, role,Image)=>{
    return jwt.sign({id,Name, role,Image}, process.env.JWT_SECRET);

}
const loginUser = async(req, res)=>{
    try{
        const {Email, Password} = req.body;
        const user = await UserModel.findOne({Email});
        if(!user){
            return res.json({success:false, Message:'Invalid Email or Password'})
        }
        const Pass = await bcrypt.compare(Password, user.Password);
        if(!Pass){
            res.json({success:false, Message:'Invalid credentials'})
        }
        const token = creatToken(user._id, user.Name, user.role, user.Image)
        res.cookie('token',token,{
            httpOnly:true,
        })
        res.json({success:true, token})
       
       
    }catch (error){
        console.log(error)
        res.json({success:false, Message:error})

    }
   

}

const isAdmin = async(req, res)=>{
  try{
    const token = req.cookies.token;
   
    if(!token){
        res.status(401).json({success:false, Message:'Unauthorized user not found'})
    }
    const decod = jwt.verify(token, process.env.JWT_SECRET)
    const User = await UserModel.findById(decod.id)
    if(!User){
        res.status(401).json({success:false, Message:'User not found'})
    }
    if(User.role == 'admin'){
        res.status(200).json({success:true, Message:User.role})
    }
    if(User.role == 'user'){
        res.status(200).json({success:true, Message:User.role})
    }
    
  }catch(error){

  }

  
}



const registerUser = async(req,res)=>{
    
    try{
        const {Name, Email, Password,role} = req.body;
        const exist = await UserModel.findOne({Email});
        if(exist){
            return res.json({success:false, Message:'User already exist'});
        }

        if(!validator.isEmail(Email)){
            return res.json({success:false, Message:'Please enter a valid email'})
        }
        if(Password.length < 8){
            return res.json({success:false, Message:'Password must be greater than 8'})
        }
        if (!passwordRegex.test(Password)) {
            return res.json({ success: false, Message: ' include an uppercase letter, a lowercase letter, a number, and a special character' });
          }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password,salt);

        const newUSer = new UserModel({
            Name,
            Email,
            Password: hashedPassword,
            role,
        })
        const user = await newUSer.save();
        const token = creatToken(user._id);
        res.json({success:true, token})

    }catch (error){
        console.log(error)
        res.json({success:false, Message:'Error'})

    }

}

const UpdateUser = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const image_filename = req.file.filename;
        const updatedUser = await UserModel.findByIdAndUpdate(req.body._id, { Image: image_filename }, { new: true });

        if (updatedUser) {
            res.json({ success: true, message: updatedUser.Image });
        } else {
            res.json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error updating user' });
    }
};


export {loginUser, registerUser,isAdmin,UpdateUser}