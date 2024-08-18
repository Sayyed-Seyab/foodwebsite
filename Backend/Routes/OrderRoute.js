import express from 'express'
import { AllOrders, CashOnDeliveryOrder, DeleteOrder, PlaceUserOrder, UpdateOrder, USerOrders, VerifyOrder } from '../Controllers/OrderController.js';


const OrderRouter = express.Router();
OrderRouter.post('/place', PlaceUserOrder);
OrderRouter.post('/verify', VerifyOrder);
OrderRouter.post('/userorders',USerOrders)
OrderRouter.post('/cashondelivery',CashOnDeliveryOrder)
OrderRouter.post('/updateorder',UpdateOrder)
OrderRouter.post('/orderlist',AllOrders)
OrderRouter.delete('/delete/:id',DeleteOrder)


export default OrderRouter;