//main entry point 
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path:'./.env'
})


connectDB()
.then(() => {
        app.listen(process.env.PORT, ()=>{
        console.log(`Server running at port ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log(`MONGOdb connection fails`, error);
})