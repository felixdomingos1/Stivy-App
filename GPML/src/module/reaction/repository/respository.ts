import { Reaction } from "@prisma/client";
import { ReacRepositoryTDO,ReactDelete,ReactcreateReactionDto} from "./interface"; 
import { prisma } from "../../../prismaConfig/index";


class ReactRepository implements ReacRepositoryTDO {
    constructor() {}

    async createReaction(data: ReactcreateReactionDto): Promise<Reaction> {
      return await prisma.reaction.create({
        data
      });
    }
    async deleteReaction(id: number, usuarioId:number, postId:number): Promise<ReactDelete | ReactDelete[] | null > {
      const existingReaction = await prisma.reaction.findFirst({
        where: {
          id,
          usuarioId,
          postId
        }
      });
      if (!existingReaction) {
        return await prisma.reaction.findMany({});
      }
      return await prisma.reaction.delete({
        where: {
          id,
          usuarioId,
          postId
        }
      });
        
    }
    
    async findById(id: number | null): Promise<Reaction | Reaction[] | null>{
        if (!id) {
            return await prisma.reaction.findMany({})
        }
        return await prisma.reaction.findFirst({
            where:{id},
            include:{
              usuario:true
            }
        })
    }
}

export { ReactRepository }