import { ReactRepository } from "../../repository/respository"
import { CreateReactController } from "./createReactController"
import { CreateReactUseCase } from "./creatReactUseCase"

const reactionRepository = new ReactRepository()
const createReactionUseCase = new CreateReactUseCase(reactionRepository)
const createReaction = new CreateReactController(createReactionUseCase)

export { createReaction }