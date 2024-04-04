import { Request, Response } from "express";
import { GetPostImgUseCase } from './getPostImgUseCase'
import { Post } from "@prisma/client";

class GetPostImgController {
    constructor(private getPostImgUseCase: GetPostImgUseCase) { }

    async handle(req: Request, res: Response) {
        const { id } = req.params

        try {
            if (!Number(id)) {
                return res.status(200).json({message:"Id deve ser um número"})
            }
    
            const Post = await this.getPostImgUseCase.execute(Number(id))
    
            return res.status(200).sendFile(Post.img!)
        } catch (error: any) {
            return res.status(200).json({ message: error.message})
            
        }
    }
}

export { GetPostImgController }