import express , {Request , Response}from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express'



dotenv.config()
const app = express();
const port = process.env.PORT || 5000;


//middleware 
 app.use(cors());
 app.use(express.json());
 app.use(clerkMiddleware())

app.get('/', (req:Request , res:Response) => {
    res.send('Hello World!')
})

app.listen(port , () => {
    console.log(`Server started on port ${port}`)
})