import { ServerError } from "../../../../error";
import { createNotificationDTO } from "../../repository/interface";
import { NotificationRepository } from "../../repository/respository";

class PostNotificationUseCase {
    constructor(private notificationRepository: NotificationRepository) {}

    async execute(data: createNotificationDTO ){
        try {
          return  await this.notificationRepository.create(data)
        } catch (error: any) {
            throw new ServerError(error.message, 401)
        }
    }
}

export { PostNotificationUseCase }