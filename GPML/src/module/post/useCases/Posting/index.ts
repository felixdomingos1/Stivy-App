import { PostRepository } from "../../repository/respository"
import { PostingUseCase } from "./postingUseCase"
import { PostingController } from "./postingController"


const postRepository = new PostRepository()
const postingUseCase = new PostingUseCase(postRepository)
const Posting = new PostingController(postingUseCase)

export { Posting }