import app from "./app.js";
import { connectDB } from "./db/db.js";
import { ENV } from "./utils/env.js";


connectDB()
.then (()=>{
    if(ENV.NODE_ENV !== "production"){
        app.listen(ENV.PORT , ()=> {
            console.log(`APP IS RUNNING @ http://localhost:${ENV.PORT}`);
        });
    }
})
.catch ((error)=>{
    console.error(`MONGODB CONNECTION ERROR : ${error.message}`);
}) 