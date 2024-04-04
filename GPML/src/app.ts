import express, { Request, Response, NextFunction} from 'express'
import cors from 'cors'
import { ServerError } from './error/index'
import { router } from './routes/index'
import 'express-async-errors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('./upload'))

app.use(router)

app.use((err: Error, req:Request, res:Response, next:NextFunction )=>{
    
    if (err instanceof ServerError ) {
        console.log('cpomo assim!');
        
        return res.status(err.status).json({ message: err.message})
    }

    return res.status(500).json({ message: 'error server'})
})



export { app }