import { Request, Response } from "express"
import { AuthUserUseCase } from "./authUserUseCase"
import { authSchema } from "../../../../services/yup"
class AuthUserController {
    constructor(private authUserUseCase: AuthUserUseCase) { }

    async handle(req: Request, res: Response) {

        const { email, password } = req.body

        try {
            await authSchema.validate({ email, password })
            const result =  await this.authUserUseCase.execute(email, password)
            return res.status(200).json(result)

        } catch (error: any) {
            return res.status(401).json(error.message)
        }
    }
}

export { AuthUserController }