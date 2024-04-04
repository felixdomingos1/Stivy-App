import { NotificationRepository } from "../../repository/respository";
import { PostNotificationController } from "./postNotificationController";
import { PostNotificationUseCase } from "./postNotificationUseCase";

const notificationRepository = new NotificationRepository()
const postNotificationUseCase = new PostNotificationUseCase(notificationRepository)
const PostNotification = new PostNotificationController(postNotificationUseCase)

export { PostNotification }