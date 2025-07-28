import express, { Express } from "express";
import cookieParser from "cookie-parser"
import authRouter from "../Routes.ts/auth.route";
import taskRouter from "../Routes.ts/task.routes";
import userRouter from "../Routes.ts/user.routes"
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:  process.env.ORIGIN || "http://localhost:5173",

    credentials: true,
  })
);

app.get("/", (_rep, res) => {
  res.send("<h1>welcome to Tasky</h1>");
});

app.use("/auth", authRouter);
app.use("/tasks",taskRouter);
app.use("/user",userRouter)

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("App is live on port ($4000)"));
