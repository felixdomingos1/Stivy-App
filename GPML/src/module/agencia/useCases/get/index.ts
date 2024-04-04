import { AgenciaRepository } from "../../repository/repository"
import {  GetAgenciaController } from "./getAgenciaController"
import { GetAgenciaUseCase } from "./getAgenciaUseCase"

const agenciaRepository= new AgenciaRepository()
const getAgenciaUseCase = new GetAgenciaUseCase(agenciaRepository)
const getagencia = new GetAgenciaController(getAgenciaUseCase)

export { getagencia }