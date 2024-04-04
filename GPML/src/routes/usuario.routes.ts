import { Router, Response, Request, NextFunction } from "express";
import { postUsuario } from "../module/usuario/useCases/postUsuario/index";
import { getUsuario } from "../module/usuario/useCases/getUsuario";
import { authUsuario } from "../module/usuario/useCases/auth";

const usuarioRouter = Router()

usuarioRouter.post('/create', async (req: Request, res:Response)=>{
    return await postUsuario.handle(req,res)
})

usuarioRouter.post('/auth', async (req: Request, res:Response)=>{
    return await authUsuario.handle(req,res)
})

usuarioRouter.get('/get/:id', async (req: Request, res:Response)=>{
    return await getUsuario.handle(req,res)
})

export { usuarioRouter }