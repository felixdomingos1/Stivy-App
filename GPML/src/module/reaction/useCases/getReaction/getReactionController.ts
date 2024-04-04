import { Request, Response } from "express";
import { GetReactUseCase } from "./getReactionUseCase";

class GetReactController {
    constructor(private getReactUseCase: GetReactUseCase) { }

    async handle(req: Request, res: Response) {
        const { id } = req.params

        const reaction = await this.getReactUseCase.execute(Number(id))

        return res.status(200).json(reaction )
    }
}

export { GetReactController }