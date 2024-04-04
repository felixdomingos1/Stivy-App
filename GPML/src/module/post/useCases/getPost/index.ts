import { PostRepository } from '../../../post/repository/respository'
import { GetPostController } from "./getPostController"
import { GetPostUseCase } from "./getPostUseCase"

const postRepository = new PostRepository()
const getPostUseCase = new GetPostUseCase(postRepository)
const getPost = new GetPostController(getPostUseCase)

export { getPost }