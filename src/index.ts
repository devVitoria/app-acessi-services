import { Elysia } from "elysia";
import { authRoutes } from "./routes/auth.routes";
import "dotenv/config";
import { customerRoutes } from "./routes/customer.routes";
import swagger from "@elysiajs/swagger";
import { financialRoutes } from "./routes/financial.routes";

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
	.use(financialRoutes)
	.get("/", () => "Hello Elysia")
	.listen(3333);

console.log(`running at ${app.server?.hostname}:${app.server?.port}`);
