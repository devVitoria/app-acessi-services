import { Elysia } from "elysia";
import { authRoutes } from "./routes/auth.routes";

const app = new Elysia().use(authRoutes).get("/", () => "Hello Elysia").listen(3333);

console.log(
  `running at ${app.server?.hostname}:${app.server?.port}`
);
