import { Elysia } from "elysia";
import { dbPlugin } from "./plugin";

export const basePlugin = new Elysia().use(dbPlugin);
