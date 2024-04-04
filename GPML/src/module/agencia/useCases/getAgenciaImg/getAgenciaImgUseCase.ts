
import { ServerError } from "../../../../error"
import { Agencia } from '@prisma/client'
import { AgenciaRepository } from "../../repository/repository"

class GetAgenciaImgUseCase {
    constructor(private agenciaRepository: AgenciaRepository) { }

    async execute(id: number) {

        const resp = await this.agenciaRepository.get(id) 

        if (!resp) {
            throw new ServerError('Id não existe', 400)
        }
        return resp

    }
}

export { GetAgenciaImgUseCase }