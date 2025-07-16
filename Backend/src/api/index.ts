import app from "../app";
import serverless from "serverless-http";
import { connectDB } from "../db/index";

let isConnected = false;

const wrapper = async () => {
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
};

export const handler = async (event: any, context: any) => {
  const handlerFn = await wrapper();
  return handlerFn(event, context);
};
