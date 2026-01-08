import { Elysia } from "elysia";
import { authRoutes } from "./routes/auth.routes";
import 'dotenv/config';
import { dbPlugin } from "./db/plugin";

const app = new Elysia().use(dbPlugin).use(authRoutes).get("/", () => "Hello Elysia").listen(3333);

console.log(
  `running at ${app.server?.hostname}:${app.server?.port}`
);
