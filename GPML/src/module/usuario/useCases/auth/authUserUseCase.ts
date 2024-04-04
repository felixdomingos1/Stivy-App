import { Request, Response } from "express"
import { UsuarioRepository } from "../../repository/respository"
import { ServerError } from "../../../../error"
import { compare } from "bcrypt"
import { payloadGenerator } from "../../../../services/payload"
class AuthUserUseCase {
    constructor(private usuarioRepository: UsuarioRepository) { }

    async execute(email: string, password: string) {
        const userExist = await this.usuarioRepository.findByEmail(email)

        if (!userExist)
            throw new ServerError('email ou password incorrecto', 401)

        const isEqual = await compare(password, userExist.password)

        if (!isEqual)
            throw new ServerError('email ou password incorrecto', 401)

        const { id } = userExist
        const token = payloadGenerator(id, email)

        return {
            usuario: userExist,
            token
        }

    }
}

export { AuthUserUseCase }