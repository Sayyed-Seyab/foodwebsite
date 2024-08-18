import mongoose from "mongoose";
const Db = ()=>{
    mongoose.connect('mongodb+srv://admin:admin@Cluster0.uaxmezr.mongodb.net/FoodDelivery?').then(()=>{
        console.log('Database is connected')
    },
err =>{console.log('There is problem while connecting database' + err)});
}
export default Db;