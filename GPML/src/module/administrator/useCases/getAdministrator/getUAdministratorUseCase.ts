
import { AdministratorRepository } from "../../repository/respository"

class GetAdministratorUseCase {
    constructor(private AdministratorRepository: AdministratorRepository) { }

    async execute(id: number | null) {

        return  await this.AdministratorRepository.findById(id)
    }
}

export { GetAdministratorUseCase }