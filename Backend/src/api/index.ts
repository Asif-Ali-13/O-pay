import app from "../app";
import serverless from "serverless-http";
import { connectDB } from "../db/index";

let isConnected = false;

const handlerPromise = (async () => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
      console.log("[Vercel] Connected to MongoDB ✅");
    } catch (err) {
      console.error("[Vercel] DB connection failed ❌", err);
    }
  }
  return serverless(app);
})();

export default async (req: any, res: any) => {
  const handler = await handlerPromise;
  return handler(req, res);
};
