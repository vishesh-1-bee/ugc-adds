import express , {Request , Response}from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express'
import clerkwebhook from "./controllers/clerk.js";
import router from "./routes/userRoute.js";



dotenv.config()
const app = express();
const port = process.env.PORT || 3000;


//middleware 
app.use(cors());
app.post('/api/clerk' , express.raw({type: "application/json"}) ,clerkwebhook)
 app.use(express.json());
 app.use(clerkMiddleware())

app.get('/', (req:Request , res:Response) => {
    res.send('Hello World!')
})

app.use('/api/user' , router)

app.listen(port , () => {
    console.log(`Server started on port ${port}`)
})