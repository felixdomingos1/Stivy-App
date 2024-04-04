import { Post } from "@prisma/client";
import { prisma } from "../../../prismaConfig/index";
import { PostRepositoryTDO, PostcreateDTO } from "./interface";

class PostRepository implements PostRepositoryTDO {
    constructor() { }

    async create(data: PostcreateDTO): Promise<Post> {
        return await prisma.post.create({ data })
    }

    async findById(id: number | null): Promise<Post | Post[] | null> {

        if (!id) {
            return await prisma.post.findMany(
                {
                    include:{
                        usuario:true,
                        comment:{
                            include:{
                                usuario:true
                            }
                        },
                        reactions:true
                    },
                    orderBy:{
                        createAt:"desc"
                    }
                }
            )
        }
        return await prisma.post.findFirst({ where: { id },
        include:{
            usuario:true,
            reactions:true,
            comment:{
                include:{
                    usuario:true
                }
            }
        }
        })
    }

    async findOnlyId(id: number) {
        return await prisma.post.findFirst({ where: { id }})
    }

    async update(agenciadoId: number, agenciaId: number, newStatus: string): Promise<boolean> {
        await prisma.post.update({
            where: { id: agenciadoId },
            data: { agenciaId: agenciaId }
        })
        return true
    }
}

export { PostRepository }