import { UsuarioRepository } from "../../../usuario/repository/respository"
import { CreateAgenciadoController } from "./createAgenciadoController"
import { CreateAgenciadoUseCase } from "./createAgenciadoUseCase"


const asuarioRepository= new UsuarioRepository()
const createAgenciadoUseCase = new CreateAgenciadoUseCase(asuarioRepository)
const createAgenciado = new CreateAgenciadoController(createAgenciadoUseCase)

export { createAgenciado }