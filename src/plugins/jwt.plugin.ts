import jwt from "@elysiajs/jwt";
import Elysia from "elysia";

export const jwtPlugin = new Elysia().use(
	jwt({
		name: "jwt",
		secret: process.env.JWT_SECRET || "",
		exp: "24h",
	}),
);
