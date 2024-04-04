import { Router, Response, Request } from "express";

import { agencia } from "../module/agencia/useCases/create";
import { authUser } from "../midleware/authUser";
import { getagencia } from "../module/agencia/useCases/get";
import { createAgenciado } from "../module/agencia/useCases/createAgenciado";
import { upload } from "../midleware/multer";
import { getAgenciaImg } from "../module/agencia/useCases/getAgenciaImg";

const agenciaRouter = Router()

agenciaRouter.post('/create',upload.single('file'),authUser, async (req: Request, res: Response) => {
    return await agencia.handle(req, res)
})

agenciaRouter.get('/get/:id', async (req: Request, res: Response) => {
    return await getagencia.handle(req, res)
})

agenciaRouter.get('/get-img/:id', async (req: Request, res: Response) => {
    return await getAgenciaImg.handle(req, res)
})


agenciaRouter.put('/create-agenciado', async (req: Request, res: Response) => {
    return await createAgenciado.handle(req, res)
})





export { agenciaRouter }