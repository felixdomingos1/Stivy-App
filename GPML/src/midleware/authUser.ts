import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// declare global {
//     interface jwtPayloadss extends Request {
//         id: number
//     }
// }

function authUser(req:Request, res:Response, next:NextFunction) {
    const token = req.header('Authorization')?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido'})
    }

    jwt.verify(token, process.env.KEY!, (err, decoded)=>{
        
        if (err) {
            return res.status(403).json({ message:'Token de autorização invalido' })
        }

        req.body.userId = (decoded as JwtPayload).id
        
        next()
    })
    
}

export { authUser }