
import { CommentRepository } from "../../repository/respository"

class GetCommentUseCase {
    constructor(private commentRepository: CommentRepository) { }

    async execute(id: number | null) {

        return  await this.commentRepository.findById(id)
    }
}

export { GetCommentUseCase }