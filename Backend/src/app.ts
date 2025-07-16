import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index";

const app = express();

app.use(cors({
  origin: process.env.PROD_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
	console.log(`backend is up and running !`);
})

app.use("/api/v1", router);

export default app;