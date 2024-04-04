import { Reaction } from "@prisma/client";

interface ReactcreateReactionDto {
  id: number;
  usuarioId: number;
  postId: number;
}
interface ReactDelete{
  id:number,
  usuarioId:number
  postId:number
}
interface ReacRepositoryTDO {
  findById(id: number): Promise<Reaction | Reaction[] |null>;
  createReaction(reaction: Reaction): Promise<Reaction>;
  deleteReaction(id:number, usuarioId:number, postId:number): Promise<ReactDelete | ReactDelete[] | null>
}

export { ReactcreateReactionDto, ReacRepositoryTDO, ReactDelete}