import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: process.env.ORIGIN || "*",
	credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
	console.log(`backend is up and running !`);
})

export default app;