import express from "express";
import cors from "cors"
import { adminRouter } from "./routes/admin"

const app = express();


app.use(express.json());
app.use(cors())

app.use("/admin", adminRouter)



app.listen(3001, () => console.log("listening on 3001"));