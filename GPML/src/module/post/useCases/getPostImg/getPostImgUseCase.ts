
import { ServerError } from "../../../../error"
import { PostRepository } from "../../repository/respository"
import { Post } from '@prisma/client'

class GetPostImgUseCase {
    constructor(private PostRepository: PostRepository) { }

    async execute(id: number) {

        const resp = await this.PostRepository.findOnlyId(id) 

        if (!resp) {
            throw new ServerError('Id não existe', 400)
        }
        return resp

    }
}

export { GetPostImgUseCase }