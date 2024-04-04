import { createAgenciaDTO } from "../../repository/interface";
import { AgenciaRepository } from "../../repository/repository";
import { AdministratorRepository } from "../../../administrator/repository/respository";

class AgenciaUseCase {
    constructor(
        private agenciaRepository: AgenciaRepository,
        private administratorRepository: AdministratorRepository) {}

    async execute(data: createAgenciaDTO) {
        const { userId, ...agenciaProps } = data
        const agencia =  await this.agenciaRepository.create(agenciaProps) 

        if (userId) 
            await this.administratorRepository.create({ adminId: userId, agenciaId: agencia.id})

        return agencia
    }
}

export { AgenciaUseCase }