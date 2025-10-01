import express from "express";
import cookieparser from "cookie-parser";
import { clerkMiddleware } from '@clerk/express'


const app = express();

app.use(express.json({
    limit : "10kb",
}));

app.use(express.urlencoded({
    extended : true,
    limit : "10kb"
}));

app.use(cookieparser());

app.use(clerkMiddleware());


export { app };
