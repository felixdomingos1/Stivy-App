import { Router, Response, Request } from "express";
import { createComment } from "../module/comentar/useCases/createComment";
import { getComment } from "../module/comentar/useCases/getReaction";


const commentRouter = Router()

commentRouter.post('/create-comment', async (req: Request, res: Response) => {
    return await createComment.handle(req, res)
})

commentRouter.get('/get/:id', async (req: Request, res: Response) => {
    return await getComment.handle(req, res)
})


export { commentRouter }