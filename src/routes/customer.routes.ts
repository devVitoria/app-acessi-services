import { Elysia, t } from "elysia";
import { basePlugin } from "../plugins/base.plugin";
import { CustomerService } from "../services/customer.services";

const customerService = new CustomerService();
export const customerRoutes = new Elysia({ prefix: "/customer" })
	.use(basePlugin)
	.post(
		"/send-code",
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
	)
	.post(
		"/verify-code",
		({ db, body }) => {
			return customerService.verifyCode(body, db);
		},
		{
			body: t.Object({
				code: t.String({
					minLength: 4,
					maxLength: 4,
				}),
				cpf: t.String({
					minLength: 11,
					maxLength: 11,
					error: "CPF inválido",
				}),
			}),
		},
	)
	.post(
		"/reset-password",
		({ db, body }) => {
			return customerService.resetPassword(body, db);
		},
		{
			body: t.Object({
				cpf: t.String({
					minLength: 11,
					maxLength: 11,
					error: "CPF inválido",
				}),
				newPsd: t.String({
					minLength: 6,
					maxLength: 6,
				}),
			}),
		},
	);
