import { Request, Response } from "express"
import { AgenciaUseCase } from "./agenciaUseCase"
import { agenciaShema } from "../../../../services/yup"

class AgenciaController {
    constructor(private agenciaUseCase: AgenciaUseCase) { }

    async handle(req: Request, res: Response) {
        const { email, ...data } = req.body

        try {
            agenciaShema.validate(data)

            if (!req.file) {
                return res.status(400).json({ message: "O campo image é obrigatório" })
            }

            const image = req.file?.path
            const newAgencia = await this.agenciaUseCase.execute({image,...data})
            return res.status(201).json(newAgencia)

        } catch (error: any) {
            return res.status(400).json({ message: error.message })
        }
    }
}

export { AgenciaController }