import { Administrator } from "@prisma/client";
import { AdministratorRepositoryTDO, createAdministratorDto } from "./interface";
import { prisma } from "../../../prismaConfig/index";

class AdministratorRepository implements AdministratorRepositoryTDO {
    constructor() { }

    async create(data: createAdministratorDto): Promise<Administrator> {

        return await prisma.administrator.create({ data })

    }

    async findById(id: number | null): Promise<Administrator | Administrator[] | null> {

        if (!id) {
            return await prisma.administrator.findMany()
        }
        return await prisma.administrator.findFirst({
            where: { id}
        })
    }

    async findByAdminId(adminId: number) {
        return await prisma.administrator.findFirst({ where: { adminId }})
    }

}

export { AdministratorRepository }