import { UsuarioRepository } from "../../repository/respository"
import { PostUsuarioController } from "./postUsuarioController"
import { PostUsuarioUseCase } from "./postUsuarioUseCase"

const usuarioRepository = new UsuarioRepository()
const postUsuarioUseCase = new PostUsuarioUseCase(usuarioRepository)
const postUsuario = new PostUsuarioController(postUsuarioUseCase)

export { postUsuario }