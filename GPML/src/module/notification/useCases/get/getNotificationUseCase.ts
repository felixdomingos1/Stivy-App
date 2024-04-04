
import { NotificationRepository } from "../../repository/respository"

class GetNotificationUseCase {
    constructor(private NotificationRepository: NotificationRepository) { }

    async execute(userId: number) {
        if (!userId) {
            throw new Error("Id do admin esta em falta");
            
        }
        return await this.NotificationRepository.findNotiByAgenteId(userId)

        // return await this.NotificationRepository.findById(id)
    }
}

export { GetNotificationUseCase }