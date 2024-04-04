import { Router, Response, Request } from "express";
import { getAdministrator } from "../module/administrator/useCases/getAdministrator";
import { postAdministrator } from "../module/administrator/useCases/postAdministrator";
import { authUser } from "../midleware/authUser";



const administratorRouter = Router()

administratorRouter.post('/create', authUser, async (req: Request, res: Response) => {
    return await postAdministrator.handle(req,res)
})

administratorRouter.get('/get/:id', async (req: Request, res: Response) => {
    return await getAdministrator.handle(req, res)
})

// administratorRouter.put('/create-administratordo', async (req: Request, res: Response) => {
//     return await createadministratordo.handle(req, res)
// })



export { administratorRouter }