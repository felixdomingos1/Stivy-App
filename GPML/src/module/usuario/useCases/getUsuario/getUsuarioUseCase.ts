
import { UsuarioRepository } from "../../repository/respository"

class GetUsuarioUseCase {
    constructor(private usuarioRepository: UsuarioRepository) { }

    async execute(id: number | null) {

        return  await this.usuarioRepository.findById(id)
    }
}

export { GetUsuarioUseCase }