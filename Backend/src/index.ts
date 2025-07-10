import dotenv from "dotenv";
dotenv.config({ path: "./.env"});

import app from "./app";
import { connectDB } from "./db/index";

connectDB()
  .then(() => {
		app.listen(process.env.PORT || 8000, () => {
			console.log(`Backend is listening on PORT : ${process.env.PORT}`);
		});
	})
	.catch((error: Error) => {
		console.log(`Error while connecting to DB: ${error}`);
		process.exit(1);
	})