import Stripe from "stripe"
import OrderModel from "../Models/OrderModel.js"
import fs from 'fs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Cash on delivery
const CashOnDeliveryOrder = async(req, res)=>{
    try{
        const NewOrder = new OrderModel({
            UserId:req.body.UserId,
            UserName:req.body.UserName,
            Items:req.body.Items,
            Amount:req.body.Amount,
            Address:req.body.Address,
        })
        await NewOrder.save();
        res.json({success:true, Message:'Order keeped successfully'})
}catch(error){
    res.json({success:false, Message:error})

}
}
// Place user order form frontend
const PlaceUserOrder = async(req, res)=>{
    const Frontend_url = 'http://localhost:5173'
    try{
        const NewOrder = new OrderModel({
            UserId:req.body.UserId,
            UserName:req.body.UserName,
            Items:req.body.Items,
            Amount:req.body.Amount,
            Address:req.body.Address,
        })
        await NewOrder.save();
        const Line_items = req.body.Items.map((item)=>({
            price_data:{
                currency:'USD',
                product_data:{
                    name:item.Name,
                },
                unit_amount:item.Price*296,
            },
            quantity:item.quantity,

        }))
        Line_items.push({
            price_data:{
                currency:'USD',
                product_data:{
                    name:'Delivery Charges',
                },
                unit_amount:2*296,
            },
            quantity:1,

        })
        const session = await stripe.checkout.sessions.create({
            line_items:Line_items,
            mode:'payment',
            success_url:`${Frontend_url}/verify?success=true&orderId=${NewOrder._id}`,
            cancel_url:`${Frontend_url}/verify?success=false&orderId=${NewOrder._id}`,
        })
    res.json({success:true,session_url:session.url})

    }catch(error){
        console.log(error)
        res.json({success:false, Messaage:'Error'})
    }

}

const VerifyOrder = async(req, res) => {
    const { success, orderId } = req.body;
    console.log('Received:', { success, orderId });

    try {
        if(success === "true" || success === true) {
            const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, { Payment: true });
            if (updatedOrder) {
                res.json({ success: true, message: "Paid" });
            } else {
                res.json({ success: false, message: "Order not found" });
                
            }
        } else {
            const deletedOrder = await OrderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: 'Not Paid' });
        }
    } catch (error) {
        console.error('Error in VerifyOrder:', error);
        res.json({ success: false, message: 'Error' });
    }
};

const  USerOrders = async(req, res)=>{
    const {UserId} = req.body;
    try{
      const orders =   await OrderModel.find({UserId:UserId})
        res.json({success:true, data:orders})

    }catch(error){
        console.log(error)
        res.json({success:true, Message:'Error'})

    }
}

const UpdateOrder = async(req, res)=>{
    const {_id, Status} = req.body;
   try{
    const updateStatus = await OrderModel.findByIdAndUpdate(_id,{Status:Status})
    if(updateStatus){
     res.json({success:true,Message:"Order Updated Successfully"})
    }else{
     res.json({success:false, Message:'User not found'})
    }
   }catch(error){
    console.log(error)
    res.json({success:false, Message:'Error'})
   }
}

const AllOrders = async(req, res)=>{
    try{
        const Orderlist = await OrderModel.find({});
        if(!Orderlist){
           return resjson({success:false, Message:'Orders not found'})
        } 
        res.json({success:true, Orderlist})

    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,Message:'Internal server error'})
    }
}


//DeleteOrder
const DeleteOrder = async(req, res)=>{
    const id = req.params.id;
    try{
       
        const Food = await OrderModel.findById(id);
        await OrderModel.findByIdAndDelete(id);
        if(!Food ){
            return res.status(404).json({success:false, Messaage:'Order not found'})
        }
        res.status(200).json({success: true, Message:'Order deleted successfully'})
    }catch(error){
        console.log(error);
        return res.json({success: false, Message:'Internal server error'})

    }
}

export {PlaceUserOrder, VerifyOrder, USerOrders, UpdateOrder,AllOrders,DeleteOrder,CashOnDeliveryOrder}