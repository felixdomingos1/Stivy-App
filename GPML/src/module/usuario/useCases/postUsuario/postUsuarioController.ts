import { shema } from "../../../../services/yup";
import { PostUsuarioUseCase } from "./postUsuarioUseCase";
import {  Request, Response } from "express";
import { payloadGenerator } from "../../../../services/payload";
import { Usuario } from "@prisma/client";

class PostUsuarioController {
    constructor(private postUsuarioUseCase: PostUsuarioUseCase) { }

    async handle(req: Request, res: Response) {
        const data = req.body

        try {
            await shema.validate(data)

            const usuario = await this.postUsuarioUseCase.execute(data) as Usuario

            const payload = payloadGenerator(usuario.id, usuario.email)

            return res.status(201).json({
                usuario,
                payload
            })
        } catch (err: any) {
            return res.status(400).json({message: err.message })
        }
    }
}

export { PostUsuarioController }