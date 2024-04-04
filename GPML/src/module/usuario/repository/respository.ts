import { Usuario } from "@prisma/client";
import { UsuarioRepositoryTDO, UsuarioUpdateUsuarioDto, UsuariocreateUsuarioDto } from "./interface";
import { prisma } from "../../../prismaConfig/index";

class UsuarioRepository implements UsuarioRepositoryTDO {
    constructor() { }

    async create(data: UsuariocreateUsuarioDto): Promise<Usuario> {

        return await prisma.usuario.create({ data })

    }

    async findById(id: number | null): Promise<Usuario | Usuario[] | null> {

        if (!id) {
            return await prisma.usuario.findMany({
                include: {
                    modeloCaracteristica: true,
                    agencia: true,
                    Administrator: true,
                    Post: true,
                    Notification: true
                }
            })
        }
        return await prisma.usuario.findFirst({
            where: { id },
            include: {
                modeloCaracteristica: true,
                agencia: true,
            Administrator: {
                include:{
                    agencia:{
                        include:{
                            Notification: true,
                            Post:true
                        }
                    }
                }
            },
                Post: true,
                Notification:true
            }
        })
    }

    async findByEmail(email: string ): Promise<Usuario | null> {
        return await prisma.usuario.findUnique({ 
            where: { email }
        })
    }

    async update(agenciadoId: number, agenciaId: number, newStatus: string): Promise<boolean>{
        if (newStatus === 'modelo' || newStatus === 'fotografo' || newStatus === 'fotografoFreeLancer' || newStatus === 'modeloFreeLancer') {
            await prisma.usuario.update({
                where: { id: agenciadoId },
                data: { agenciaId: agenciaId, status: newStatus }
            })
            return true
        }
        await prisma.usuario.update({
            where: { id: agenciadoId },
            data: { agenciaId: agenciaId }
        })
        return true
    }
}

export { UsuarioRepository }