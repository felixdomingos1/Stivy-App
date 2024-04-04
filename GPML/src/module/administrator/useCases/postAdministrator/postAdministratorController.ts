import { shema } from "../../../../services/yup";
import { Request, Response } from "express";
import { PostAdministratorUseCase } from "./postAdministratorUseCase";
import { JwtPayload } from "jsonwebtoken";

class PostAdministratorController {
    constructor(private postAdministratorUseCase: PostAdministratorUseCase) { }

    async handle(req: Request, res: Response) {
        const { adminId, agenciaId, userId } = req.body 

        try {
            if (!Number(adminId) || !Number(agenciaId) ) {
                return res.status(400).json({ message:'corrija os campos enviados, devem ser NUMBER'})
            }

            const resp = await this.postAdministratorUseCase.execute({ adminId, userId, agenciaId})

            return res.status(201).json({ resp })
        } catch (err: any) {
            return res.status(400).json({ message: err.message })
        }
    }
}

export { PostAdministratorController }