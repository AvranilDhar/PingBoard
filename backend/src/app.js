import express from "express";
import cookieparser from "cookie-parser";
import { clerkMiddleware } from '@clerk/express';
import { clerkClient, requireAuth, getAuth } from '@clerk/express';
import { serve } from "inngest/express";
import { inngest, functions } from "./utils/inngest.js";

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

app.use("/api/inngest", serve({ client: inngest, functions }));

// Use requireAuth() to protect this route
// If user isn't authenticated, requireAuth() will redirect back to the homepage
app.get('/protected', requireAuth(), async (req, res) => {
    // Use `getAuth()` to get the user's `userId`
    const { userId } = getAuth(req)
  
    // Use Clerk's JS Backend SDK to get the user's User object
    const user = await clerkClient.users.getUser(userId)
  
    return res.json({ user })
  })
  

export { app };
