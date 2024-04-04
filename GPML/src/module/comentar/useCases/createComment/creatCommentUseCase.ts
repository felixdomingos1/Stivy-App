import { ServerError } from "../../../../error/index";
import { CommentCreateCommentDto } from "../../repository/interface";
import { CommentRepository } from "../../repository/respository";

class CreateCommentUseCase {
    constructor(private commentRepository: CommentRepository) { }

    async execute({ id,postId,content,usuarioID }: CommentCreateCommentDto) {
        try {
            const commentDone = await this.commentRepository.findById(id);

            if (commentDone) console.log('foi comentado');
            
                

            return await this.commentRepository.createComment({id,postId,content,usuarioID });

        } catch (error: any) {
            throw new ServerError(error.message, 401)
        }
    }
}

export { CreateCommentUseCase };
