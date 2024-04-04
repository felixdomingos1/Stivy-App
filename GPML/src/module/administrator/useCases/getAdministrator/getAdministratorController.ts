import { Request, Response } from "express";
import { GetAdministratorUseCase } from "./getUAdministratorUseCase";

class GetAdministratorController {
    constructor(private getAdministratorUseCase: GetAdministratorUseCase) { }

    async handle(req: Request, res: Response) {
        const { id } = req.params

        const Administrator = await this.getAdministratorUseCase.execute(Number(id))

        return res.status(200).json(Administrator )
    }
}

export { GetAdministratorController }