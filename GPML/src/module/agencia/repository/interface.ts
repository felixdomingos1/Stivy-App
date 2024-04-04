import { Agencia } from "@prisma/client";

interface createAgenciaDTO {
    nome: string;
    slogam: string;
    image: string;
    aboutUs: string;
    userId?: number
}

interface updateAgenciaDTO {
    id: number;
    nome: string;
    slogam: string;
    image: string;
    aboutUs: string;

}
interface agenciaRepositoryDTO {
    create(data: createAgenciaDTO): Promise<Agencia>
    get(id: number): Promise<Agencia[] | Agencia | null >
}

export { agenciaRepositoryDTO, createAgenciaDTO }