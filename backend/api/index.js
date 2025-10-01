// api/index.js
import app from "../backend/src/app.js";
import { connectDB } from "../backend/src/db/db.js";

// Ensure DB is connected before handling requests
await connectDB();

// ✅ Vercel requires a default export function
export default function handler(req, res) {
  return app(req, res);
}