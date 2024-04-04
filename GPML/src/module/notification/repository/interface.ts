import { Notification } from "@prisma/client";

interface createNotificationDTO {
    descricao: string;
    agenciaId: number;
    senderId: number;
}

interface notificationRepositoryDTO {
    create(data: createNotificationDTO): Promise<Notification>
    find(id:number): Promise<Notification[]>
    findById(id: number): Promise<Notification | null>
}

export { createNotificationDTO,notificationRepositoryDTO }