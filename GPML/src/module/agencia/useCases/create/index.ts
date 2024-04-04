import { AdministratorRepository } from "../../../administrator/repository/respository"
import { AgenciaRepository } from "../../repository/repository"
import { AgenciaController } from "./agenciaController"
import { AgenciaUseCase } from "./agenciaUseCase"

const agenciaRepository= new AgenciaRepository()
const administratorRepository = new AdministratorRepository()
const agenciaUseCase = new AgenciaUseCase(agenciaRepository, administratorRepository)
const agencia = new AgenciaController(agenciaUseCase)

export { agencia }