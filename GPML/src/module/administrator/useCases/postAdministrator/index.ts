import { AdministratorRepository } from "../../repository/respository"
import { PostAdministratorController } from "./postAdministratorController"
import { PostAdministratorUseCase } from "./postAdministratorUseCase"

const administratorRepository = new AdministratorRepository()
const postAdministratorUseCase = new PostAdministratorUseCase(administratorRepository)
const postAdministrator = new PostAdministratorController(postAdministratorUseCase)

export { postAdministrator }