import { Router, Response, Request } from "express";
import { PostNotification } from '../module/notification/useCases/create/index'
import { getNotification } from "../module/notification/useCases/get";


const notificationRouter = Router()

notificationRouter.post('/create', async (req: Request, res: Response) => {
    return await PostNotification.handle(req,res)
})
 
notificationRouter.get('/get/:id', async (req: Request, res: Response) => {
    return await getNotification.handle(req, res)
})

export { notificationRouter }