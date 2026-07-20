

export interface User{
    id?:string,
    name?:string,
    email?:string,
    password?:string,
    
}


export interface Project {
    id:string,
    userId?:string,
    name?:string,
    user?:User,
    productName?:string, 
    productDescription?:string,
    userPrompt?:string,
    aspectRatio?:string,
    productImage?:string,
    targetLength?:number | string,
    generatedImage?:string,
    generatedVideo?:string,
    isGenerated?:boolean,
    isGenerating?:boolean,
    isPublished?:boolean,
    error?:string,
    createdAt?: Date | string,
    updatedAt?: Date | string,
    uploadedImages?:string[]
      
}