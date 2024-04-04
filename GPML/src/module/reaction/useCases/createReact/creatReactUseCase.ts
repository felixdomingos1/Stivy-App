import { ServerError } from "../../../../error/index";
import { ReactcreateReactionDto } from "../../repository/interface";
import { ReactRepository } from "../../repository/respository";

class CreateReactUseCase {
    constructor(private reactRepository: ReactRepository) { }

    async execute({ id,postId,usuarioId }: ReactcreateReactionDto) {
        try {
            const reactionDone = await this.reactRepository.findById(id);

            if (reactionDone) console.log('Ja esta reagido');
            
                

            return await this.reactRepository.createReaction({id,postId,usuarioId });

        } catch (error: any) {
            throw new ServerError(error.message, 401)
        }
    }
}

export { CreateReactUseCase };
