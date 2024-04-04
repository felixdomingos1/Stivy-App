import { UsuarioRepository } from "../../repository/respository"
import { AuthUserUseCase } from "./authUserUseCase"
import { AuthUserController } from "./authUserController"


const usuarioRepository = new UsuarioRepository()
const authUsuarioUseCase = new AuthUserUseCase(usuarioRepository)
const authUsuario = new AuthUserController(authUsuarioUseCase)

export { authUsuario }
