import express from "express";
import cookieparser from "cookie-parser";


const app = express();

app.use(express.json({
    limit : "10kb",
}));
app.use(express.urlencoded({
    extended : true,
    limit : "10kb"
}));
app.use(cookieparser());



export { app };
