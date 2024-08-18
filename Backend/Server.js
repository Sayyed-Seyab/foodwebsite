import express from 'express';
import cors from 'cors';
import Db from './Config/Config.js';
import Foodrouter from './Routes/Foodroute.js';
import bodyParser from 'body-parser';
import UserRouter from './Routes/UserRoute.js';
import 'dotenv/config.js'
import cookieParser from 'cookie-parser';
import OrderRouter from './Routes/OrderRoute.js';


const app  = express();
const port = process.env.PORT || 4000;

//Database connection
Db();

//middleware
// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
  }));
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); // Add this to handle URL-encoded data
  app.use(cookieParser())

//Api endpoint
app.use('/api/food', Foodrouter)
app.use('/Images', express.static('Uploads'));
app.use('/api/user', UserRouter);
app.use('/api/order', OrderRouter);




  

app.get('/', (req, res)=>{
    res.send('API is working');
})

app.listen(port, ()=>{
    console.log(`Server started on http:/localhost:${port}`)
})


// Db_URL =mongodb+srv://admin:admin@Cluster0.uaxmezr.mongodb.net/practice?