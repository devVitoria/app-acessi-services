import { Elysia } from "elysia";
import { authRoutes } from "./routes/auth.routes";
import "dotenv/config";
import { customerRoutes } from "./routes/customer.routes";
import swagger from "@elysiajs/swagger";

const app = new Elysia()
	.use(
		swagger({
			path: "/docs",
			documentation: {
				info: {
					title: "Acessi documentation",
					version: "1.0.1",
					description: "Acessi apis",
					
				},
			},
		}),
	)
	.use(authRoutes)
	.use(customerRoutes)
	.get("/", () => "Hello Elysia")
	.listen(3333);

console.log(`running at ${app.server?.hostname}:${app.server?.port}`);
