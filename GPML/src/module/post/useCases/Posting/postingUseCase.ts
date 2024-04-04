
import { ServerError } from "../../../../error/index";
import { PostRepository } from "../../repository/respository";
import { PostcreateDTO } from "../../repository/interface";


class PostingUseCase {
    constructor(private postingRepository: PostRepository) { }

    async execute(data: PostcreateDTO) {
        try {
            return await this.postingRepository.create(data);

        } catch (error: any) {
            throw new ServerError('Falha ao criar o post', 401)
        }
    }
}

export { PostingUseCase };
