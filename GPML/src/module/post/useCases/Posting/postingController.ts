import { postShema } from "../../../../services/yup";
import { PostingUseCase } from "./postingUseCase";
import { Request, Response  } from "express";



class PostingController {
    constructor(private postingUseCase: PostingUseCase) { }

    async handle(req: Request, res: Response) {
        const { userId:usuarioId , ...FormData} = req.body
        
        if (!req.file) {
            return res.status(400).json({ message:"image nao existe" })
        }
        const img = req.file?.path
        const data = {usuarioId,img, ...FormData}
        try {
            await postShema.validate(data)

            const resp =  await this.postingUseCase.execute(data);

            return res.status(201).json(resp)

        } catch (error: any) {
            console.log('sera=>', error);
            
            return res.status(400).json({ message: error.message })
        }
    }
}

export { PostingController };
