import { ReactRepository } from "../../repository/respository"
import { DeleteReactController } from "./deleteReactionController"
import { DeleteReactUseCase } from "./deleteReactionUseCase"

const deleteRepository = new ReactRepository()
const getReactUseCase = new DeleteReactUseCase(deleteRepository)
const deleteReaction = new DeleteReactController(getReactUseCase)

export { deleteReaction }