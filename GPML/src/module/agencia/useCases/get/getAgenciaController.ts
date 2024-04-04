import { Request, Response } from "express"
import { GetAgenciaUseCase } from "./getAgenciaUseCase"

class GetAgenciaController {
    constructor(private getAgenciaUseCase: GetAgenciaUseCase) { }

    async handle(req: Request, res: Response) {
        const {  id } = req.params

        try {
            const newAgencia = await this.getAgenciaUseCase.execute(Number(id))
            return res.status(201).json(newAgencia)

        } catch (error: any) {
            return res.status(400).json(error.message)
        }
    }
}

export { GetAgenciaController }