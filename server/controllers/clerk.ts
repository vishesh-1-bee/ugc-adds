import {Request,Response} from 'express'
import { verifyWebhook } from '@clerk/express/webhooks'
const clerkwebhook = async (req:Request , res:Response) => {
    try {
        const evt = await verifyWebhook(req)
        
    } catch (error) {
        
    }
}   