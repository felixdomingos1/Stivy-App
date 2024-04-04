import { Usuario } from '@prisma/client'
import { UsuarioRepository } from '../../../usuario/repository/respository'


class CreateAgenciadoUseCase {
    constructor(private usuarioRepository: UsuarioRepository) { }

    async execute(agenciadoId: number, agenciaId: number) {
        const { status } = await this.usuarioRepository.findById(agenciadoId) as Usuario

        let newStatus= ''

        const index = status!.indexOf('FreeLancer')

        if (index > 0) 
            newStatus = status!.slice(0, index)

        return await this.usuarioRepository.update(agenciadoId, agenciaId, newStatus)
    }
}

export { CreateAgenciadoUseCase }