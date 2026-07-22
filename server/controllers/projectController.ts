import { Request , Response } from "express"

export const createProject = async (req:Request , res:Response)=>{
try {
    
} catch (error : any) {
    return res.status(500).json({message:"server error" , error:error.message})
}
}

export const createVideo = async (req:Request , res:Response)=>{
try {
    
} catch (error : any) {
    return res.status(500).json({message:"server error" , error:error.message})
}
}
    
