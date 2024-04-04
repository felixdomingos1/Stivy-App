import { AdministratorRepository } from "../../repository/respository"
import { GetAdministratorController } from "./getAdministratorController"
import { GetAdministratorUseCase } from "./getUAdministratorUseCase"


const administratorRepository = new AdministratorRepository()
const getAdministratorUseCase = new GetAdministratorUseCase(administratorRepository)
const getAdministrator = new GetAdministratorController(getAdministratorUseCase)

export { getAdministrator }