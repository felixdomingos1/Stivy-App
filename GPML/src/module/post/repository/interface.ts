import { Post } from "@prisma/client";

interface PostcreateDTO {
    content: string;
    title: string;
    img: string | null;
    agenciaId: number | null;
    usuarioId: number | null;
}
interface PostUpdateDTO {
    id: number
    content: string;
    title: string;
    img: string | null;
    agenciaId: number | null;
    usuarioId: number | null;
}
interface PostRepositoryTDO {
    create(data: PostcreateDTO): Promise<Post>
    findById(id: number): Promise<Post | Post[] | null>
    // findByEmail(email: string): Promise<Post | null>
    // update(data: PostUpdateDTO): Promise<boolean>
}

export { PostcreateDTO, PostRepositoryTDO, PostUpdateDTO }