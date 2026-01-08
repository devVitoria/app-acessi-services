import type { db } from "../db";

declare module "elysia" {
  interface Context {
    db: typeof db;
  }
}
