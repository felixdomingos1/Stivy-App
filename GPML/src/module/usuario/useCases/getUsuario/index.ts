import { UsuarioRepository } from "../../repository/respository"
import { GetUsuarioController } from "./getUsuarioController"
import { GetUsuarioUseCase } from "./getUsuarioUseCase"

const usuarioRepository = new UsuarioRepository()
const getUsuarioUseCase = new GetUsuarioUseCase(usuarioRepository)
const getUsuario = new GetUsuarioController(getUsuarioUseCase)

export { getUsuario }