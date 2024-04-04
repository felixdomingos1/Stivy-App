import { CommentRepository } from "../../repository/respository"
import { GetCommentController } from "./getCommentController"
import { GetCommentUseCase } from "./getCommentUseCase"

const commentRepository = new CommentRepository()
const getCommenttUseCase = new GetCommentUseCase(commentRepository)
const getComment = new GetCommentController(getCommenttUseCase)

export { getComment }