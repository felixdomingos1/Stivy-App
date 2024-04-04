import { Comment } from "@prisma/client";

interface CommentCreateCommentDto {
  id : number
  content:  string
  postId : number,
  usuarioID:number
}
interface CommentRepositoryTDO {
  findById(id: number): Promise<Comment | Comment[] |null>;
  createComment(comment: Comment): Promise<Comment>;
}

export { CommentCreateCommentDto, CommentRepositoryTDO}