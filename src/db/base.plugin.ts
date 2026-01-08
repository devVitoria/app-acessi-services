import { Elysia } from "elysia";
import { dbPlugin } from "../db/plugin";

export const basePlugin = new Elysia()
  .use(dbPlugin);