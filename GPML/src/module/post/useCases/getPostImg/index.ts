import { PostRepository } from '../../repository/respository'
import { GetPostImgController } from './getPostImgController'
import { GetPostImgUseCase } from './getPostImgUseCase'


const postRepository = new PostRepository()
const getPostImgUseCase = new GetPostImgUseCase(postRepository)
const getPostImg = new GetPostImgController(getPostImgUseCase)

export { getPostImg }