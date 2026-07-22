import { Request , Response } from "express"
import { prisma } from "../config/prisma.js";
//to get the user credits 
export const getusercredit = async (req:Request , res:Response)=>{
    try {
        const {userId}= req.auth();

        if(!userId){
            return res.status(401).json({message:"unauthorized"})
        }

        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })

        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        return res.status(200).json({credits:user.credits})
    } catch (error : any) {
        return res.status(500).json({message:"server error" , error:error.message})
        
    }
}

//get all the user project
export const getallprojects = async (req:Request , res:Response)=>{
    try {
        const {userId}= req.auth();

        const project = await prisma.project.findMany({
            where:{
                userId:userId
            },
            orderBy: {createdAt: "desc"}
        })

        return res.status(200).json({project})
    } catch (error : any) {
        return res.status(500).json({message:"server error" , error:error.message})
        
    }
}

//get project by id 
export const getprojectbyId = async (req:Request , res:Response)=>{
    try {
      const {userId}= req.auth();
      const {projectId} = req.params;

      if(!userId){
          return res.status(401).json({message:"unauthorized"})
      }

      

      const project = await prisma.project.findUnique({
        where:{
            id:Array.isArray(projectId) ? projectId[0] : projectId,
            userId
        }
      })

      if(!project){
          return res.status(404).json({message:"project not found"})
      }

      return res.status(200).json({project})
    } catch (error : any) {
        return res.status(500).json({message:"server error" , error:error.message})
        
    }
}

//publish // unpublish
export const publish = async (req:Request , res:Response)=>{
     try {
      const {userId}= req.auth();
      const {projectId} = req.params;

      if(!userId){
          return res.status(401).json({message:"unauthorized"})
      }

      

      const project = await prisma.project.findUnique({
        where:{
            id:Array.isArray(projectId) ? projectId[0] : projectId,
            userId
        }
      })

      if(!project){
          return res.status(404).json({message:"project not found"})
      }

      if (!project?.generatedImage && !project?.generatedVideo) {
        return res.status(400).json({message:"image or video is not available"})
      }

      const newPublishStatus = !project.isPublished;

      await prisma.project.update({
        where:{
          id:Array.isArray(projectId) ? projectId[0] : projectId,
          userId
        },
        data:{
          isPublished:newPublishStatus
        }
      })

      return res.status(200).json({project:{...project , isPublished:newPublishStatus}})
    } catch (error : any) {
        return res.status(500).json({message:"server error" , error:error.message})
        
    }
}