import { reactShema } from "../../../../services/yup";
import { CreateReactUseCase } from "./creatReactUseCase";
import {  Request, Response } from "express";
import { Reaction } from "@prisma/client";

class CreateReactController {
    constructor(private creteReactUseCase: CreateReactUseCase) { }

    async handle(req: Request, res: Response) {
        const data = req.body

        try {
            await reactShema.validate(data)

            const reaction = await this.creteReactUseCase.execute(data) as Reaction

            return res.status(200).json({
                reaction,
                message:'Reação feita com sucesso'
            })
        } catch (err: any) {
            return res.status(400).json({message: err.message })
        }
    }
}

export { CreateReactController }