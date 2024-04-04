import { ServerError } from "../../../../error/index";
import { NextFunction, Request, Response } from "express";
import { GetPostUseCase } from "./getPostUseCase";

class GetPostController {
    constructor(private getPostUseCase: GetPostUseCase) { }

    async handle(req: Request, res: Response) {
        const { id } = req.params

        const Post = await this.getPostUseCase.execute(Number(id))

        return res.status(200).json(Post )
    }
}

export { GetPostController }