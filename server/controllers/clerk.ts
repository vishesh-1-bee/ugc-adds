import {Request,Response} from 'express'
import { verifyWebhook } from '@clerk/express/webhooks'
import { prisma } from '../config/prisma.js';
const clerkwebhook = async (req:Request , res:Response) => {
    try {
        const evt : any = await verifyWebhook(req)
        //getting data from the body 
        const {data , type} = evt;

        //switch case for the different events

        switch (type) {
            case "user.created":{
                //create user in db
                await prisma.user.create({
                    data:{
                        id:data.id,
                        email:data?.email_addresses?.[0]?.email_address,
                        name:data?.first_name+" "+data?.last_name,
                        image:data?.image_url,
                        
                    }
                })
                break;

            }

             case "user.updated":{
                //create user in db
                await prisma.user.update({
                    where:{
                        id:data.id,
                        
                    },
                    data:{
                        email:data?.email_addresses?.[0]?.email_address,
                        name:data?.first_name+" "+data?.last_name,
                        image:data?.image_url,
                        
                    }
                })
                break;

            }

             case "user.deleted":{
                //create user in db
                await prisma.user.delete({
                    where:{
                        id:data.id,
                        
                    }
                })
                break;

            }

             case "paymentAttempt.updated":{
                if ((data.charge_type === "recurring" || data.charge_type === "checkout") && data.status === "paid") {
                    const credits = {pro : 80 , premium: 240}

                    const clerkUserId= data?.payer?.user_id;
                    const planId : keyof typeof credits  = data?.subscription_items?.[0]?.plan?.slug ;

                    if ( planId !== "pro" && planId !== "premium" ) {
                        return res.status(400).json({
                            message:'invalid subscription '
                        })
                    }

                   console.log(planId)

                    await prisma.user.update({
                        where:{
                            id:clerkUserId
                        },
                        data:{
                            credits:{
                                increment : credits[planId],
                            }
                        }
                    })

                }
                break;

            }

            default:
                break;
        }


       res.json({mag : "webhook recieved :" + type})

    } catch (error : any) {
        return res.status(500).json({message:"server error" , error:error.message})
        
    }
}   

export default clerkwebhook