import { Comment } from "@prisma/client";
import { CommentCreateCommentDto,CommentRepositoryTDO} from "./interface"; 
import { prisma } from "../../../prismaConfig/index";


class CommentRepository implements CommentRepositoryTDO {
    constructor() {}

    async createComment(data: CommentCreateCommentDto): Promise<Comment> {
      return await prisma.comment.create({
        data
      });
    }
    async findById(id: number | null): Promise<Comment | Comment[] | null>{
        if (!id) {
            return await prisma.comment.findMany({
              include:{
                usuario:true
              }
            })
        }
        return await prisma.comment.findFirst({
            where:{
              id
            },
            include:{
              usuario:true
            }
        })
    }
}

export { CommentRepository }