import { CommentRepository } from "../../repository/respository"
import { CreateCommentController } from "./createCommentController"
import { CreateCommentUseCase } from "./creatCommentUseCase"

const commentRepository = new CommentRepository()
const createCommentUseCase = new CreateCommentUseCase(commentRepository)
const createComment = new CreateCommentController(createCommentUseCase)

export { createComment }