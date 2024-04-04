import { Request, Response } from "express";
import { GetAgenciaImgUseCase } from './getAgenciaImgUseCase'
import { Agencia } from "@prisma/client";

class GetAgenciaImgController {
    constructor(private getAgenciaImgUseCase: GetAgenciaImgUseCase) { }

    async handle(req: Request, res: Response) {
        const { id } = req.params

        try {
            if (!Number(id)) {
                return res.status(200).json({message:"Id deve ser um número"})
            }
    
            const Agencia = await this.getAgenciaImgUseCase.execute(Number(id)) as Agencia
    
            return res.status(200).sendFile(Agencia.image!)
        } catch (error: any) {
            return res.status(200).json({ message: error.message})
            
        }
    }
}

export { GetAgenciaImgController }