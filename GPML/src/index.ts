import { app } from "./app";
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3333

app.listen(PORT, ()=> console.log(`running at ${PORT}`))
