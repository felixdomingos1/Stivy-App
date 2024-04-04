import { Request, Response } from "express";
import { DeleteReactUseCase } from "./deleteReactionUseCase";

class DeleteReactController {

    constructor(private deleteReactUseCase: DeleteReactUseCase) { }

    async handle(req: Request, res: Response): Promise<void> {

        const { id } = req.params;
        const { usuarioId, postId } = req.body;
        
        await this.deleteReactUseCase.execute(Number(id),usuarioId, postId);
 
        res.status(201).json({ message: 'Feito com sucesso' });

    }

}

export { DeleteReactController }