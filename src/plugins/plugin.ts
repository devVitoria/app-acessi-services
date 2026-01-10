import { Elysia } from "elysia";
import { db } from "../db";

export const dbPlugin = new Elysia()
  .decorate("db", db);
