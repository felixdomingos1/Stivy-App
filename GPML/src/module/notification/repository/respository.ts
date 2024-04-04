import { Notification } from "@prisma/client";
import { createNotificationDTO, notificationRepositoryDTO } from "./interface";
import { prisma } from "../../../prismaConfig";

class NotificationRepository implements notificationRepositoryDTO {
    async create(data: createNotificationDTO): Promise<Notification> {
        return await prisma.notification.create({ data })
    }
    async find(id: number): Promise<Notification[]> {
        return await prisma.notification.findMany()
    }
    async findNotiByAgenteId(adminId: number) {
        const agenciaIds = await prisma.administrator.findMany({
            where:{
                adminId
            },
            select:{
                agenciaId: true
            }
        })

        const result : {
            id: number;
            descricao: string;
            agenciaId: number;
            senderId: number;
            createAt: Date;
        }[] = []
        
        for (const {agenciaId} of agenciaIds) {
            const notifies = await prisma.notification.findMany({
                where:{
                    agenciaId
                }
            })

            result.push(...notifies)
            
        }

        return result
    }
    async findById(id: number): Promise<Notification | null> {
        return await prisma.notification.findFirst({ where:{ id } })
    }
}

export { NotificationRepository }