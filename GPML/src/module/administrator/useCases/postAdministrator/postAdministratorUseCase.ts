import { ServerError } from "../../../../error/index";
import { AdministratorRepository } from '../../repository/respository'
import { createAdministratorDto } from '../../repository/interface'
import { Administrator } from "@prisma/client";

interface createAdminExecute extends createAdministratorDto {
    userId: number
}
class PostAdministratorUseCase {
    constructor(private administratorRepository: AdministratorRepository) { }

    async execute({ adminId, userId, agenciaId }: createAdminExecute) {
        try {

            const administrator = await this.administratorRepository.findByAdminId(userId) as Administrator

            if (administrator.agenciaId === agenciaId) {
                throw new ServerError('Este usuario Já é admin desta agencia', 401)

            }
            return await this.administratorRepository.create({ adminId, agenciaId });

        } catch (error: any) {
            throw new ServerError(error.message, 401)
        }
    }
}

export { PostAdministratorUseCase };
