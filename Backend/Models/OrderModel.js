import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
    UserId:{
        type:String,
        required:true,
    },
    UserName:{
        type:String,
        required:true,
    },
    Items:{
        type:Array,
        required:true,
    },
    Amount:{
        type:Number,
        required:true,
    },
    Address:{
        type:Object,
        required:true,
    },
    Status:{
        type:String,
        default:"Food Processing",
    },
    Date:{
        type:Date,
        default:Date.now(),
    },
    Payment:{
        type:Boolean,
        default:false,
    }
})

const OrderModel = mongoose.model.Order || mongoose.model('Order', OrderSchema);
export default OrderModel;