import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
    Name: {type:String, required:true},
    Description: {type:String, required:true},
    Price: {type:Number, required:true},
    Image: {type:String, },
    Category: {type:String, required:true},
})

const FoodModel = mongoose.model.Food || mongoose.model('Food', FoodSchema);
export default FoodModel;