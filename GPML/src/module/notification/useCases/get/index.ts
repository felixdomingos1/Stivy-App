import { NotificationRepository } from "../../repository/respository"
import { GetNotificationController } from "./getNotificationController"
import { GetNotificationUseCase } from "./getNotificationUseCase"

const notificationRepository = new NotificationRepository()
const getNotificationUseCase = new GetNotificationUseCase(notificationRepository)
const getNotification = new GetNotificationController(getNotificationUseCase)

export { getNotification }