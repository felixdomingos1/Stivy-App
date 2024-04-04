import { Agencia } from "@prisma/client";
import { agenciaRepositoryDTO, createAgenciaDTO } from "./interface";
import { prisma } from "../../../prismaConfig";

class AgenciaRepository implements agenciaRepositoryDTO {
    async create(data: createAgenciaDTO): Promise<Agencia> {
        return await prisma.agencia.create({ data })
    }
    async get(id: number): Promise<Agencia | Agencia[] | null> {
        if (!id) {
            return await prisma.agencia.findMany({
                include: {
                    Administrator: true,
                    Post: true,
                    Usuario: true,
                    Notification: true
                }
            })

        }
        return await prisma.agencia.findFirst({
            where: { id },
            include: {
                Administrator: true,
                Post: true,
                Usuario: true,
                Notification: true
            }
        })
    }
}

export { AgenciaRepository }