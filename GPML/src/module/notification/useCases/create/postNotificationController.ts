import { PostNotificationUseCase } from "./postNotificationUseCase"
import { notificacaoShema } from '../../../../services/yup'
import { Request, Response  } from "express"

class PostNotificationController {
    constructor(private postNotificationUseCase: PostNotificationUseCase) {}

    async handle(req: Request, res: Response){
        const {userId:senderId, ...data} = req.body
        try {
            await notificacaoShema.validate(data)
            
           const resp =  await this.postNotificationUseCase.execute({senderId,...data})

           return res.status(201).json(resp)
            
        } catch (error: any) {
            return res.status(400
                ).json({ message: error.message})
        }
    }
}

export { PostNotificationController }
