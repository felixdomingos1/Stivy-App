import { commentShema } from "../../../../services/yup";
import { CreateCommentUseCase } from "./creatCommentUseCase";
import {  Request, Response } from "express";
import { Comment } from "@prisma/client";

class CreateCommentController {
    constructor(private creteCommentUseCase: CreateCommentUseCase) { }

    async handle(req: Request, res: Response) {
        const data = req.body

        try {
            await commentShema.validate(data)

            const comment = await this.creteCommentUseCase.execute(data) as Comment

            return res.status(200).json({
                comment,
                message:'Cometário feito com sucesso'
            })
        } catch (err: any) {
            return res.status(400).json({message: err.message })
        }
    }
}

export { CreateCommentController }