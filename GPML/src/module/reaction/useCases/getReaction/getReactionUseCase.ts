
import { ReactRepository } from "../../repository/respository"

class GetReactUseCase {
    constructor(private reactRepository: ReactRepository) { }

    async execute(id: number | null) {

        return  await this.reactRepository.findById(id)
    }
}

export { GetReactUseCase }