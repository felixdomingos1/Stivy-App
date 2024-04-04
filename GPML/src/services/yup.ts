import * as yup from 'yup'

const shema = yup.object({
    firstName: yup.string().required(),
    surname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    status: yup.string().required(),
    genero: yup.string().required()
})

const updateUsuarioSchema = yup.object({
    nomeCompleto: yup.string(),
    email: yup.string().email(),
    password: yup.string(),
    tipo: yup.string(),
    genero: yup.string()
})


const modeloCaracteristicaSchema = yup.object({
    apelido: yup.string().required(" apelido é campo obrigatório"),
    altura: yup.number().required(" altura é campo obrigatório"),
    cintura: yup.number().required(" cintura é campo obrigatório"),
    sapato: yup.number().required(" sapato é campo obrigatório"),
    modeloId: yup.number().required(" modeloId é campo obrigatório"),
})
const updateModeloCaracteristicaSchema = yup.object({
    apelido: yup.string(),
    altura: yup.number(),
    cintura: yup.number(),
    sapato: yup.number(),
    modeloId: yup.number()
})

const authSchema = yup.object({
    email: yup.string().email().required("email é campo obrigatório!"),
    password: yup.string().required("password é campo obrigatório!"),
})


const agenciaShema = yup.object({
    nome: yup.string().required("nome is campo obrigatório"),
    slogam: yup.string().required("slogam is campo obrigatório"),
    aboutUs: yup.string().required("aboutUs is campo obrigatório")
})
const updateAgenciaSchema = yup.object({
    nome: yup.string(),
    slogam: yup.string(),
    imagem: yup.string(),
    sobre: yup.string(),
})

const notificacaoShema = yup.object({
    descricao: yup.string().required("descricao is campo obrigatório"),
    agenciaId: yup.number().required("agenciaId is campo obrigatório"),
})

const postShema = yup.object({
    content: yup.string().required("content is campo obrigatório"),
    title: yup.string().required("title is campo obrigatório"),
    img: yup.string().required("img is campo obrigatório"),
    agenciaId: yup.number(),
    usuarioId: yup.number()
})
const reactShema = yup.object({
    postId: yup.string().required("postId é campo obrigatório"),
    usuarioId: yup.string().required("UsuarioId é campo obrigatório"),
})
const commentShema = yup.object({
    postId: yup.string().required("postId é campo obrigatório"),
    content: yup.string().required("conteudo é campo obrigatório"),
})




export {
    shema,
    updateUsuarioSchema,
    updateModeloCaracteristicaSchema,
    modeloCaracteristicaSchema,
    authSchema,
    agenciaShema,
    updateAgenciaSchema,
    notificacaoShema,
    postShema,
    reactShema,
    commentShema
}