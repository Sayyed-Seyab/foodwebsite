
import FoodModel from "../Models/FoodModel.js";
import fs from 'fs';


//add food
const Addfood = async (req, res) => {
        let image_filename = `${req.file.filename}`;
        // if(!image_filename){
        //     return res.status(400).json({success: 'false', Message: 'file not uploaded'})
        // }
        try {
        const Food = new FoodModel({
            Name: req.body.Name,
            Description: req.body.Description,
            Price: req.body.Price,
            Category: req.body.Category,
            Image: image_filename,
        })
       
      
        await Food.save();
        res.status(200).json({ success: 'true', Message: 'Food added successfully', Food })

    } catch (error) {
        console.log(error);
        res.status(500).json({success:'false', Message:'Internal server error', Food})
    }
}

//Get food
const GetFood = async(req, res)=>{
    try{
        const Food = await FoodModel.find({});
        if(!Food){
           return res.status(404).json({success:false, Message:'Food not found'})
        } 
        res.status(200).json({success:true, Food})

    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,Message:'Internal server error'})
    }
}

//DeleteFood
const DeleteFood = async(req, res)=>{
    try{
        const id = req.params.id;
        const Food = await FoodModel.findById(id);
        fs.unlink(`Uploads/${Food.Image}`, ()=>{});
        await FoodModel.findByIdAndDelete(id);
        if(!Food ){
            return res.status(404).json({success:false, Messaage:'Food not found'})
        }
        res.status(200).json({success: true, Message:'Food deleted successfully'})
    }catch(error){
        console.log(error);
        return res.status(500).json({success: false, Message:'Internal server error'})

    }
}

export { Addfood, GetFood, DeleteFood}