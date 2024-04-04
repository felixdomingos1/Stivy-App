import { Request } from "express";
import multer, { Multer } from "multer";
import path from "path";
import { v4 as uuidv4 } from 'uuid';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(path.resolve(__dirname, "../upload"));
        
        cb(null, path.resolve(__dirname, "../upload"))
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname))
    }
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'video/mp4'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Tipo de arquivo não suportado!')); // Rejeita o arquivo
    }
}


const upload = multer({ storage, fileFilter })

export { upload }