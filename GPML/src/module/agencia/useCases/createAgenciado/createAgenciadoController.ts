import { Request, Response } from "express"
import { CreateAgenciadoUseCase } from "./createAgenciadoUseCase"

class CreateAgenciadoController {
    constructor(private createAgenciadoUseCase: CreateAgenciadoUseCase) { }

    async handle(req: Request, res: Response) {
        const { agenciadoId, agenciaId} = req.body

        try {
            if (!Number(agenciadoId) ||  !Number(agenciaId)) {
            return res.status(400).json({message: "AgenciadoId e agenciaId deve ser NUMBER!"})
                
            }
            const newcreateAgenciado = await this.createAgenciadoUseCase.execute(agenciadoId, agenciaId)
            return res.status(201).json(newcreateAgenciado)

        } catch (error: any) {
            return res.status(400).json({message: error.message})
        }
    }
}

export { CreateAgenciadoController }