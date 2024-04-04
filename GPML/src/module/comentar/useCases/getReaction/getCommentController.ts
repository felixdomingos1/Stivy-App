import { Request, Response } from "express";
import { GetCommentUseCase } from "./getCommentUseCase";

class GetCommentController {
    constructor(private getCommentUseCase: GetCommentUseCase) { }

    async handle(req: Request, res: Response) {
        const { id } = req.params

        const reaction = await this.getCommentUseCase.execute(Number(id))

        return res.status(200).json(reaction )
    }
}

export { GetCommentController }