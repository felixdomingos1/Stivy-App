import { ReactRepository } from "../../repository/respository"
import { GetReactController } from "./getReactionController"
import { GetReactUseCase } from "./getReactionUseCase"

const reactRepository = new ReactRepository()
const getReactUseCase = new GetReactUseCase(reactRepository)
const getReaction = new GetReactController(getReactUseCase)

export { getReaction }