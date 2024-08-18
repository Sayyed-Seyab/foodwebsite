import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        unique:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true,
    },
    Image: {type:String, },

    Password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }
    ,
    CartData:{
        type:Object,
        default:{},
    }
})

const UserModel = mongoose.model.User || mongoose.model('User', UserSchema);
export default UserModel;

