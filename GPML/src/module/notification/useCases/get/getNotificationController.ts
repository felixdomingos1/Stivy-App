import { ServerError } from "../../../../error/index";
import { NextFunction, Request, Response } from "express";
import { GetNotificationUseCase } from "./getNotificationUseCase";

class GetNotificationController {
    constructor(private getNotificationUseCase: GetNotificationUseCase) { }

    async handle(req: Request, res: Response) {
        const { id } = req.params

        const Notification = await this.getNotificationUseCase.execute(Number(id))

        return res.status(200).json(Notification )
    }
}

export { GetNotificationController }