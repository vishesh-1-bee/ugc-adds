import { prisma } from "../config/prisma.js";
import { v2 as cloudinary } from 'cloudinary';
import { HarmBlockThreshold, HarmCategory } from '@google/genai';
import fs from 'fs';
import path from "path";
import axios from "axios";
import ai from "../config/ai.js";
//we creata function as we have two image 
const loadimage = (path, mimeType) => {
    return {
        inlineData: {
            data: fs.readFileSync(path).toString("base64"),
            mimeType: mimeType
        }
    };
};
export const createProject = async (req, res) => {
    let tempprojectid = undefined;
    const { userId } = req.auth();
    let iscreditdeducted = false;
    const { name = 'New Project', aspectRatio, userPrompt, productName, productDescription, targetLenght = 5, } = req.body;
    //using multer to get the iamge url
    const image = req.files;
    if (image.length < 2 || !productName) {
        return res.status(400).json({ message: "please upload images" });
    }
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    if (!user || user.credits < 5) {
        return res.status(400).json({ message: "insufficient credits" });
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
        }).then(() => { iscreditdeducted = true; });
    }
    try {
        console.log("createProject: Uploading images to Cloudinary...");
        let uploadedImages = await Promise.all(image.map(async (image) => {
            let result = await cloudinary.uploader.upload(image.path, {
                resource_type: "image"
            });
            return result.secure_url;
        }));
        console.log("createProject: Images uploaded successfully:", uploadedImages);
        console.log("createProject: Creating project record in Prisma database...");
        const project = await prisma.project.create({
            data: {
                name, userId, productName, productDescription, userPrompt, aspectRatio,
                targetLength: parseInt(targetLenght),
                uploadedImages, isGenerating: true
            }
        });
        tempprojectid = project.id;
        console.log("createProject: Project created in DB with ID:", project.id);
        const model = 'gemini-3-pro-image-preview';
        const config = {
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
        };
        //image to base64 structure fot the ai model
        const iamg1base64 = loadimage(image[0].path, image[0].mimetype);
        const image2base64 = loadimage(image[1].path, image[1].mimetype);
        const prompt = {
            text: `combine the person and product into a realistic photo.
            Make the person naturally hold or use the product.
            Maintain the lighting and perspective of the original images.
            Create a visually appealing composition suitable for a social media ad.
            Output ecommerce-quality photo realistic imagenery.
            ${userPrompt}`
        };
        console.log("createProject: Calling Gemini AI models.generateContent...");
        const response = await ai.models.generateContent({
            model: model,
            contents: [iamg1base64, image2base64, prompt],
            config: config
        });
        //check if the response is valid 
        if (!response?.candidates?.[0]?.content?.parts) {
            console.error("createProject: Invalid response from AI model", response);
            return res.status(400).json({ message: "Invalid response from ai model " });
        }
        //if valid rexponse
        console.log("createProject: Received valid response from Gemini AI. Processing image parts...");
        const parts = response?.candidates?.[0]?.content?.parts;
        let finalBuffer = null;
        for (const part of parts) {
            if (part.inlineData && part.inlineData.data) {
                const imageBuffer = Buffer.from(part.inlineData.data, "base64");
                finalBuffer = imageBuffer;
                break;
            }
        }
        if (!finalBuffer) {
            console.error("createProject: No valid image data found in response parts.");
            return res.status(400).json({ message: "Invalid image data in response" });
        }
        console.log("createProject: Uploading generated image base64 to Cloudinary...");
        const base64image = `data:image/png;base64,${finalBuffer.toString('base64')}`;
        const uploadImage = await cloudinary.uploader.upload(base64image, {
            resource_type: "image"
        });
        console.log("createProject: Updating project in database with generated image URL...");
        await prisma.project.update({
            where: {
                id: project.id
            },
            data: {
                generatedImage: uploadImage.secure_url,
                isGenerating: false
            }
        });
        console.log("createProject: Success! Returning project ID:", project.id);
        res.json({ projectId: project.id });
    }
    catch (error) {
        console.error("createProject: Error during project generation:", error);
        // Refund credits if they were deducted
        if (iscreditdeducted) {
            await prisma.user.update({
                where: { id: userId },
                data: { credits: user.credits + 5 }
            });
        }
        // Reset isGenerating so the user isn't permanently stuck
        if (tempprojectid) {
            await prisma.project.update({
                where: { id: tempprojectid },
                data: { isGenerating: false, error: error.message || 'Generation failed' }
            }).catch(() => { });
        }
        return res.status(500).json({ message: "server error", error: error.message });
    }
};
export const createVideo = async (req, res) => {
    const { userId } = req.auth();
    const { projectId } = req.body;
    let iscreditdeducted = false;
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    // Subscription gate — only paid users can generate videos
    if (!user || !user.isPaid) {
        return res.status(403).json({ message: "subscription_required" });
    }
    if (user.credits < 10) {
        return res.status(400).json({ message: "insufficient credits" });
    }
    //detuct credits for video 
    await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            credits: user.credits - 10
        }
    }).then(() => iscreditdeducted = true);
    try {
        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
                userId: userId
            },
            include: { user: true }
        });
        if (!project || project.isGenerating) {
            return res.status(400).json({ message: "project is generating " });
        }
        if (project.generatedVideo) {
            return res.status(404).json({
                msg: "video already generated"
            });
        }
        await prisma.project.update({
            where: {
                id: projectId
            },
            data: {
                isGenerating: true
            }
        });
        const prompt = `make the person showcase the product which is 
      ${project.productName} ${project.productDescription && `and product description:${project.productDescription}`}`;
        const model = 'veo-3.1-generate-preview';
        //check if the image is generated 
        if (!project.generatedImage) {
            return res.status(404).json({ msg: "image not found" });
        }
        const image = await axios.get(project.generatedImage, {
            responseType: 'arraybuffer'
        });
        const imageBytes = Buffer.from(image.data);
        let operation = await ai.models.generateVideos({
            model,
            prompt,
            image: {
                imageBytes: imageBytes.toString('base64'),
                mimeType: "image/jpeg",
            },
            config: {
                aspectRatio: project.aspectRatio || "9:16",
                numberOfVideos: 1,
                resolution: '720p'
            }
        });
        while (!operation.done) {
            console.log("waiting for the video generation to be complete");
            await new Promise((resolve) => setTimeout(resolve, 10000));
            operation = await ai.operations.getVideosOperation({
                operation: operation
            });
        }
        const filename = `${userId}-${Date.now()}.mp4`;
        const filepath = path.join('videos', filename);
        //create a image dictory if not exist
        fs.mkdirSync('videos', { recursive: true });
        if (!operation.response.generatedVideos) {
            throw new Error("No video data available");
        }
        //download the video 
        await ai.files.download({
            file: operation.response.generatedVideos[0].video,
            downloadPath: filepath
        });
        const uploadResult = await cloudinary.uploader.upload(filepath, {
            resource_type: "video"
        });
        //storing the video in the db
        await prisma.project.update({
            where: {
                id: project.id
            },
            data: {
                generatedVideo: uploadResult.secure_url,
                isGenerating: false
            }
        });
        //remove the video file from the disk
        fs.unlinkSync(filepath);
        res.json({ message: " video generation completed",
            videoUrl: uploadResult.secure_url
        });
    }
    catch (error) {
        console.error("createVideo: Error during video generation:", error);
        // Refund credits if they were deducted
        if (iscreditdeducted) {
            await prisma.user.update({
                where: { id: userId },
                data: { credits: user.credits + 10 }
            });
        }
        // CRITICAL: Reset isGenerating so the user can retry — without this the
        // project stays permanently stuck and every future call returns 400.
        await prisma.project.update({
            where: { id: projectId },
            data: { isGenerating: false, error: error.message || 'Video generation failed' }
        }).catch(() => { });
        return res.status(500).json({ message: "server error", error: error.message });
    }
};
export const getProject = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { projectId } = req.params;
        const project = await prisma.project.findUnique({
            where: {
                id: Array.isArray(projectId) ? projectId[0] : projectId
            }
        });
        if (!project || project.userId !== userId) {
            return res.status(404).json({ message: "Project not found" });
        }
        return res.json({ project });
    }
    catch (error) {
        return res.status(500).json({ message: "server error", error: error.message });
    }
};
export const getAllPublishedProject = async (req, res) => {
    try {
        const project = await prisma.project.findMany({
            where: {
                isPublished: true
            }
        });
        return res.json({ project });
    }
    catch (error) {
        return res.status(500).json({ message: "server error", error: error.message });
    }
};
export const deleteProject = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { projectID } = req.params;
        const project = await prisma.project.findUnique({
            where: {
                id: Array.isArray(projectID) ? projectID[0] : projectID
            }
        });
        if (!project || project.userId !== userId) {
            return res.status(404).json({ message: "Project not found" });
        }
        await prisma.project.delete({
            where: {
                id: project.id
            }
        });
        return res.status(200).json({ message: "Project deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "server error", error: error.message });
    }
};
