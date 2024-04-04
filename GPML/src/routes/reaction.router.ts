import { Router, Response, Request } from "express";
import { createReaction } from "../module/reaction/useCases/createReact";
import { getReaction } from "../module/reaction/useCases/getReaction";
import { deleteReaction } from "../module/reaction/useCases/deleteReactions";


const reactRouter = Router()

reactRouter.post('/create-reactions', async (req: Request, res: Response) => {
    return await createReaction.handle(req, res)
})

reactRouter.get('/get/:id', async (req: Request, res: Response) => {
    return await getReaction.handle(req, res)
})

reactRouter.delete('/delete/:id', async (req: Request, res: Response) => {
    return await deleteReaction.handle(req, res)
})


export { reactRouter }