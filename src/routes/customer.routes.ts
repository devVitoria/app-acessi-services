import { Elysia, t } from "elysia";
import { basePlugin } from "../plugins/base.plugin";
import { CustomerService } from "../services/customer.services";

const customerService = new CustomerService();
export const customerRoutes = new Elysia({ prefix: "/customer" })
	.use(basePlugin)
	.post(
		"/reset-password",
		({ db, body }) => {
			return customerService.sendCode(body, db);
		},
		{
			body: t.Object({
				cpf: t.String({
					minLength: 11,
					maxLength: 11,
					error: "CPF inválido",
				}),
			}),
		},
	);
