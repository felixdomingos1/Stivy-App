import { AgenciaRepository } from '../../repository/repository'
import { GetAgenciaImgUseCase } from './getAgenciaImgUseCase'
import { GetAgenciaImgController } from './getaAgenciaImgController'


const agenciaRepository = new AgenciaRepository()
const getAgenciaImgUseCase = new GetAgenciaImgUseCase(agenciaRepository)
const getAgenciaImg = new GetAgenciaImgController(getAgenciaImgUseCase)

export { getAgenciaImg }