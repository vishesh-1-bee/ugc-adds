import { Request, Response } from "express"
import { prisma } from "../config/prisma.js";
import { v2 as cloudinary } from 'cloudinary';
import { GenerateContentConfig , HarmBlockThreshold,HarmCategory } from '@google/genai'
import fs from 'fs'
import path from "path";
import { text } from "stream/consumers";
import ai from "../config/ai.js";
//we creata function as we have two image 
const loadimage = (path : string , mimeType : string)=>{
  return {
    inlineData:{
        data: fs.readFileSync(path).toString("base64"),
        mimeType:mimeType
    }
  }
}


export const createProject = async (req: Request, res: Response) => {
    let tempprojectid: string
    const { userId } = req.auth();
    let iscreditdeducted = false;
    const {
        name = 'New Project',
        aspectRatio, userPrompt,
        productName, productDescription,
        targetLenght = 5,
    } = req.body;

    //using multer to get the iamge url

    const image: any = req.files;

    if (image.length < 2 || !productName) {
        return res.status(400).json({ message: "please upload images" })
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!user || user.credits < 5) {
        return res.status(400).json({ message: "insufficient credits" })
    }
    else {
        //deduct credits
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                credits: user.credits - 5
            }
        }).then(() => { iscreditdeducted = true })
    }




    try {

        let uploadedImages = await Promise.all(
            image.map(async (image: any) => {
                let result = await cloudinary.uploader.upload(image.path, {
                    resource_type: "image"
                });
                return result.secure_url;
            })
        )

        const project = await prisma.project.create({
            data: {
                name, userId, productName, productDescription, userPrompt, aspectRatio,
                targetLength: parseInt(targetLenght),
                uploadedImages, isGenerating: true


            }
        })

        tempprojectid = project.id;

        const model = 'gemini-3-pro-image-preview'

        const config: GenerateContentConfig = {
            maxOutputTokens: 32768,
            temperature: 1,
            topP: 0.95,
            responseModalities: ['IMAGE'],
            imageConfig: {
                aspectRatio: aspectRatio || '9:16',
                imageSize: '1K'

            },
            safetySettings: [
                {
                    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: HarmBlockThreshold.OFF,
                },

                {
                    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: HarmBlockThreshold.OFF,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold: HarmBlockThreshold.OFF,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.OFF,
                }
            ]
        }


        //image to base64 structure fot the ai model
        const iamg1base64 = loadimage(image[0].path , image[0].mimeType) ;
        const image2base64 = loadimage(image[1].path , image[1].mimeType);
        const prompt = {
            text:`combine the person and product into a realistic photo.
            Make the person naturally hold or use the product.
            Maintain the lighting and perspective of the original images.
            Create a visually appealing composition suitable for a social media ad.
            Output ecommerce-quality photo realistic imagenery.
            ${userPrompt}`
        }

        //gnerate the image using the ai model 
        const response :  any = await ai.models.generateContent({
            model: model,
            contents:[iamg1base64 , image2base64 , prompt]
            ,
            config: config
        })

        //check if the response is valid 
        if (!response?.candidates?.[0]?.content?.parts) {
            return res.status(400).json({message:"Invalid response from ai model "})
            
        }
        //if valid rexponse

        console.log(response);
        const parts = response?.candidates?.[0]?.content?.parts
        
        let finalBuffer : Buffer | null=null

        

        for( const part of parts){
            if(part.inlineData && part.inlineData.data){
                const imageBuffer = Buffer.from(part.inlineData.data , "base64");
                finalBuffer = imageBuffer;
                break;
            }
        }

        if(!finalBuffer){
            return res.status(400).json({message:"Invalid image data in response"})
        }
        
        const base64image = `data:image/png;base64,${finalBuffer.toString('base64')}`;

        const uploadImage = await cloudinary.uploader.upload(base64image , {
            resource_type:"image"
        })

        await prisma.project.update({
            where:{
                id:project.id
            },
            data:{
                generatedImage:uploadImage.secure_url,
                isGenerating:false
            }
        })
        res.json({projectId : project.id})
        
    } catch (error: any) {
        if (iscreditdeducted) {
           await prisma.user.update(
            {
                where:{
                    id:userId
                },
                data:{
                    credits:user.credits + 5
                }
            }
           ) 
        }
        return res.status(500).json({ message: "server error", error: error.message })
    }
}

export const createVideo = async (req: Request, res: Response) => {
    const {userId} = req.auth();
    const {projectId} = req.body
    let iscreditdeducted=false
    
    const user = await prisma.user.findUnique({
        where:{
            id:userId
        }
    })

    if (!user || user.credits < 10) {
        return res.status(400).json({message:"insufficient credits"})
    }
 
    //detuct credits for video 

    
        await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                credits:user.credits - 10
            }
        }).then(()=>iscreditdeducted = true)
    
    try {
      const project=await prisma.project.findUnique({
        where:{
            id:projectId,
            userId:userId
        },
        include:{user: true}
      })
 
      if(!project || project.isGenerating){
        return res.status(400).json({message:"project is generating "})
      }
      if (project.generatedVideo) {
        return res.status(404).json({
            msg:"video already generated"
        })
      }
      await prisma.project.update({
        where:{
            id:projectId
        },
        data:{
            isGenerating:true
        }
      })

      
      
    } catch (error: any) {
        return res.status(500).json({ message: "server error", error: error.message })
    }
}


export const getAllPublishedProject = async (req: Request, res: Response) => {
    try {

    } catch (error: any) {
        return res.status(500).json({ message: "server error", error: error.message })
    }
}

export const deleteProject = async (req: Request, res: Response) => {
    try {

    } catch (error: any) {
        return res.status(500).json({ message: "server error", error: error.message })
    }
}

