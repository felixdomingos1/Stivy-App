import { Router } from "express";
import { usuarioRouter } from "./usuario.routes";
import { agenciaRouter } from "./agencia.routes";
import { postRouter } from "./post.routes";
import { notificationRouter } from "./notification.routes";
import { administratorRouter } from "./administrator.routes";
import { reactRouter } from "./reaction.router";
import { commentRouter } from "./comment.router";


const router = Router()

router.use('/usuario', usuarioRouter)
router.use('/administrator', administratorRouter)
router.use('/agencia', agenciaRouter)
router.use('/notification', notificationRouter)
router.use('/post', postRouter)
router.use('/comentarios', commentRouter)
router.use('/reactions', reactRouter)



export { router }