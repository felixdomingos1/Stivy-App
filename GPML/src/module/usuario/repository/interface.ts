import { Usuario } from "@prisma/client";

interface UsuariocreateUsuarioDto {
    firstName: string | null;
    surname: string | null;
    email: string;
    password: string;
    genero: 'masculino' | 'feminino';
    status:'fotografoFreeLancer'| 'modeloFreeLancer'|'modelo'|'fotografo';
}
interface UsuarioUpdateUsuarioDto {
    id: number
    firstName?: string;
    surname?: string;
    email?: string;
    password: string;
    status:'fotografoFreeLancer'| 'modeloFreeLancer'|'modelo'|'fotografo';
    img: string | null;
    aboutMe: string | null;
    slogam: string | null;
    genero: 'masculino' | 'feminino' 
    bornDate: Date | null;
    agenciaId: number | null;
}
interface UsuarioRepositoryTDO {
    create({ email, password }: UsuariocreateUsuarioDto): Promise<Usuario>
    findById(id: number): Promise<Usuario | Usuario[] | null>
    // findByEmail(email: string): Promise<Usuario | null>
    // update(data: UsuarioUpdateUsuarioDto): Promise<boolean>
}

export { UsuariocreateUsuarioDto, UsuarioRepositoryTDO, UsuarioUpdateUsuarioDto }