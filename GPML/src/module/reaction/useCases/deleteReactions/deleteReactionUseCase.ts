
import { ReactRepository } from "../../repository/respository"

class DeleteReactUseCase {
    constructor(private reactRepository: ReactRepository) { }

    async execute(id: number , usuarioId:number, postId:number) {
        await this.reactRepository.deleteReaction(id,usuarioId,postId)
    }
}

export { DeleteReactUseCase }