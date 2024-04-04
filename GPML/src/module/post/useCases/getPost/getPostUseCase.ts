
import { PostRepository } from "../../repository/respository"

class GetPostUseCase {
    constructor(private PostRepository: PostRepository) { }

    async execute(id: number | null) {

        return  await this.PostRepository.findById(id)
    }
}

export { GetPostUseCase }