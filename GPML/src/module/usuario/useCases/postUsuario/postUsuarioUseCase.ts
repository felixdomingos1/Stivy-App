import { hash } from "bcrypt";
import { ServerError } from "../../../../error/index";
import { UsuariocreateUsuarioDto } from "../../repository/interface";
import { UsuarioRepository } from "../../repository/respository";

class PostUsuarioUseCase {
    constructor(private usuarioRepository: UsuarioRepository) { }

    async execute({ email, password, ...data }: UsuariocreateUsuarioDto) {
        try {
            const existingUser = await this.usuarioRepository.findByEmail(email);

            if (existingUser)
                throw new ServerError('Usuario already exists', 400)

            password = await hash(password, 8);

            return await this.usuarioRepository.create({ email, password, ...data });

        } catch (error: any) {
            throw new ServerError(error.message, 401)
        }
    }
}

export { PostUsuarioUseCase };
