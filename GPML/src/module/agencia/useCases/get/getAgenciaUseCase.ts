import { AgenciaRepository } from "../../repository/repository";

class GetAgenciaUseCase {
    constructor(private agenciaRepository: AgenciaRepository) {}

    async execute(id: number) {
        return await this.agenciaRepository.get(id) 
    }
}

export { GetAgenciaUseCase }