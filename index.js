import express from 'express';
import dotenv from 'dotenv'
import connectDB from './Config/Config.js';
import userRouter from './Routes/userRoutes.js';
import inventoryRouter from './Routes/inventoryRoute.js'
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express()
dotenv.config();

connectDB()
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true,
}
));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',userRouter)
app.use('/api',inventoryRouter)

app.listen(process.env.PORT,()=>
    console.log(`app is listening to ${process.env.PORT}`))