import { app } from "./app.js";
import { connectDB } from "./db/db.js";
import dotnev from "dotenv";


const port = process.env.PORT || 8000;

connectDB()
.then (()=>{
    app.listen(port , ()=> {
        console.log(`APP IS RUNNING @ http://localhost:${port}`);
    });
})
.catch ((error)=>{
    console.error(`MONGODB CONNECTION ERROR : ${error.message}`);
}) 