import express from 'express';
import dotenv from 'dotenv'

const app = express()
dotenv.config();


app.listen(process.env.PORT,()=>
    console.log(`app is listening to ${process.env.PORT}`))